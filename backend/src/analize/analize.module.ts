import { Module } from '@nestjs/common';
import { AnalizeController } from './analize.controller';
import { AnalizeService } from './analize.service';
import { GeminiService } from 'src/gemini/gemini.service';

@Module({
  controllers: [AnalizeController],
  providers: [AnalizeService, GeminiService]
})
export class AnalizeModule { }
