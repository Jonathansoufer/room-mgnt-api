import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService, RoomsResolver],
})
export class RoomsModule {}
