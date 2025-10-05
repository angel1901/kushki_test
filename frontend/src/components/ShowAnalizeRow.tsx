import { Grid, Typography, Chip, LinearProgress, Stack } from "@mui/material";

interface ShowAnalizeRowProps {
    readonly tag: {
        readonly label: string;
        readonly confidence: number;
    };
    readonly index: number;
}

export function ShowAnalizeRow({ tag, index }: ShowAnalizeRowProps) {

    const percentage = Math.round((tag?.confidence || 0) * 100);

    return (
        <Grid
            key={`${tag?.label}-${index}`}
            sx={{
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: (theme) => theme.palette.action.hover,
                transition: (theme) => theme.transitions.create("background-color", { duration: 150 }),
                "&:hover": { bgcolor: (theme) => theme.palette.action.selected },
            }}
            container
            size={12}
        >
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontWeight={500}>{tag?.label}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 180 }}>
                    <Grid size={10} sx={{ width: "100%" }}>
                        <LinearProgress variant="determinate" value={percentage} />
                    </Grid>
                    <Chip label={`${percentage}%`} size="small" variant="outlined" sx={{ fontFamily: "monospace" }} />
                </Stack>
            </Grid>
        </Grid>
    );
}


