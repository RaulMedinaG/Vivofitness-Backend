import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { AuthModule } from './auth/auth.module';
import { MonitorModule } from './monitor/monitor.module';
import { ActividadModule } from './actividad/actividad.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EjerciciosModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    MonitorModule,
    ActividadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
