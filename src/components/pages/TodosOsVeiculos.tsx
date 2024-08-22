import { useVeiculoData } from '../../hooks/useVeiculoData';
import { TableComponent } from '../table/TableComponent';

export function TodosOsVeiculos() {
    const { data } = useVeiculoData();

    return <TableComponent data={data} showValorPeriodo={true} />;
}
