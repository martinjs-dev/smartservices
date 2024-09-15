import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSchema } from "./schema/user.schema";
import { EmailService } from "src/email/email.service";
import { EmailModule } from "src/email/email.module";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    EmailModule,
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService, EmailService, JwtService],
  exports: [UserService, EmailService, JwtService],
})
export class UserModule {}
