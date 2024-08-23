import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from '../row/row';
import { VeiculoData } from '../../interface/VeiculoData';


interface TableComponentProps {
  data: VeiculoData[] | undefined;
  showValorPeriodo: boolean;
}

export function TableComponent({ data, showValorPeriodo }: TableComponentProps) {
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: '80%', margin: 'auto',  }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo Veículo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Placa</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Modelo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Entrada</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Saída</TableCell>
              {showValorPeriodo && <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>}
              {showValorPeriodo && <TableCell sx={{ fontWeight: 'bold' }}>Período em Minutos</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(veiculoData => 
                <Row 
                    tipoVeiculo={veiculoData.tipoveiculo}
                    placa={veiculoData.placa}
                    modelo={veiculoData.modelo}
                    cor={veiculoData.cor}
                    entrada={veiculoData.entrada}
                    saida={veiculoData.saida}
                    valor={showValorPeriodo ? veiculoData.valor : undefined}
                    periodoEmMinutos={showValorPeriodo ? veiculoData.periodoEmMinutos : undefined}
                />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
}