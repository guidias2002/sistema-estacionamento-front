import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Menu } from './components/menu/Menu';
import { TodosOsVeiculos } from './components/pages/TodosOsVeiculos';
import { VeiculosEstacionados } from './components/pages/VeiculosEstacionados';
import { RegistroPorVeiculo } from './components/pages/RegistroPorVeiculo';
import { RegistrarVeiculo } from './components/pages/RegistrarVeiculo';

function App() {
  return (
    <Router>
            <Menu />
            <Routes>
                <Route path="/todos-os-veiculos" element={<TodosOsVeiculos />} />
                <Route path="/veiculos-estacionados" element={<VeiculosEstacionados />} />
                <Route path="/registro-por-veiculo" element={<RegistroPorVeiculo />} />
            </Routes>
            <RegistrarVeiculo/>
    </Router>
  )
}

export default App
