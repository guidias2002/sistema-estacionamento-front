import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationCard } from '../NotificationCard';
import { useQueryClient } from "@tanstack/react-query";
import { PagamentoModal } from "../PagamentoModal";

export function Row(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputPlaca, setInputPlaca] = useState('');
    const [valor, setValor] = useState(null);
    const [periodoEmMinutos, setPeriodoEmMinutos] = useState(null);
    const [isPagamentoModalOpen, setPagamentoModalOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleCloseNotification = () => setNotificationOpen(false);

    const handleInputChange = (event) => {
        setInputPlaca(event.target.value);
    };

    const queryClient = useQueryClient();

    const handleRegistrarSaida = async () => {
        if (inputPlaca === props.placa) {
            try {
                const response = await axios.post(`http://localhost:8080/veiculos/saida/${props.placa}`);
                setValor(response.data.valor);
                setPeriodoEmMinutos(response.data.periodoEmMinutos);

                setPagamentoModalOpen(true); // Abre o modal de pagamento

                // Mostrar a notificação de sucesso
                setNotificationMessage('Saída registrada com sucesso!');
                setNotificationType('success');
                setNotificationOpen(true);

                // Mantenha o modal aberto por 5 segundos e depois fecha. 
                setTimeout(() => {
                    setPagamentoModalOpen(false);

                    // Só invalida a query após o modal ser fechado
                    queryClient.invalidateQueries({ queryKey: ["veiculo-data"] });
                }, 5000);

                handleCloseModal(); // Fecha o modal de registrar saída
            } catch (error) {
                setNotificationMessage('Erro ao registrar saída. Tente novamente.');
                setNotificationType('error');
                setNotificationOpen(true);
            }
        } else {
            setNotificationMessage('A placa inserida não corresponde à placa do veículo.');
            setNotificationType('error');
            setNotificationOpen(true);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell>{props.tipoVeiculo}</TableCell>
                <TableCell>{props.placa}</TableCell>
                <TableCell>{props.modelo}</TableCell>
                <TableCell>{props.cor}</TableCell>
                <TableCell>{new Date(props.entrada).toLocaleString()}</TableCell>
                <TableCell>
                    {props.saida ? new Date(props.saida).toLocaleString() : (
                        <>
                            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                                Registrar Saída
                            </Button>
                        </>
                    )}
                </TableCell>
                <TableCell>{props.valor}</TableCell>
                <TableCell>{props.periodoEmMinutos}</TableCell>
            </TableRow>

            {/* Modal de registrar saída */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ 
                    position: 'absolute', 
                    top: '40%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    borderRadius: 4,
                    boxShadow: 24, 
                    p: 4 
                }}>
                    <h2 id="modal-title">Registrar Saída</h2>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                        <TextField
                            label="Placa do Carro"
                            variant="outlined"
                            value={inputPlaca}
                            onChange={handleInputChange}
                            id="filled-size-normal"
                            fullWidth
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleRegistrarSaida}
                            sx={{ height: '40px', padding: '25px' }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Modal de Pagamento */}
            <PagamentoModal 
                open={isPagamentoModalOpen}
                valor={valor}
                periodoEmMinutos={periodoEmMinutos}
                onClose={() => setPagamentoModalOpen(false)}
            />

            <NotificationCard
                open={notificationOpen}
                onClose={handleCloseNotification}
                message={notificationMessage}
                type={notificationType}
            />
        </>
    );
}
