import {
    Box,
    Paper,
    Stack,
    Typography,
    Button,
    Avatar,
    useTheme,
} from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import RefreshIcon from "@mui/icons-material/Refresh"
import CloseIcon from "@mui/icons-material/Close"

interface ErrorDisplayProps {
    message: string
    onRetry: () => void
    onDismiss: () => void
}

export function ErrorDisplay({ message, onRetry, onDismiss }: ErrorDisplayProps) {
    const theme = useTheme()

    return (
        <Box sx={{ maxWidth: 960, mx: "auto" }}>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 3, md: 4 },
                    borderWidth: 2,
                    borderColor: (t) => t.palette.error.main + "33",
                    bgcolor: (t) => t.palette.error.main + "1A",
                    borderRadius: 4,
                }}
            >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: theme.palette.error.main + "33",
                        }}
                    >
                        <ErrorOutlineIcon
                            sx={{ color: theme.palette.error.main, fontSize: 28 }}
                        />
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Analysis Failed
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 3,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {message}
                        </Typography>

                        <Stack direction="row" spacing={1.5} flexWrap="wrap">
                            <Button
                                onClick={onRetry}
                                startIcon={<RefreshIcon />}
                                variant="contained"
                            >
                                Try Again
                            </Button>

                            <Button
                                onClick={onDismiss}
                                startIcon={<CloseIcon />}
                                variant="outlined"
                            >
                                Start Over
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    )
}
