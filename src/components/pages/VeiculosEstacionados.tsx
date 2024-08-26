import { useVeiculosEstacionadosData } from '../../hooks/useVeiculosEstacionadosData';
import { TableComponent } from '../table/TableComponent';

export function VeiculosEstacionados() {
    const { data } = useVeiculosEstacionadosData();
    const filterData = data?.filter(veiculo => veiculo.saida === null)

    return <TableComponent data={filterData} showValorPeriodo={false} />;
}