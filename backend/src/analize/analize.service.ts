import { BadRequestException, Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class AnalizeService {
    constructor(private readonly geminiService: GeminiService) { }

    async analizeFile(file: Express.Multer.File) {
        try {
            if (!file) {
                throw new BadRequestException('No file uploaded');
            }

            // Validate the file
            this.isValidFile(file);

            const prompt = `
                You are an expert image analyzer.  
                Look carefully at the following image and analyze.

                1. Create a short, descriptive sentence summarizing what the image shows.
                2. Identify up to 5 key visual elements, objects, animals, people, or concepts.
                3. For each element, include its label and a confidence value between 0 and 1.
            `;

            const response = await this.geminiService.analyzeImage(file, prompt);

            return {
                'status': 'success', 'message': 'File analyzed successfully', 'data': response
            };
        } catch (error) {
            return { 'status': 'error', 'message': error?.message };
        }
    }

    /**
     * Validates the uploaded file.
     * @param file The uploaded file to validate.
     * @throws BadRequestException if the file is not valid.
     */
    private isValidFile(file: Express.Multer.File): void {

        // Mime types allowed on Gemini for images => https://ai.google.dev/gemini-api/docs/image-understanding?hl=es-419#supported-formats
        const validMimeTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/heic',
            'image/heif',
        ];

        if (file.mimetype && !validMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('invalid file type, this service only accepts image files.');
        }

        // the max file size is 50MB
        if (file.size > 50 * 1024 * 1024) {
            throw new BadRequestException('file size exceeds the 50MB limit.');
        }
    }
}
