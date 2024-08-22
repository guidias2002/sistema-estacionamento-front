import { useVeiculoData } from '../../hooks/useVeiculoData';
import { TableComponent } from '../table/TableComponent';

export function VeiculosEstacionados() {
    const { data } = useVeiculoData();
    const veiculosEstacionados = data?.filter(veiculo => !veiculo.saida);

    return <TableComponent data={veiculosEstacionados} showValorPeriodo={false} />;
}