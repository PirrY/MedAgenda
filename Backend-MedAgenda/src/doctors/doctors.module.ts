import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';

@Module({
  providers: [DoctorsService],
  controllers: [DoctorsController]
})
export class DoctorsModule {}
