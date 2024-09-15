import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      console.log('Token not provided');
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (user.refreshToken == 'notVerified') {
        console.log('Please verify your email');
        throw new UnauthorizedException('Please verify your email');
      }

      request.user = user;
      console.log('Requêtte venant du token : ' + token + '\n');
      return true;
    } catch (error) {
      console.log('Requêtte venant de : ' + token + '\n Erreur : ' + error);
      return false;
    }
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
