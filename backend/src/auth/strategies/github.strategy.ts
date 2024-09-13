import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { emails, displayName, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: displayName.split(' ')[0],
      lastName: displayName.split(' ')[1] || '',
      profilePicture: photos[0].value,
      provider: 'github',
      providerId: profile.id,
      accessToken,
      refreshToken,
    };
    return this.authService.validateOAuthUser(user);
  }
}
