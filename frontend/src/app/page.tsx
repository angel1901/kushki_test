'use client'

import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import FormUploadFiles from "@/components/FormUploadFiles";
import { analizeImage } from "@/services/analize";

export default function Home() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleSelectImage = (imageUrl: File) => {
    setSelectedImage(imageUrl);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    const multiformData = new FormData();
    multiformData.append('file', selectedImage);

    analizeImage(multiformData)
      .then((response) => {
        console.log("Analysis result:", response.data);
      })
      .catch((error) => {
        console.error("Error analyzing image:", error);
      })
      .finally(() => {
        setIsAnalyzing(false);
      });
  }

  return (
    <Grid container spacing={2} size={12} justifyContent="center" alignItems="center" mt={5}>
      <Grid container spacing={2} size={12}>

        <Grid size={12}>
          <Typography align="center" variant="h3">AI Image Analysis</Typography>
          <Typography align="center" variant="h5">Upload an image and let AI identify its contents</Typography>
        </Grid>

        <Grid size={8} alignItems="center" justifyContent="center" m='auto' bgcolor='white'>
          <FormUploadFiles selectedImage={selectedImage} handleSelectImage={handleSelectImage} handleAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </Grid>

      </Grid>
    </Grid >
  );
}
