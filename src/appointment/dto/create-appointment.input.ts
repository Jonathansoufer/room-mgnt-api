import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsDate()
  @IsNotEmpty()
  time: Date;
}
