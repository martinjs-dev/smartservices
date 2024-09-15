import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";

@Module({
  providers: [EmailService],
  exports: [EmailService], // Exporter le service pour qu'il soit utilisé dans d'autres modules
})
export class EmailModule {}
