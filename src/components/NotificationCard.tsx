import { Snackbar, IconButton, Alert } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@mui/icons-material';

export function NotificationCard({ open, onClose, message, type }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    {type === 'success' ? (
                        <CheckCircleIcon sx={{ color: '#00C853' }} /> 
                    ) : (
                        <ErrorIcon sx={{ color: '#D50032' }} /> 
                    )}
                </IconButton>
            }
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}
        >
            <Alert onClose={onClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
}
