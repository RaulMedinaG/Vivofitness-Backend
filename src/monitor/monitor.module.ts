import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Monitor, MonitorSchema } from './entities/monitor.entity';

@Module({
  controllers: [MonitorController],
  providers: [MonitorService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Monitor.name,
        schema: MonitorSchema
      }
    ])
  ],
})
export class MonitorModule {}
