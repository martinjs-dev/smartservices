import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
  Redirect,
  HttpStatus,
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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
        `${process.env.FRONTEND_URL}/profile?token=${tokens.access_token}`,
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
        `${process.env.FRONTEND_URL}/profile?token=${tokens.access_token}`,
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
        `${process.env.FRONTEND_URL}/profile?token=${tokens.access_token}`,
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
}
