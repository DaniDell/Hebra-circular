import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

const UserProfile = () => {
    const [open, setOpen] = useState(true);
    const userEmail = localStorage.getItem('email');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }


    return (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          minHeight: "calc(100vh - 3rem - 4rem)",
          paddingTop: "1vh",
          paddingBottom: "1vh",
        }}
      >
            <Dialog open={open} sx={{ zIndex: 2000, '.MuiPaper-root': { borderRadius: 5 } }}>
                <DialogTitle>Hola, {userEmail} ¿Qué deseas realizar?</DialogTitle>
                <DialogContent>
                    <Link to="/recepcion" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" style={{ margin: '10px' }}>
                            Generar un nuevo registro
                        </Button>
                    </Link>
                    <Link to="/historica" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary" style={{ margin: '10px' }}>
                            Ver registros históricos
                        </Button>
                    </Link>
                   <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" color="secondary" style={{ margin: '10px' }} onClick={handleBack}>
                        Volver
                        </Button>
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="secondary" style={{ margin: '10px' }}>
                         <HomeIcon />
                        </Button>
                        
                    </Link>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserProfile;