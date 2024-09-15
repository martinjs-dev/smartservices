import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.interface";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Request } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateOAuthUser(user: any): Promise<User> {
    const userDto: CreateUserDto = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      provider: user.provider,
      providerId: user.providerId,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
    return this.userService.findOrCreate(userDto);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
      status: user.refreshToken,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "60m" });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async verifyToken(req: Request): Promise<any> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return decoded;
    } catch (error) {
      throw new UnauthorizedException("Invalid token : " + error);
    }
  }
}
