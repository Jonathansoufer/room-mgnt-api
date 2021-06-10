import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  roomId: number;

  @Column()
  userId: number;

  @Column()
  time: Date;
}
