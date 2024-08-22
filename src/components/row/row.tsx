import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TipoVeiculo } from '../../enum/TipoVeiculo';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

interface RowProps {
    tipoVeiculo: TipoVeiculo;
    placa: string;
    modelo: string;
    cor: string;
    entrada: string;
    saida: string;
    valor?: string;
    periodoEmMinutos?: number;
}
    

export function Row(props : RowProps){

    const [isModalOpen, setModalOpen] = useState(false);
    const [inputPlaca, setInputPlaca] = useState('');

    const formatTimestamp = (timestamp: string | null) => {
        if (!timestamp) {
            return ""; 
        }
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPlaca(event.target.value);
    };

    const handleRegistrarSaida = async () => {
        if (inputPlaca === props.placa) {
            try {
                await axios.post(`http://localhost:8080/veiculos/saida/${props.placa}`);
                alert('Saída registrada com sucesso!');
                handleCloseModal();
            } catch (error) {
                alert('Erro ao registrar saída. Tente novamente.');
            }
        } else {
            alert('A placa inserida não corresponde à placa do veículo.');
        }
    };

    return(
        <TableRow>
        <TableCell>{props.tipoVeiculo}</TableCell>
        <TableCell>{props.placa}</TableCell>
        <TableCell>{props.modelo}</TableCell>
        <TableCell>{props.cor}</TableCell>
        <TableCell>{formatTimestamp(props.entrada)}</TableCell>
        <TableCell>
                {props.saida || (
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
        </TableRow>
    );
}