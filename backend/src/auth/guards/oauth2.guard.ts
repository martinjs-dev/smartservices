import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OAuth2AuthGuard extends AuthGuard('oauth2') {
  canActivate(context: ExecutionContext): boolean {
    return super.canActivate(context) as boolean;
  }
}
