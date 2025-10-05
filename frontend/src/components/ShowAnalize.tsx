import { Card, CardContent, Box, Grid, Typography, Button, Stack } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { ShowAnalizeRow } from "./ShowAnalizeRow";

interface ShowAnalizeProps {
    results: {
        image_description: string;
        statistics: Array<any>;
    };
    onReset: () => void;
    previewImage: string | null;
}

export function ResultsDisplay({ results, onReset, previewImage }: Readonly<ShowAnalizeProps>) {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <CheckCircleIcon color="success" fontSize="medium" />
                <Typography variant="h6" fontWeight={600}>Analysis Complete</Typography>
            </Stack>


            <Grid container spacing={3} size={12}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card elevation={6}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Uploaded Image
                            </Typography>
                            <Box sx={{ position: "relative", overflow: "hidden", boxShadow: 3 }}>
                                <img
                                    src={previewImage || "/placeholder.svg"}
                                    alt="Analyzed"
                                    style={{ width: "100%", height: "auto", display: "block" }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2} sx={{ mb: 1 }} size={12}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Detected Tags
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            {results?.image_description ?? '--'}
                        </Typography>

                        <Grid container spacing={2} size={12}>
                            {
                                results?.statistics?.map((tag: any, index: number) => (
                                    <ShowAnalizeRow key={`${tag?.label}-${index}`} tag={tag} index={index} />
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="center">
                <Button
                    onClick={onReset}
                    variant="outlined"
                    size="large"
                    startIcon={<RestartAltIcon />}
                    sx={{ px: 4, textTransform: "none", boxShadow: 1, bgcolor: "transparent", "&:hover": { boxShadow: 3 } }}
                >
                    Analyze Another Image
                </Button>
            </Box>
        </Box>
    );
}
