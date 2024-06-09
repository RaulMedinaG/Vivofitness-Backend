import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';

@Controller('ejercicios')
export class EjerciciosController {
  constructor(private readonly ejerciciosService: EjerciciosService) {}

  @Post()
  create(@Body() createEjercicioDto: CreateEjercicioDto) {
    return this.ejerciciosService.create(createEjercicioDto);
  }

  @Get('all')
  findAll() {
    return this.ejerciciosService.findAll();
  }

  @Get('')
  findAllPaginated(@Query('page') page=1, @Query('pageSize') pageSize=10) {
    try {
      return this.ejerciciosService.findAllPaginated(+page, +pageSize);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.ejerciciosService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    try {
      return this.ejerciciosService.findByName(name);
    } catch (error) {
      throw error;
    }
    
  }

  @Get('muscle/:muscle')
  findByMuscle(@Param('muscle') muscle: string) {
    try {
      return this.ejerciciosService.findByMuscle(muscle);
    } catch (error) {
      throw error;
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjercicioDto: UpdateEjercicioDto) {
    try {
      return this.ejerciciosService.update(id, updateEjercicioDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.ejerciciosService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
