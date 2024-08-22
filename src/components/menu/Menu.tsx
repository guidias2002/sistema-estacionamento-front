import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Divider } from '@mui/material';

export function Menu() {
    const location = useLocation();

    return (
        <>
            <AppBar className='appBar' position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #ccc', border: "none" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: 'auto' }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/veiculos-estacionados"
                        sx={{ 
                            backgroundColor: location.pathname === '/veiculos-estacionados' ? '#f0f0f0' : 'inherit',
                            borderBottom: location.pathname === '/veiculos-estacionados' ? '2px solid black' : 'none'
                        }}
                    >
                        Veículos Estacionados
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/todos-os-veiculos"
                        sx={{ 
                            backgroundColor: location.pathname === '/todos-os-veiculos' ? '#f0f0f0' : 'inherit',
                            borderBottom: location.pathname === '/todos-os-veiculos' ? '2px solid black' : 'none'
                        }}
                    >
                        Todos os Veículos
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/registro-por-veiculo"
                        sx={{ 
                            backgroundColor: location.pathname === '/registro-por-veiculo' ? '#f0f0f0' : 'inherit',
                            borderBottom: location.pathname === '/registro-por-veiculo' ? '2px solid black' : 'none'
                        }}
                    >
                        Registro por Veículo
                    </Button>
                </Toolbar>
            </AppBar>
            <Divider sx={{ width: '80%', margin: 'auto' }} />
        </>
    );
}
