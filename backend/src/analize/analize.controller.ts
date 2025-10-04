import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnalizeService } from './analize.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('analize')
export class AnalizeController {
    constructor(private readonly analizeService: AnalizeService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    analizeFile(@UploadedFile() file: Express.Multer.File): object {
        return this.analizeService.analizeFile(file);
    }
}
