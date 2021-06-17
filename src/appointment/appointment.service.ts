import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async findAllAppointments(): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find();
    return appointments;
  }

  async findAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async findAppointmentByDate(time: Date): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { time },
    });
    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }
    return appointment;
  }

  async findAppointmentsByRoomId(roomId: number): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find({
      where: { roomId },
    });

    if (!appointments) {
      throw new NotFoundException('appointment not found');
    }
    return appointments;
  }

  async findAppointmentsByUserId(id: number): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find({
      where: { userId: id },
    });

    if (!appointments) {
      throw new NotFoundException('appointment not found');
    }
    return appointments;
  }

  async createAppointment(data: CreateAppointmentInput): Promise<Appointment> {
    const { roomId, userId, time } = data;
    const appointmentAlreadyExists = await this.appointmentRepository.findOne({
      where: { roomId, userId, time },
    });

    if (appointmentAlreadyExists) {
      throw new InternalServerErrorException(
        `This room is not available due a previous appointment already exists for the same date/time. Please chose another date/time.`,
      );
    }

    const appointment = this.appointmentRepository.create(data);
    const appointmentSaved = await this.appointmentRepository.save(appointment);

    if (!appointmentSaved) {
      throw new InternalServerErrorException(
        'Something happened while creating your room. Please try again later.',
      );
    }

    return appointmentSaved;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const appointment = await this.findAppointmentById(id);
    const { userId } = appointment;

    //TODO: Implement check if user is the owner of the appointment.
    const deleted = await this.appointmentRepository.delete(appointment.id);
    if (deleted) {
      return true;
    }
    return false;
  }
}
