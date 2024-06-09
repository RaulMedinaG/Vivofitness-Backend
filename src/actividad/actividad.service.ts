import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Actividad } from './entities/actividad.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ActividadService {

  constructor(@InjectModel(Actividad.name) private actividadModel: Model<Actividad>) {

  }

  create(createActividadDto: CreateActividadDto) {
    try {
      const newActividad = new this.actividadModel(createActividadDto);
      return newActividad.save();
    } catch (error) {
      throw new InternalServerErrorException('No se ha podido crear la actividad');
    }
  }

  findAll() {
    try{
      const actividades = this.actividadModel.find();
      return actividades;
    } catch(error){
      console.log(error);
    }
  }
  
  findById(id: string) {

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Por favor, introduzca un id correcto');
    }

    const actividad = this.actividadModel.findById(id);
    
    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada');
    }

    return actividad;
  }

  async update(actividadId: string, updateActividadDto: UpdateActividadDto): Promise<Actividad> {
    const existingActividad = await this.actividadModel.findByIdAndUpdate(actividadId, updateActividadDto, { new: true });
    if (!existingActividad) {
      throw new NotFoundException(`Actividad #${actividadId} no encontrada`);
    }
    return existingActividad;
  }

  async remove(actividadId: string): Promise<Actividad> {
    const deletedActividad = await this.actividadModel.findByIdAndDelete(actividadId);
    if (!deletedActividad) {
      throw new NotFoundException(`Actividad #${actividadId} no encontrada`);
    }
    return deletedActividad;
  }
}
