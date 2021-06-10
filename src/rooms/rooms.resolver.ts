import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Resolver('Room')
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Room])
  async rooms(): Promise<Room[]> {
    const rooms = await this.roomsService.findAllRooms();
    return rooms;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Room)
  async room(@Args('id') id: string): Promise<Room> {
    const room = await this.roomsService.findRoomById(id);
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Room)
  async roomByName(@Args('name') name: string): Promise<Room> {
    const room = await this.roomsService.findRoomByName(name);
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Room)
  async createRoom(@Args('data') data: CreateRoomInput): Promise<Room> {
    const room = await this.roomsService.createRoom(data);
    return room;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteRoom(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.roomsService.deleteRoom(id);
    return deleted;
  }
}
