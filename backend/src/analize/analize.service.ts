import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AnalizeService {

    analizeFile(file: Express.Multer.File): object {
        try {
            if (!file) {
                throw new BadRequestException('No file uploaded');
            }

            // Validate the file
            this.isValidFile(file);

            return {
                'status': 'success', 'message': 'File analyzed successfully', 'data': []
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
        if (!RegExp(/^image/).exec(file.mimetype)) {
            throw new BadRequestException('invalid file type, this service only accepts image files.');
        }

        // the max file size is 50MB
        if (file.size > 50 * 1024 * 1024) {
            throw new BadRequestException('file size exceeds the 50MB limit.');
        }
    }
}
