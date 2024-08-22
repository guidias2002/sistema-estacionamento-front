import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TipoVeiculo } from '../../enum/TipoVeiculo';

interface RowProps {
    tipoVeiculo: TipoVeiculo;
    placa: string;
    modelo: string;
    cor: string;
    entrada: string;
    saida: string;
    valor: string;
    periodoEmMinutos: number;
}
    

export function Row(props : RowProps){
    const formatTimestamp = (timestamp: string | null) => {
        if (!timestamp) {
            return ""; 
        }
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return(
        <TableRow>
        <TableCell>{props.tipoVeiculo}</TableCell>
        <TableCell>{props.placa}</TableCell>
        <TableCell>{props.modelo}</TableCell>
        <TableCell>{props.cor}</TableCell>
        <TableCell>{formatTimestamp(props.entrada)}</TableCell>
        <TableCell>{formatTimestamp(props.saida)}</TableCell>
        <TableCell>{props.valor}</TableCell>
        <TableCell>{props.periodoEmMinutos}</TableCell>
        </TableRow>
    );
}