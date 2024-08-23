import { useLocation } from 'react-router-dom';
import { useVeiculoData } from '../../hooks/useVeiculoData';
import { TableComponent } from '../table/TableComponent';
import { Typography } from '@mui/material';

export function BuscarVeiculo() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const placa = params.get('placa') || '';
    const { data } = useVeiculoData();

    const veiculoFiltrado = data?.filter(veiculo => veiculo.placa === placa);

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            {veiculoFiltrado && veiculoFiltrado.length > 0 ? (
                <TableComponent data={veiculoFiltrado} showValorPeriodo={false} />
            ) : (
                <Typography variant="body1">
                    Nenhum veículo encontrado para a placa: {placa}.
                </Typography>
            )}
        </div>
    );
}
