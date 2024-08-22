import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from '../row/row';
import { VeiculoData } from '../../interface/VeiculoData';

import './tableComponent.css'

interface TableComponentProps {
  data: VeiculoData[] | undefined;
}

export function TableComponent({ data }: TableComponentProps) {
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: '80%', margin: 'auto',  }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='boldTableCell'>Tipo Veículo</TableCell>
              <TableCell className='boldTableCell'>Placa</TableCell>
              <TableCell className='boldTableCell'>Modelo</TableCell>
              <TableCell className='boldTableCell'>Cor</TableCell>
              <TableCell className='boldTableCell'>Entrada</TableCell>
              <TableCell className='boldTableCell'>Saída</TableCell>
              <TableCell className='boldTableCell'>Valor</TableCell>
              <TableCell className='boldTableCell'>Período em Minutos</TableCell>
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
                    valor={veiculoData.valor}
                    periodoEmMinutos={veiculoData.periodoEmMinutos}
                />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
}