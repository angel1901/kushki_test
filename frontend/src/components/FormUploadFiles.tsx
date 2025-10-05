"use client";

import { useRef, useState, type ChangeEvent } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import SnackbarComponent from "./SnackbarComponent";

interface UploadFormProps {
    selectedImage: File | null;
    handleSelectImage: (imageUrl: File | null) => void;
    handleAnalyze: () => void;
    isAnalyzing: boolean;
    setPreviewImage: (imageUrl: string | null) => void;
    previewImage: string | null;
}

export default function FormUploadFiles({
    selectedImage,
    handleSelectImage,
    handleAnalyze,
    isAnalyzing,
    setPreviewImage,
    previewImage
}: Readonly<UploadFormProps>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarStatus, setSnackbarStatus] = useState<'success' | 'error'>('success');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validMimeTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/heic',
            'image/heif',
        ];

        if (file) {
            if (!validMimeTypes.includes(file.type)) {
                setPreviewImage(null);
                handleSelectImage(null);
                showSnackbar('Invalid file type. Please upload an image file (PNG, JPG, WEBP, HEIC, HEIF).', 'error');

                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    handleSelectImage(file);
                    setPreviewImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
            showSnackbar('File uploaded successfully', 'success');
        }
    };

    const showSnackbar = (message: string, status: 'success' | 'error') => {
        setOpenSnackbar(true);
        setSnackbarMessage(message);
        setSnackbarStatus(status);
    }

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
                                        src={previewImage || "/placeholder.svg"}
                                        alt="Selected preview"
                                        sx={{ width: "100%", height: "auto", borderRadius: 2, boxShadow: 3 }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            bgcolor: "rgba(0,0,0,0)",
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

            <SnackbarComponent open={openSnackbar} handleClose={() => setOpenSnackbar(false)} variant={snackbarStatus} message={snackbarMessage} />
        </Card>
    );
}
