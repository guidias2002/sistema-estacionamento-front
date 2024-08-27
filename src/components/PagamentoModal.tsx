import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function PagamentoModal({ open, valor, periodoEmMinutos, onClose }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="pagamento-modal-title"
            aria-describedby="pagamento-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography id="pagamento-modal-title" variant="h6" component="h2">
                        Resumo do Pagamento
                    </Typography>
                    <IconButton onClick={onClose} sx={{ p: '8px' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {valor !== null && periodoEmMinutos !== null ? (
                    <>
                        <Typography variant="body1" color="text.primary">
                            Valor a pagar: <strong>R$ {valor}</strong>
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            Tempo estacionado: <strong>{periodoEmMinutos} minutos</strong>
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Falha ao carregar os dados do pagamento.
                    </Typography>
                )}
            </Box>
        </Modal>
    );
}
