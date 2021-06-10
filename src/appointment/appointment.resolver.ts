import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';

@Resolver('Room')
export class AppointmentResolver {
  constructor(private appointmentsService: AppointmentService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Appointment])
  async appointments(): Promise<Appointment[]> {
    const appointments = await this.appointmentsService.findAllAppointments();
    return appointments;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Appointment)
  async appointment(@Args('id') id: number): Promise<Appointment> {
    const appointment = await this.appointmentsService.findAppointmentById(id);
    return appointment;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Appointment)
  async appointmentByDate(@Args('time') time: Date): Promise<Appointment> {
    const appointment = await this.appointmentsService.findAppointmentByDate(
      time,
    );
    return appointment;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Appointment])
  async appointmentsByUserId(@Args('id') id: number): Promise<Appointment[]> {
    const appointments =
      await this.appointmentsService.findAppointmentsByUserId(id);
    return appointments;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Appointment])
  async appointmentsByRoomId(
    @Args('id') roomId: number,
  ): Promise<Appointment[]> {
    const appointments =
      await this.appointmentsService.findAppointmentsByRoomId(roomId);
    return appointments;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Appointment)
  async createAppointment(
    @Args('data') data: CreateAppointmentInput,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsService.createAppointment(data);
    return appointment;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteAppointment(@Args('id') id: number): Promise<boolean> {
    const deleted = await this.appointmentsService.deleteAppointment(id);
    return deleted;
  }
}
