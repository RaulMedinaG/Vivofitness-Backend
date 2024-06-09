import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  create(@Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.create(createActividadDto);
  }

  @Get()
  findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.actividadService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActividadDto: UpdateActividadDto) {
    try {
      return this.actividadService.update(id, updateActividadDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.actividadService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
