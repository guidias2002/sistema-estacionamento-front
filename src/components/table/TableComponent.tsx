import * as XLSX from 'xlsx';
import { IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Row } from '../row/row';
import { useState } from 'react';
import { VeiculoData } from '../../interface/VeiculoData';

interface TableComponentProps {
  data: VeiculoData[] | undefined;
  showValorPeriodo: boolean;
}

export function TableComponent({ data, showValorPeriodo }: TableComponentProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExportToExcel = () => {
    if (!data) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Veiculos");

    XLSX.writeFile(workbook, "veiculos_estacionados.xlsx");
    handleMenuClose();
  };

  const handleExportToJson = () => {
    if (!data) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'veiculos_estacionados.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleMenuClose();
  };

  const paginatedData = data ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650, width: '80%', margin: 'auto' }} aria-label="simple table">
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
              {/* Coluna adicional para o botão de três pontinhos */}
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                <IconButton onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(veiculoData => 
              <Row 
                key={veiculoData.placa}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        component="div"
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleExportToExcel}>Exportar em .xlsx</MenuItem>
        <MenuItem onClick={handleExportToJson}>Exportar em JSON</MenuItem>
      </Menu>
    </>
  );
}
