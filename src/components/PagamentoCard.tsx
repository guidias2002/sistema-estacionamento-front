import { Box, Button, Modal, Typography } from '@mui/material';

interface PagamentoProps {
    valor: String
    periodoEmMinutos: number
    isPagamentoModalOpen: boolean
    handleClosePagamentoModal: () => void; 
}

export function PagamentoCard({ valor, periodoEmMinutos, isPagamentoModalOpen, handleClosePagamentoModal }: PagamentoProps) {
    return (
    <>
        <Modal
                open={isPagamentoModalOpen}
                onClose={handleClosePagamentoModal}
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
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="pagamento-modal-title" variant="h6" component="h2" gutterBottom>
                        Resumo do Pagamento
                    </Typography>
                    {valor !== null && periodoEmMinutos !== null ? (
                        <>
                            <Typography variant="body2" color="text.secondary">
                                Valor a pagar: R$ {valor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tempo estacionado: {periodoEmMinutos} minutos
                            </Typography>
                        </>                        
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Falha ao carregar os dados do pagamento.
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClosePagamentoModal}
                        sx={{ mt: 2 }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
