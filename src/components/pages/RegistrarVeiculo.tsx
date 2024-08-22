import React, { useState } from 'react';
import { Box, Button, Modal, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { TipoVeiculo } from '../../enum/TipoVeiculo';

export function RegistrarVeiculo() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tipoVeiculo, setTipoVeiculo] = useState('');
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleRegistrarVeiculo = async () => {
        try {
            await axios.post('http://localhost:8080/veiculos', {
                tipoveiculo: tipoVeiculo,
                placa,
                modelo,
                cor
            });
            alert('Veículo registrado com sucesso!');
            handleCloseModal();
        } catch (error) {
            alert('Erro ao registrar veículo. Tente novamente.');
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
            >
                Registrar Veículo
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
                    p: 4,
                }}>
                    <h2 id="modal-title">Registrar Veículo</h2>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            select
                            label="Tipo do Veículo"
                            value={tipoVeiculo}
                            onChange={(e) => setTipoVeiculo(e.target.value)}
                            fullWidth
                        >
                            {Object.keys(TipoVeiculo).map((key) => (
                                <MenuItem key={key} value={key}>
                                    {key}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Placa"
                            variant="outlined"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Modelo"
                            variant="outlined"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Cor"
                            variant="outlined"
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRegistrarVeiculo}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
