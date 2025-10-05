'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#88ABF2',
        },
        secondary: {
            main: '#88B6F2',
        },
        background: {
            default: '#F2F2F2',
            paper: '#F2F2F2',
        },
        text: {
            primary: '##0D0D0D',
        },
        success: {
            main: '#1cc88a',
        },
        warning: {
            main: '#f6c23e',
        },
        error: {
            main: '#e74a3b',
        },
        info: {
            main: '#36b9cc',
        },
        divider: '#dee2e6',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                },
            },
        },
    },
});

export default theme;
