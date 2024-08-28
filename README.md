# Sistema de Estacionamento - Frontend

Este documento descreve as telas do sistema de estacionamento, incluindo as funcionalidades e a interface do usuário.

## Telas do Sistema

### Tela: Veículos Estacionados

A tela **Veículos Estacionados** exibe a lista de veículos que ainda estão estacionados. Cada linha da tabela contém as seguintes informações:

- **Tipo de Veículo**: O tipo do veículo (e.g., Carro, Moto).
- **Placa**: A placa do veículo.
- **Modelo**: O modelo do veículo.
- **Cor**: A cor do veículo.
- **Entrada**: O horário de entrada do veículo.
- **Saída**: Um botão "Registrar Saída" que, ao ser clicado, abre um modal para confirmar a saída do veículo.

#### Funcionalidades:

- **Buscar pela Placa**: Campo de busca que permite filtrar os veículos pela placa.
- **Botão de Exportação**: Localizado ao lado direito da tabela, o botão representado por três pontos (...) permite a exportação dos dados em dois formatos:
  - Exportar em `.xlsx`
  - Exportar em `JSON`
- **Registrar Saída**: Ao clicar no botão "Registrar Saída", um modal é exibido solicitando a confirmação da placa. Se a placa for confirmada, a saída é registrada e o veículo é removido da lista.

### Tela: Todos os Veículos

A tela **Todos os Veículos** exibe a lista completa de veículos, tanto os estacionados quanto os que já registraram saída. A tabela nesta tela contém as seguintes colunas:

- **Tipo de Veículo**: O tipo do veículo (e.g., Carro, Moto).
- **Placa**: A placa do veículo.
- **Modelo**: O modelo do veículo.
- **Cor**: A cor do veículo.
- **Entrada**: O horário de entrada do veículo.
- **Saída**: O horário de saída, se registrado.
- **Valor**: O valor cobrado pelo estacionamento, calculado com base no período de permanência.
- **Período em Minutos**: O total de minutos que o veículo permaneceu estacionado.

#### Funcionalidades:

- **Buscar pela Placa**: Campo de busca para filtrar os veículos pela placa.
- **Botão de Exportação**: Similar à tela de "Veículos Estacionados", permite a exportação dos dados em `.xlsx` ou `JSON`.

## Como Executar

1. Clone o repositório.
2. Instale as dependências utilizando `npm install`.
3. Inicie o servidor com `npm start`.
4. Acesse o frontend em [http://localhost:3000](http://localhost:3000).
