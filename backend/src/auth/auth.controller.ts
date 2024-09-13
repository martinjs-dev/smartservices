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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    return res.json(tokens);
  }

  @Get('google')
  @Redirect(process.env.GOOGLE_CALLBACK_URL)
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    return res.redirect('/profile');
  }

  @Get('facebook')
  @Redirect(process.env.FACEBOOK_CALLBACK_URL)
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    return res.redirect('/profile');
  }

  @Get('github')
  @Redirect(process.env.GITHUB_CALLBACK_URL)
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.login(user);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    return res.redirect('/profile');
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.verifyToken(req);
    if (user) {
      return res.status(HttpStatus.OK).json({ isAuthenticated: true });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ isAuthenticated: false });
  }
}
