import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;

  image: string;
}
