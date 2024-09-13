import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { email, given_name, family_name, picture } = profile._json;
    const user = {
      email,
      firstName: given_name,
      lastName: family_name,
      profilePicture: picture,
      provider: 'google',
      providerId: profile.id,
      accessToken,
      refreshToken,
    };
    return this.authService.validateOAuthUser(user);
  }
}
