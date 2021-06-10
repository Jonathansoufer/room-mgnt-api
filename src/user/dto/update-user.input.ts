import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  password?: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  @IsOptional()
  company?: string;
}
