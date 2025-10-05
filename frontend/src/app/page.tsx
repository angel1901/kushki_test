'use client'

import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import FormUploadFiles from "@/components/FormUploadFiles";
import { analizeImage } from "@/services/analize";
import { Loading } from "@/components/Loading";
import { ResultsDisplay } from "@/components/ShowAnalize";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export default function Home() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analizeResponse, setAnalizeResponse] = useState<any>(null);

  const handleSelectImage = (imageUrl: File) => {
    setSelectedImage(imageUrl);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setAnalizeResponse(null);

    const multiformData = new FormData();
    multiformData.append('file', selectedImage);

    analizeImage(multiformData)
      .then((response) => {
        setAnalizeResponse(response?.data);
        setIsAnalyzing(false);
      })
      .catch((error) => {
        console.error("Error analyzing image:", error);
      })
      .finally(() => {
        setIsAnalyzing(false);
      });
  }

  const hanldeClear = () => {
    setAnalizeResponse(null);
    setSelectedImage(null);
  }

  return (
    <Grid container spacing={2} size={12} justifyContent="center" alignItems="center" mt={5}>
      <Grid container spacing={2} size={12}>

        <Grid size={12}>
          <Typography align="center" variant="h5">AI Image Analysis</Typography>
          <Typography align="center" variant="h6">Upload an image and let AI identify its contents</Typography>
        </Grid>

        <Grid size={8} alignItems="center" justifyContent="center" m='auto' bgcolor='white'>
          {
            (() => {
              if (!analizeResponse) {
                if (!isAnalyzing) {
                  return <FormUploadFiles selectedImage={selectedImage} handleSelectImage={handleSelectImage} handleAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} setPreviewImage={setPreviewImage} previewImage={previewImage} />;
                } else {
                  return <Loading />;
                }
              } else if (analizeResponse?.status !== 'success') {
                return <ErrorDisplay
                  message={analizeResponse?.message || 'An unexpected error occurred during analysis.'}
                  onRetry={handleAnalyze}
                  onDismiss={hanldeClear}
                />
              } else {
                return <ResultsDisplay results={analizeResponse?.data} onReset={hanldeClear} previewImage={previewImage} />;
              }
            })()
          }
        </Grid>

      </Grid>
    </Grid >
  );
}
