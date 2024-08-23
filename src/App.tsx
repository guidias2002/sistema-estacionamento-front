import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Menu } from './components/menu/Menu';
import { TodosOsVeiculos } from './components/pages/TodosOsVeiculos';
import { VeiculosEstacionados } from './components/pages/VeiculosEstacionados';
import { RegistrarVeiculo } from './components/pages/RegistrarVeiculo';
import { BuscarVeiculo } from './components/pages/RegistroPorVeiculo';

function App() {
  return (
    <Router>
            <Menu />
            <Routes>
                <Route path="/todos-os-veiculos" element={<TodosOsVeiculos />} />
                <Route path="/veiculos-estacionados" element={<VeiculosEstacionados />} />
                <Route path="/buscar" element={<BuscarVeiculo />} />
            </Routes>
            <RegistrarVeiculo/>
    </Router>
  )
}

export default App
