import { Module } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { EjerciciosController } from './ejercicios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ejercicio, EjercicioSchema } from './entities/ejercicio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EjerciciosController],
  providers: [EjerciciosService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Ejercicio.name,
        schema: EjercicioSchema
      }
    ])
  ],
})
export class EjerciciosModule {}
