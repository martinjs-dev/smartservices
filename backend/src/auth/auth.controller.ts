import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
  Redirect,
  HttpStatus,
  UseInterceptors,
  Put,
  Param,
  Body,
  UploadedFile,
  Query,
  // Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/user/user.interface';
import { Public } from 'src/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { request } from 'http';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.json(tokens);
  }

  @Get('google')
  @Public()
  @Redirect(process.env.GOOGLE_CALLBACK_URL)
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as User;
      const tokens = await this.authService.login(user);
      res.cookie('access_token', tokens.access_token, { httpOnly: true });
      return res.redirect(
        `${process.env.FRONTEND_URL}/profile?token=${tokens.access_token}`
      );
    } catch (error) {
      console.log(error);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }

  @Get('facebook')
  @Public()
  @Redirect(process.env.FACEBOOK_CALLBACK_URL)
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('facebook/callback')
  @Public()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as User;
      const tokens = await this.authService.login(user);

      res.cookie('access_token', tokens.access_token, { httpOnly: true });
      return res.redirect(
        `${process.env.FRONTEND_URL}/profile?token=${tokens.access_token}`
      );
    } catch (error) {
      console.log(error);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }

  @Get('github')
  @Public()
  @Redirect(process.env.GITHUB_CALLBACK_URL)
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @Public()
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as User;
      const tokens = await this.authService.login(user);

      res.cookie('access_token', tokens.access_token, { httpOnly: true });
      return res.redirect(
        `${process.env.FRONTEND_URL}/profile?token=${tokens.access_token}`
      );
    } catch (error) {
      console.log(error);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('verify')
  @Public()
  async verify(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.verifyToken(req);
    if (user) {
      return res.status(HttpStatus.OK).json({ isAuthenticated: true });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ isAuthenticated: false });
  }

  @Post('refresh')
  @Public()
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Refresh token missing' });
    }

    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const newTokens = await this.authService.login(user);

      res.cookie('access_token', newTokens.access_token, { httpOnly: true });
      res.cookie('refresh_token', newTokens.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return res.json(newTokens);
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid refresh token' });
    }
  }

  @Public()
  @Post('register')
  async register(@Res() response, @Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (existingUser && existingUser.refreshToken != 'notVerified') {
      return await response.status(HttpStatus.CREATED).json({
        message: 'User already exists !',
        existingUser,
      });
    }

    if (existingUser && existingUser.refreshToken === 'notVerified') {
      console.log('User exists and just have to verify');
      try {
        const payload = { email: existingUser.email, sub: existingUser._id };

        const token = await this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        });

        await this.emailService.sendVerificationEmail(
          existingUser.email,
          token
        );

        return await response.status(HttpStatus.CREATED).json({
          message:
            'User already exists and just have to verify ! We juste resent the verification email, please check your mails',
          existingUser,
        });
      } catch (err) {
        console.log(err);
        return err;
      }
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      createUserDto.password = hashedPassword;
      createUserDto.accessToken = 'notVerified';
      const newUser = await this.userService.create(createUserDto);
      return await response.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not registered!',
        error: 'Bad Request',
        err,
      });
    }
  }

  @Put('update-profile')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateProfile(
    @Res() response,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Req() req,
  ) {
    try {
      if (profilePicture) {
        updateUserDto.profilePicture = profilePicture.filename;
      }

      const updatedUser = await this.userService.update(
        req.user.sub,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Profil mis à jour avec succès',
        updatedUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Erreur: Veuillez vérifier si vous êtes connecté !',
        error: 'Bad Request',
        err,
      });
    }
  }

  @Get('email-verify')
  @Public()
  async verifyEmail(@Query('token') token: string, @Res() res) {
    try {
      console.log('decoded ' + token);
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(decoded);
      const user = await this.userService.findOne(decoded.sub);
      console.log(user);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      }

      if (user.refreshToken != 'notVerified') {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User is already verified',
        });
      }

      user.refreshToken = 'verified';
      await user.save();

      return "res.redirect('/login')";
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Invalid or expired token',
        error: error,
      });
    }
  }
}
