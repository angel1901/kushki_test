import { Alert, Snackbar } from "@mui/material";

type SnackbarComponentProps = {
    readonly open: boolean;
    readonly handleClose: () => void;
    readonly variant: 'success' | 'error' | 'info' | 'warning';
    readonly message: string;
};

export default function SnackbarComponent({ open, handleClose, variant = 'success', message }: SnackbarComponentProps) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={variant}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}