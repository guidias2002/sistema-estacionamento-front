export const validarVeiculo = (tipoVeiculo, placa, modelo, cor) => {
    let errors = { tipoVeiculo: '', placa: '', modelo: '', cor: '' };
    let formIsValid = true;

    if (!tipoVeiculo) {
        errors.tipoVeiculo = 'O tipo de veículo é obrigatório.';
        formIsValid = false;
    }

    const placaRegex = /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!placa) {
        errors.placa = 'A placa é obrigatória.';
        formIsValid = false;
    } else if (!placaRegex.test(placa)) {
        errors.placa = 'Placa inválida. Deve seguir o formato ABC-1234 ou ABC1D23.';
        formIsValid = false;
    }

    const letrasNumerosRegex = /^[A-Za-z0-9\s]+$/;

    if (!modelo) {
        errors.modelo = 'O modelo é obrigatório.';
        formIsValid = false;
    }

    if (!letrasNumerosRegex.test(modelo)) {
        errors.modelo = 'O modelo deve conter apenas letras e números.';
        formIsValid = false;
    }

    const letrasRegex = /^[A-Za-z\s]+$/;

    if (!cor) {
        errors.cor = 'A cor é obrigatória.';
        formIsValid = false;
    } 
    
    if (!letrasRegex.test(cor)) {
        errors.cor = 'A cor deve conter apenas letras.';
        formIsValid = false;
    }

    return { formIsValid, errors };
};
