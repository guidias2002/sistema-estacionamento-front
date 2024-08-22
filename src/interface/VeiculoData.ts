import { TipoVeiculo } from "../enum/TipoVeiculo";

export interface VeiculoData {
    tipoveiculo: TipoVeiculo;
    placa: string;
    modelo: string;
    cor: string;
    entrada: string;
    saida: string;
    valor: string;
    periodoEmMinutos: number;
}
   