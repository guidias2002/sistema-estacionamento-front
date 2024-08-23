import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Divider, TextField, Box } from '@mui/material';
import { useState } from 'react';

export function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [inputPlaca, setInputPlaca] = useState('');

    const handleSearch = () => {
        if (inputPlaca.trim()) {
            navigate(`/buscar?placa=${inputPlaca.trim()}`);
        }
    };

    return (
        <>
            <AppBar className='appBar' position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #ccc', border: "none" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%', margin: 'auto' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
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
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Buscar pela Placa"
                            variant="outlined"
                            size="small"
                            value={inputPlaca}
                            onChange={(e) => setInputPlaca(e.target.value)}
                        />
                        <Button 
                            variant="contained" 
                            onClick={handleSearch}
                        >
                            Buscar
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Divider sx={{ width: '80%', margin: 'auto' }} />
        </>
    );
}
