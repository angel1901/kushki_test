import { Module } from '@nestjs/common';
import { AnalizeController } from './analize.controller';
import { AnalizeService } from './analize.service';

@Module({
  controllers: [AnalizeController],
  providers: [AnalizeService]
})
export class AnalizeModule {}
