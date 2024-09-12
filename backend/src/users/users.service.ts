import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface'; // Assure-toi du bon chemin
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
}
