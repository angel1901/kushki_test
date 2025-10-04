import { GoogleGenAI, Type } from '@google/genai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
    private readonly ai: GoogleGenAI;
    private file?: Express.Multer.File;

    constructor() {
        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    /**
     * Analyzes an image using the Gemini API.
     * @param imageBuffer - The image buffer to analyze.
     * @param prompt - The prompt to guide the analysis.
     * @returns The analysis result from the Gemini API.
     */
    async analyzeImage(file: Express.Multer.File, prompt: string) {

        try {
            this.file = file;
            const model = 'gemini-2.5-flash';

            const response = await this.ai.models.generateContent({
                model,
                contents: this.setContents(prompt),
                config: this.setResponseConfig()

            });

            if (typeof response?.text !== 'string') {
                throw new Error('Invalid response from Gemini API');
            }

            return JSON.parse(response.text)

        } catch (error) {
            const json = JSON.parse(error?.message);
            throw new Error(json?.error?.message || 'Error analyzing image with Gemini API');
        }
    }

    /**
     * Prepares the contents for the Gemini API request.
     * @param imageBuffer - The image buffer to include in the request.
     * @param mimetype - The MIME type of the image.
     * @param prompt - The prompt to guide the analysis.
     * @returns array of contents for the Gemini API request
     */
    private setContents(prompt: string) {
        return [
            {
                role: 'user',
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            data: this.file?.buffer.toString('base64'),
                            mimeType: this.file?.mimetype
                        },
                    },
                ],


            },
        ];
    }

    /**
     * Prepares the configuration for the Gemini API request.
     * @returns configuration object for the Gemini API request
     */
    private setResponseConfig() {
        return {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    image_description: { type: Type.STRING },
                    statistics: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                label: { type: Type.STRING },
                                confidence: { type: Type.NUMBER },
                            },
                            required: ['label', 'confidence'],
                        },
                    },
                },
                required: ['image_description', 'statistics'],
            },
        }
    }
}
