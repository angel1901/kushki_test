import { Card, CardContent, Box, Stack, Typography, CircularProgress, LinearProgress } from "@mui/material";

export function Loading() {
    return (
        <Card elevation={6} sx={{ p: { xs: 4, md: 6 } }}>
            <CardContent>
                <Stack spacing={3} alignItems="center" justifyContent="center">
                    <CircularProgress size={64} />
                    <Box textAlign="center">
                        <Typography variant="h6" component="h3">
                            Analyzing Image
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Our AI is processing your image...
                        </Typography>
                    </Box>

                    <Box sx={{ width: "100%", maxWidth: 480 }}>
                        <LinearProgress />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
