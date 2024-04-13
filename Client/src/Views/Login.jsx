import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VideoWait from './../Components/Utils/VideoWait.jsx';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();  

    // Selector para obtener el estado de carga y error desde Redux
    const isLoading = useSelector(state => state.user.isLoading);
    const error = useSelector(state => state.user.error);

    // Estado local para mostrar la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form para la validación de campos
    const { handleSubmit, register, formState: { errors } } = useForm();

    // Función para manejar el envío del formulario
    const onSubmit = (data) => {
        dispatch(loginUser(data))
            .then((action) => {
                if (action.type.endsWith('fulfilled')) {
                    navigate('/home');  
                }
            });
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: "calc(100vh - 145px)",  
            maxWidth: '500px', 
            padding: "3rem", 
            margin: 'auto' 
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box marginBottom={2}> 
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register('email', { required: 'El correo es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Por favor, introduce un correo válido' } })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                </Box>
                <Box marginBottom={2}>
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        {...register('password', { required: 'La contraseña es requerida' })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Visibility /> :  <VisibilityOff />}
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                {error && (
                    <Alert severity="error">{error.message}</Alert>
                )}
                {isLoading ? (
                    <Button type="submit" variant="contained" color="primary" disabled><CircularProgress /></Button>
                ) : (
                    <Button type="submit" variant="contained" color="primary">Iniciar sesión</Button>
                )}
                <p>Si no tiene cuenta aun <Link to="/registro">Registrese</Link> </p>
<p>En el caso de no recordar su contraseña envíe un mail a <a href="mailto:hola@tramabtextil.com.ar">hola@tramabtextil.com.ar</a></p>
            </form>
            <VideoWait open={isLoading}/> 
        



        </div>
    );
};

export default Login;
