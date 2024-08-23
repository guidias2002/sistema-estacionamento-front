import axios, { AxiosPromise } from "axios"
import { VeiculoData } from "../interface/VeiculoData";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<VeiculoData[]> => {
    const response = await axios.get(API_URL + '/veiculos/estacionados')
    return response;
}

export function useVeiculosEstacionadosData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["veiculo-data"],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}