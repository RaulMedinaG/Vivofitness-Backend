import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Actividad, ActividadSchema } from './entities/actividad.entity';

@Module({
  controllers: [ActividadController],
  providers: [ActividadService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Actividad.name,
        schema: ActividadSchema
      }
    ])
  ],
})
export class ActividadModule {}
