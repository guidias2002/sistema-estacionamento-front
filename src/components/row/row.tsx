import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationCard } from '../NotificationCard';
import { PagamentoCard } from '../PagamentoCard';  
import { useQueryClient } from "@tanstack/react-query";

export function Row(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputPlaca, setInputPlaca] = useState('');

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');

    // Novos estados para armazenar o valor e o período retornados
    const [valor, setValor] = useState(null);
    const [periodoEmMinutos, setPeriodoEmMinutos] = useState(null);
    const [isPagamentoModalOpen, setPagamentoModalOpen] = useState(false); // Novo estado para controlar o modal de pagamento

    const formatTimestamp = (timestamp) => {
        if (!timestamp) {
            return "";
        }
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

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
                
                // valor retornado pelo banckend
                const { valor, periodoEmMinutos } = response.data;

                // atualiza os estados com os dados retornados
                setValor(valor);
                setPeriodoEmMinutos(periodoEmMinutos);

                // abre o modal de pagamento
                setPagamentoModalOpen(true);

                // Mostrar a notificação
                setNotificationMessage('Saída registrada com sucesso!');
                setNotificationType('success');
                setNotificationOpen(true);

                queryClient.invalidateQueries({ queryKey: ["veiculo-data"] });
                
                handleCloseModal();
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

    const handleClosePagamentoModal = () => setPagamentoModalOpen(false); // Função para fechar o modal de pagamento

    return (
        <>
            <TableRow>
                <TableCell>{props.tipoVeiculo}</TableCell>
                <TableCell>{props.placa}</TableCell>
                <TableCell>{props.modelo}</TableCell>
                <TableCell>{props.cor}</TableCell>
                <TableCell>{formatTimestamp(props.entrada)}</TableCell>
                <TableCell>
                    {props.saida ? formatTimestamp(props.saida) : (
                        <>
                            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                                Registrar Saída
                            </Button>
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
                        </>
                    )}
                </TableCell>
                <TableCell>{props.valor}</TableCell>
                <TableCell>{props.periodoEmMinutos}</TableCell>

                <NotificationCard
                    open={notificationOpen}
                    onClose={handleCloseNotification}
                    message={notificationMessage}
                    type={notificationType}
                />
            </TableRow>

            {/* Modal para exibir o card de pagamento */}
            
            <PagamentoCard valor={valor} periodoEmMinutos={periodoEmMinutos} isPagamentoModalOpen={isPagamentoModalOpen} handleClosePagamentoModal={handleClosePagamentoModal}/>
        </>
    );
}
