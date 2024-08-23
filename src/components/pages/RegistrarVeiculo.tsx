// src/pages/registrarVeiculo.tsx
import { useState } from 'react';
import { Box, Button, Modal, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { TipoVeiculo } from '../../enum/TipoVeiculo';
import { validarVeiculo } from '../../validarVeiculo';
import { NotificationCard } from '../NotificationCard'; 

export function RegistrarVeiculo() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tipoVeiculo, setTipoVeiculo] = useState('');
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');

    const [errors, setErrors] = useState({
        tipoVeiculo: '',
        placa: '',
        modelo: '',
        cor: ''
    });

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success'); // 'success' or 'error'

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleCloseNotification = () => setNotificationOpen(false);

    const handleRegistrarVeiculo = async () => {
        const { formIsValid, errors } = validarVeiculo(tipoVeiculo, placa, modelo, cor);

        if (formIsValid) {
            try {
                await axios.post('http://localhost:8080/veiculos', {
                    tipoveiculo: tipoVeiculo,
                    placa,
                    modelo,
                    cor
                });
                
                // Mostrar a notificação
                setNotificationMessage('Cadastro realizado com sucesso!');
                setNotificationType('success');
                setNotificationOpen(true);
                
                // Resetando os campos após o sucesso do registro
                setTipoVeiculo('');
                setPlaca('');
                setModelo('');
                setCor('');
                setErrors({ tipoVeiculo: '', placa: '', modelo: '', cor: '' });

                handleCloseModal();
            } catch (error) {
                setNotificationMessage('Erro ao registrar veículo. Tente novamente.');
                setNotificationType('error');
                setNotificationOpen(true);
            }
        } else {
            setErrors(errors);
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
                            error={Boolean(errors.tipoVeiculo)}
                            helperText={errors.tipoVeiculo}
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
                            onChange={(e) => setPlaca(e.target.value.toUpperCase())} // converte para maiúsculo automaticamente
                            fullWidth
                            error={Boolean(errors.placa)}
                            helperText={errors.placa}
                        />

                        <TextField
                            label="Modelo"
                            variant="outlined"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            fullWidth
                            error={Boolean(errors.modelo)}
                            helperText={errors.modelo}
                        />

                        <TextField
                            label="Cor"
                            variant="outlined"
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            fullWidth
                            error={Boolean(errors.cor)}
                            helperText={errors.cor}
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

            <NotificationCard
                open={notificationOpen}
                onClose={handleCloseNotification}
                message={notificationMessage}
                type={notificationType}
            />
        </>
    );
}
