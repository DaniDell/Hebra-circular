import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Container, Autocomplete, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlertDialog from '../Components/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectUser, clearError } from '../redux/userSlice'; 
import VideoWait from '../Components/Utils/VideoWait';

const Register = () => {
  const { handleSubmit, control, register, formState: { errors }, reset,  watch } = useForm({
        defaultValues: {
          category: []  // Establece un valor por defecto para evitar problemas con Autocomplete
        },
      });

      
    const [isAlertOpen, setIsAlertOpen] = useState(false); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showPassword1, setShowPassword1] = useState(false); 
    const [isEmailAlertOpen, setEmailAlertOpen] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const navigate = useNavigate();
    const handleLogin = () => {
      navigate('/iniciar-sesion');
  };

const dispatch = useDispatch();
  const userStatus = useSelector(state => state.user.status);
  const userError = useSelector(state => state.user.error);
  const isLoading = useSelector(state => state.user.isLoading);
  const { userInfo, error } = useSelector(selectUser);

  const onSubmit = async data => {
    console.log(`Nombre: ${data.name}`);
    console.log(`Correo: ${data.email}`);
    console.log(`Contraseña: ${data.password}`);
    console.log(`Categorías: ${data.category.map(cat => cat.symbol).join(', ')}`);
    const resultAction = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(resultAction)) {
        setIsAlertOpen(true);  // Abre la alerta de éxito
        reset();  // Limpia los campos del formulario
    }
};
    
useEffect(() => {
  if (userStatus === 'succeeded') {
      setIsAlertOpen(true);
      reset();
  }
}, [userStatus, reset]);

  useEffect(() => {
    if (error === 'El correo electrónico ya está registrado') {
      setEmailAlertOpen(true);
      reset();
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) {
        const timer = setTimeout(() => {
            setVideoLoaded(true);
        }, 2000);  // Espera 2 segundos antes de mostrar el video
        return () => clearTimeout(timer);
    }
}, [isLoading]);

  useEffect(() => {
    // Esta función se ejecutará cuando el componente se desmonte
    return () => {
        dispatch(clearError());
    };
}, [dispatch]);

    const categories = [
      { symbol: "Gestión de descartes textiles con trazabilidad", text: "Gestión de descartes textiles con trazabilidad" },
      { symbol: "Responsabilidad Social Empresarial (RSE)", text: "Responsabilidad Social Empresarial (RSE)" },
      { symbol: "Colaboraciones comerciales", text: "Colaboraciones comerciales" },
      { symbol: "Desarrollo de Productos Ecoamigables", text: "Desarrollo de Productos Ecoamigables" },
      { symbol: "Estrategias de Comunicación y Marketing Sustentable", text: "Estrategias de Comunicación y Marketing Sustentable" },
      { symbol: "Innovación en Procesos y Tecnologías Sostenibles", text: "Innovación en Procesos y Tecnologías Sostenibles" },
      { symbol: "Educación y Capacitación en Sustentabilidad", text: "Educación y Capacitación en Sustentabilidad" },
      
    ];

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
      };

      const handleConfirm = () => {
        // Redirige al usuario a /iniciar-sesion cuando hagan clic en confirmar
        navigate("/iniciar-sesion");
      };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '60px', paddingBottom: '60px', minHeight: "100vh" }}>
              <h3 style={{ textAlign: "center" }}>Completá tus datos para suscribirte a novedades</h3> 
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre de la empresa *"
                            {...register('name', { required: 'Este campo es requerido' })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Correo *"
                        {...register('email', { required: 'El correo es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Por favor, introduce un correo válido' } })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        sx={{ marginBottom: '20px', color: errors.email ? 'red' : 'inherit' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirmar Correo *"
                        {...register('confirmEmail', { validate: value => value === watch('email') || 'Los correos no coinciden' })}
                        error={Boolean(errors.confirmEmail)}
                        helperText={errors.confirmEmail?.message}
                        sx={{ marginBottom: '20px', color: errors.email ? 'red' : 'inherit' }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contraseña *"
                        type={showPassword ? "text" : "password"}
                        {...register('password', {
                          required: 'La contraseña es requerida',
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/,
                            message: 'La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número'
                          }
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        sx={{ marginBottom: '20px' }}
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <Visibility /> :  <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirmar Contraseña *"
                        type={showPassword1 ? "text" : "password"}
                        {...register('confirmPassword', { validate: value => value === watch('password') || 'Las contraseñas no coinciden' })}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword?.message}
                        sx={{ marginBottom: '20px' }}
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword1(!showPassword1)}
                              >
                                {showPassword1 ?  <Visibility /> :  <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                     <Controller
              name="category"
              control={control}
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  multiple
                  id="categories"
                  options={categories}
                  getOptionLabel={(option) => option.symbol}
                  value={value}
                  onChange={(e, newValue) => {
                    onChange(newValue);
                  }}
                  isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Temáticas en las que se encuentra interesado *"
                      placeholder="Elegí todas las que necesites"
                      sx={{ marginBottom: '20px' }}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
                    </Grid>
                    <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                      {isLoading ? <CircularProgress size={24} /> : 'Registrarse'}
                    </Button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
</Grid>
                </Grid>
                 <VideoWait open={isLoading}/>
                <AlertDialog
                  open={isEmailAlertOpen}
                  handleClose={() => setEmailAlertOpen(false)}
                  title="Error en el registro"
                  content="El email proporcionado ya estaba registrado en nuestra base de datos."
                  confirmText="Iniciar sesión"
                  cancelText="Registrame con otro email"
                  onCancel={() => setEmailAlertOpen(false)}
                  onConfirm={handleLogin}
                />

                <AlertDialog
  open={isAlertOpen}
  handleClose={handleCloseAlert}
  title="Felicitaciones!"
  content="Su usuario fué registrado con éxito!"
  confirmText="Iniciar sesión"
  cancelText={null}
  onCancel={handleCloseAlert}
  onConfirm={handleConfirm}
/>
            </form>
        </Container>
    );
};

export default Register;