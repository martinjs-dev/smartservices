import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface'; // Assure-toi du bon chemin
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    const newUser = await createdUser.save();

    try {
      const payload = { email: newUser.email, sub: newUser._id };

      const token = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      });

      if (createUserDto.refreshToken == 'notVerified') {
        await this.emailService.sendVerificationEmail(newUser.email, token);
      }

      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find().exec();
    if (!user || user.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // async findByEmail(email: string): Promise<User> {
  //   const user = await this.findOne({email: {email}});
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not found`);
  //   }
  //   return user;
  // }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async findOrCreate(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(userDto.email);
    if (existingUser) {
      return existingUser;
    }
    userDto.accessToken = 'RegisteredByOAuth2';
    return this.create(userDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    if (loginUserDto.provider && loginUserDto.providerId) {
      // Connexion via OAuth2
      const user = await this.userModel
        .findOne({
          provider: loginUserDto.provider,
          providerId: loginUserDto.providerId,
        })
        .exec();

      if (!user) {
        // Optionnel: Crée l'utilisateur s'il n'existe pas déjà
        const newUser = new this.userModel({
          email: loginUserDto.email, // Peut être requis si disponible
          provider: loginUserDto.provider,
          providerId: loginUserDto.providerId,
          accessToken: loginUserDto.accessToken,
          refreshToken: loginUserDto.refreshToken,
        });
        return newUser.save();
      }
      return user;
    } else {
      // Connexion traditionnelle avec email et mot de passe
      const user = await this.userModel
        .findOne({
          email: loginUserDto.email,
          password: loginUserDto.password,
        })
        .exec();

      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }
      return user;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }
}
