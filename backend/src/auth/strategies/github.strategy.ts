// github.strategy.ts
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateOAuthUser({
      email: profile.emails[0].value,
      firstName: profile.displayName.split(' ')[0],
      lastName: profile.displayName.split(' ')[1] || '',
      profilePicture: profile._json.avatar_url,
      provider: 'github',
      providerId: profile.id,
      accessToken,
    });
    return user;
  }
}
