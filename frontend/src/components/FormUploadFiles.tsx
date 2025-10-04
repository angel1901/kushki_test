"use client";

import { useRef, type ChangeEvent } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";

interface UploadFormProps {
    selectedImage: string | null;
    handleSelectImage: (imageUrl: string) => void;
    handleAnalyze: () => void;
    isAnalyzing: boolean;
}

export default function FormUploadFiles({
    selectedImage,
    handleSelectImage,
    handleAnalyze,
    isAnalyzing,
}: Readonly<UploadFormProps>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validMimeTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/heic',
            'image/heif',
        ];

        if (file && validMimeTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    handleSelectImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card elevation={6} sx={{ borderColor: "divider" }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box display="flex" flexDirection="column" gap={3}>

                    <Box
                        onClick={handleUploadClick}
                        sx={{
                            border: "2px dashed",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: { xs: 4, md: 6 },
                            textAlign: "center",
                            cursor: "pointer",
                            transition: (theme) => theme.transitions.create(["border-color", "background-color"], { duration: 150 }),
                            "&:hover": {
                                borderColor: "primary.main",
                            },
                            position: "relative",
                        }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />

                        {!selectedImage ? (
                            <Box>
                                <Box display="flex" justifyContent="center" mb={2}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
                                    </Box>
                                </Box>
                                <Typography variant="h6" color="text.primary" gutterBottom>
                                    Click to upload an image
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    PNG, JPG, WEBP, HEIC, HEIF
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                <Box sx={{ position: "relative", maxWidth: 480, mx: "auto" }}>
                                    <Box
                                        component="img"
                                        src={selectedImage || "/placeholder.svg"}
                                        alt="Selected preview"
                                        sx={{ width: "100%", height: "auto", borderRadius: 2, boxShadow: 3 }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            bgcolor: "rgba(0,0,0,0)",
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: (theme) => theme.transitions.create("background-color", { duration: 150 }),
                                            "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                                        }}
                                    >
                                        <ImageIcon sx={{ color: "common.white", opacity: 0, transition: "opacity .15s" }} className="mui-hover-icon" />
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary" mt={1}>
                                    Click to change image
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {selectedImage && (
                        <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                color="primary"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 700,
                                    boxShadow: 3,
                                    textTransform: "none",
                                    "&:hover": { boxShadow: 6 },
                                }}
                            >
                                Analyze
                            </Button>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
