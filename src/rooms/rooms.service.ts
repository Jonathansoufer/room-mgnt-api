import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findAllRooms(): Promise<Room[]> {
    const rooms = await this.roomRepository.find();
    return rooms;
  }

  async findRoomById(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async findRoomByName(name: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { name } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async createRoom(data: CreateRoomInput): Promise<Room> {
    const { name } = data;
    const roomAlreadyExists = await this.roomRepository.findOne({
      where: { name },
    });

    if (roomAlreadyExists) {
      throw new InternalServerErrorException(
        `An Room with this name: ${data.name} already exists in your organization. Please use another name.`,
      );
    }

    const room = this.roomRepository.create(data);
    const roomSaved = await this.roomRepository.save(room);

    if (!roomSaved) {
      throw new InternalServerErrorException(
        'Something happened while creating your room. Please try again later.',
      );
    }

    return roomSaved;
  }

  async deleteRoom(id: string): Promise<boolean> {
    const room = await this.findRoomById(id);
    const deleted = await this.roomRepository.delete(room);
    if (deleted) {
      return true;
    }
    return false;
  }
}
