import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalizeModule } from './analize/analize.module';

@Module({
  imports: [AnalizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
