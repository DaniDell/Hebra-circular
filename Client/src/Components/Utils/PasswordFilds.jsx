import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({ label, register, error, helperText }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            label={label}
            type={showPassword ? "text" : "password"}
            {...register('password', {
                required: 'La contraseña es requerida',
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/,
                    message: 'La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
                }
            })}
            error={Boolean(error)}
            helperText={helperText}
            sx={{ marginBottom: '20px' }}
            autoComplete="new-password"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordField;