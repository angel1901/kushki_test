'use client'

import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import FormUploadFiles from "@/components/FormUploadFiles";

export default function Home() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleAnalyze = () => { }

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
