import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useVeiculoData } from '../../hooks/useVeiculoData';
import { TableComponent } from '../table/TableComponent';

export function RegistroPorVeiculo() {
    const [inputPlaca, setInputPlaca] = useState('');
    const [placa, setPlaca] = useState('');
    const { data } = useVeiculoData();

    const veiculoFiltrado = placa ? data?.filter(veiculo => veiculo.placa === placa) : [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPlaca(e.target.value);
    };

    const handleSearch = () => {
        setPlaca(inputPlaca);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '80%',
                margin: '0 auto',
                gap: 2,
            }}
        >
            <TextField 
                label="Placa do Veículo" 
                value={inputPlaca} 
                onChange={handleChange} 
                sx={{ flexGrow: 1 }}
            />
            <Button 
                variant="contained" 
                onClick={handleSearch}
                sx={{ height: '100%' }}
            >
                Buscar
            </Button>
            {veiculoFiltrado.length > 0 ? (
                <TableComponent data={veiculoFiltrado} />
            ) : (
                placa && <Typography variant="body1">Nenhum veículo encontrado para a placa informada.</Typography>
            )}
        </Box>
    );
}
