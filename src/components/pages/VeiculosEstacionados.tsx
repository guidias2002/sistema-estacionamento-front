import { useVeiculosEstacionadosData } from '../../hooks/useVeiculosEstacionadosData';
import { TableComponent } from '../table/TableComponent';

export function VeiculosEstacionados() {
    const { data } = useVeiculosEstacionadosData();

    return <TableComponent data={data} showValorPeriodo={false} />;
}