import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ejercicio } from './entities/ejercicio.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EjerciciosService {

  constructor(@InjectModel(Ejercicio.name) private ejercicioModel: Model<Ejercicio>) {

  }

  create(createEjercicioDto: CreateEjercicioDto) {
    try {
      const newEjercicio = new this.ejercicioModel(createEjercicioDto);
      return newEjercicio.save();
    } catch (error) {
      throw new InternalServerErrorException('No se ha podido crear el ejercicio');
    }
  }

  findAll() {
    try{
      const ejercicios = this.ejercicioModel.find();
      return ejercicios;
    } catch(error){
      console.log(error);
    }
  }

  async findAllPaginated(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const totalItems = await this.ejercicioModel.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);


    const ejercicios = await this.ejercicioModel.find().skip(skip).limit(pageSize);

    let nextPage = null;
    if (page < totalPages) {
      nextPage = `/ejercicios?page=${page + 1}&pageSize=${pageSize}`;
    }

    return { nextPage, ejercicios };
  }

  findById(id: string) {

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Por favor, introduzca un id correcto');
    }

    const ejercicio = this.ejercicioModel.findById(id);
    
    if (!ejercicio) {
      throw new NotFoundException('Ejercicio no encontrado');
    }

    return ejercicio;
  }
  
  findByName(name: string) {
    return this.ejercicioModel.find({ name: { $regex: name, $options: 'i' } });
  }

  findByMuscle(muscle: string) {
    return this.ejercicioModel.find({ muscle: muscle });
  }

  async update(ejercicioId: string, updateEjercicioDto: UpdateEjercicioDto): Promise<Ejercicio> {
    const existingEjercicio = await this.ejercicioModel.findByIdAndUpdate(ejercicioId, updateEjercicioDto, { new: true });
    if (!existingEjercicio) {
      throw new NotFoundException(`Ejercicio #${ejercicioId} no encontrado`);
    }
    return existingEjercicio;
  }

  async remove(ejercicioId: string): Promise<Ejercicio> {
    const deletedEjercicio = await this.ejercicioModel.findByIdAndDelete(ejercicioId);
    if (!deletedEjercicio) {
      throw new NotFoundException(`Ejercicio #${ejercicioId} no encontrado`);
    }
    return deletedEjercicio;
  }
}
