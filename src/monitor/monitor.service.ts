import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Monitor } from './entities/monitor.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class MonitorService {

  constructor(@InjectModel(Monitor.name) private monitorModel: Model<Monitor>) {

  }

  create(monitorModel: CreateMonitorDto) {
    try {
      const newMonitor = new this.monitorModel(monitorModel);
      return newMonitor.save();
    } catch (error) {
      throw new InternalServerErrorException('No se ha podido crear el monitor');
    }
  }

  findAll() {
    try{
      const monitores = this.monitorModel.find();
      return monitores;
    } catch(error){
      console.log(error);
    }
  }

  findById(id: string) {

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Por favor, introduzca un id correcto');
    }

    const monitor = this.monitorModel.findById(id);
    
    if (!monitor) {
      throw new NotFoundException('Monitor no encontrado');
    }

    return monitor;
  }

  async update(monitorId: string, updateMonitorDto: UpdateMonitorDto): Promise<Monitor> {
    const existingMonitor = await this.monitorModel.findByIdAndUpdate(monitorId, updateMonitorDto, { new: true });
    if (!existingMonitor) {
      throw new NotFoundException(`Monitor #${monitorId} no encontrado`);
    }
    return existingMonitor;
  }

  async remove(monitorId: string): Promise<Monitor> {
    const deletedMonitor = await this.monitorModel.findByIdAndDelete(monitorId);
    if (!deletedMonitor) {
      throw new NotFoundException(`Monitor #${monitorId} no encontrado`);
    }
    return deletedMonitor;
  }
}
