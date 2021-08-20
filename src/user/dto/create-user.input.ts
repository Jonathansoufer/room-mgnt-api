import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const feedbackMessage = 'This field cannot be empty.';
@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: feedbackMessage })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: feedbackMessage })
  email: string;

  @IsString()
  @IsNotEmpty({ message: feedbackMessage })
  password: string;

  @IsString()
  @IsNotEmpty({ message: feedbackMessage })
  company: string;
}
