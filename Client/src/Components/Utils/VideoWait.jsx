import React, { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import LinearProgress from '@mui/material/LinearProgress';
import videoWaitGif from '../../assets/viedo-wait.gif';

const dialogPaperStyle = {
    borderRadius: 25,
    width: '460px'
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'  
};

function VideoWait({ open }) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('Mientras se procesa tu respuesta...');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = oldProgress + 2; // Hace el cambio más lento
                return newProgress > 100 ? 100 : newProgress; // Asegura que no pase del 100%
            });
        }, 200); // Reducimos la frecuencia de actualización para hacer la transición más lenta

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setText('Mientras se procesa tu respuesta...');
        } else {
            setText(' Estamos procesando...');
        }
    }, [progress]);

    useEffect(() => {
        if (!open) {
            // Resetea el estado cuando el popup se cierra
            setProgress(0);
            setText('Finalizando...');
        }
    }, [open]);

    return (
        <Dialog open={open} PaperProps={{ style: dialogPaperStyle }}>
            <DialogContent style={contentStyle}>
                <p style={{ marginTop: 20 }}>Conoce más sobre Hebra,</p>
                <img
                    src={videoWaitGif}
                    alt="Loading..."
                    style={{
                        width: '100%',
                        maxWidth: 250,
                        height: 'auto',
                        border: '1px solid #000'
                    }}
                />
                <LinearProgress variant="determinate" value={progress} />
                <p>{text}</p>
            </DialogContent>
        </Dialog>
    );
}

export default VideoWait;
