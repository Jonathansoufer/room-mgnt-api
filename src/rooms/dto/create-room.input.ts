import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  company: string;

  @IsString()
  status: string;
}
