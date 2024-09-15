import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  Redirect,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/roles.decorator';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './role.enum';
// import { Public } from 'src/decorators/public.decorator';
// import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('user')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // // Create a new user
  // @Public()
  // @Post('register')
  // async register(@Res() response, @Body() createUserDto: CreateUserDto) {
  //   try {
  //     const newUser = await this.userService.create(createUserDto);
  //     return response.status(HttpStatus.CREATED).json({
  //       message: 'User created successfully',
  //       newUser,
  //     });
  //   } catch (err) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       statusCode: 400,
  //       message: 'Error: User not created!',
  //       error: 'Bad Request',
  //       err,
  //     });
  //   }
  // }

  // // Login a user
  // @Post('login')
  // async login(@Res() response, @Body() loginUserDto: LoginUserDto) {
  //   try {
  //     const user = await this.userService.login(loginUserDto);
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Login successful',
  //       user,
  //     });
  //   } catch (err) {
  //     return response.status(HttpStatus.UNAUTHORIZED).json({
  //       statusCode: 401,
  //       message: 'Error: Invalid credentials!',
  //       error: 'Unauthorized',
  //       err,
  //     });
  //   }
  // }

  // View user profile
  @Get('profile')
  async getProfile(@Res() response, @Query('id') userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      return { user };
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to get user profile',
        error: 'Bad Request',
        err,
      });
    }
  }

  // Update user information
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    try {
      if (profilePicture) {
        updateUserDto.profilePicture = profilePicture.filename;
      }
      const updatedUser = await this.userService.update(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        updatedUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not updated!',
        error: 'Bad Request',
        err,
      });
    }
  }

  // Get all users (renommé cette méthode)
  @Get()
  async getAllUsers(@Res() response) {
    try {
      const users = await this.userService.findAll();
      return response.status(HttpStatus.OK).json(users);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to get users',
        error: 'Bad Request',
        err,
      });
    }
  }

  // Get user by ID (renommé cette méthode)
  @Get('/:id')
  async getUserById(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      return { user };
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to get user',
        error: 'Bad Request',
        err,
      });
    }
  }

  // Delete a user
  @Delete('/:id')
  @Redirect('/user')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.remove(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to delete user',
        error: 'Bad Request',
        err,
      });
    }
  }
}
