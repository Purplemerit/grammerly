import { Module } from '@nestjs/common';
import { PhonePeService } from './phonepe.service';

@Module({
  providers: [PhonePeService],
  exports: [PhonePeService],
})
export class PhonePeModule {}

