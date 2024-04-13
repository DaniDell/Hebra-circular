import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createMeasure } from '../redux/measuresSlice';
import { calculateImpact } from '../Funtions/calculateImpact';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

const ReceptionMeasure = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const dispatch = useDispatch();
    const [totalImpact, setTotalImpact] = useState(null); // Cambiado de 0 a null
    const [open, setOpen] = useState(false);
    const isLoading = useSelector(state => state.measures.isLoading);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (successMessage) {
            setDialogOpen(true);
        } else {
            setDialogOpen(false);
        }
    }, [successMessage]);

    useEffect(() => {
        // Verificar si totalImpact no es nulo para abrir el diálogo
        if (totalImpact !== null) {
            setOpen(true);
        }
    }, [totalImpact]);

const handleInputChange = () => {
    setTotalImpact(null); // Restablecer totalImpact cuando el usuario cambie un valor en los inputs
};

const handleCloseDialog = () => {
    setOpen(false);
    setTotalImpact(null); 
    setSuccessMessage('')
};

   const handleCalculate = () => {
    setErrorMessage('');

    const managedCottonBaseKg = parseFloat(watch('managedCottonBaseKg') || 0);
    const managedPolyesterBaseKg = parseFloat(watch('managedPolyesterBaseKg') || 0);
    const managedMixBaseKg = parseFloat(watch('managedMixBaseKg') || 0);

    // Verifica si todos los valores de los inputs están en 0
    if (managedCottonBaseKg === 0 && managedPolyesterBaseKg === 0 && managedMixBaseKg === 0) {
        setErrorMessage('Al menos uno de los valores debe ser positivo');
        return;
    }

    let totalWaterImpact = 0;
    let totalCarbonImpact = 0;

    ['managedCottonBaseKg', 'managedPolyesterBaseKg', 'managedMixBaseKg'].forEach(inputName => {
        const kilograms = parseFloat(watch(inputName) || 0);
        const composition = inputName === 'managedCottonBaseKg' ? 'algodon Reciclado' :
                            inputName === 'managedPolyesterBaseKg' ? 'poliester Reciclado' :
                            inputName === 'managedMixBaseKg' ? 'Mezcla sin definición Reciclado' : '';
        const impact = calculateImpact(kilograms, composition);
        console.log(`Kilograms: ${kilograms}, Composition: ${composition}, Impact:`, impact);
        totalWaterImpact += impact.waterImpactLandfill - impact.waterImpact2dnChance;
        totalCarbonImpact += impact.carbonImpactLandfill - impact.carbonImpact2dnChance;
    });


    console.log('Total Water Impact:', totalWaterImpact);
    console.log('Total Carbon Impact:', totalCarbonImpact);

    setTotalImpact({ totalWaterImpact, totalCarbonImpact });
    console.log('Total Impact:', totalImpact); // Agregar este console.log

  
};


    const onSubmit = async (data) => {
        console.log('Submitting form...');
       
        try {
            if (!totalImpact) {
                setErrorMessage('Primero debes calcular el impacto total');
                return;
            }

            // Lógica para enviar los datos al backend
            const filledData = {
                ...data,
                managedCottonBaseKg: data.managedCottonBaseKg || 0,
                managedPolyesterBaseKg: data.managedPolyesterBaseKg || 0,
                managedMixBaseKg: data.managedMixBaseKg || 0
            };
            const userId = localStorage.getItem('userId');
            const deliveryDate = data.deliveryDate;
            const measureData = {
                ...filledData,
                userId: userId,
                deliveryDate: deliveryDate,
                carbonFootprintResult: totalImpact.totalCarbonImpact.toFixed(2),
                waterFootprintResult: totalImpact.totalWaterImpact.toFixed(2)
            };
            console.log('Dispatching measure data:', measureData);
            await dispatch(createMeasure(measureData));
            
setSuccessMessage('Su registro se cargó con exito en la base de datos.');
            reset({
                deliveryDate: new Date().toISOString().substr(0, 10),
                managedCottonBaseKg: 0,
                managedPolyesterBaseKg: 0,
                managedMixBaseKg: 0
            });
        } catch (error) {
            setErrorMessage('Error al enviar el registro. Inténtelo de nuevo más tarde.');
        }
    };

    const waterImpactShow = totalImpact?.totalWaterImpact?.toLocaleString('de-DE') ?? '';
    const carbonImpactShow = totalImpact?.totalCarbonImpact?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '';
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '300px' }} onChange={handleInputChange}> {/* Agrega onChange para detectar cambios en los inputs */}

                
                <Typography variant="h6" style={{ marginBottom: '20px' }}>Registrar una entrega:</Typography>
                <Typography variant="body1" gutterBottom align="left">Fecha de entrega</Typography>

<TextField
    {...register('deliveryDate', { required: true })}
    label=""
    type="date"
    defaultValue={moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD')}
    fullWidth
    error={!!errors.deliveryDate}
    helperText={errors.deliveryDate ? 'La fecha de entrega es requerida' : ''}
    style={{ marginBottom: '20px' }}
    InputProps={{
        inputProps: {
            max: moment().format('YYYY-MM-DD'), // No permite un año mayor al actual
        },
    }}
/>
   <Typography variant="body1" gutterBottom align="left" style={{ paddingBottom: '8px' }}>
    Kilos entregados según su composición
</Typography>
                <TextField
                    {...register('managedCottonBaseKg', { required: true, pattern: /^[0-9]*$/ })}
                    label="Base Algodón (kg)"
                    type="number"
                    fullWidth
                    error={!!errors.managedCottonBaseKg}
                    helperText={errors.managedCottonBaseKg ? 'Ingrese un valor numérico' : ''}
                    style={{ marginBottom: '20px' }}
                    InputProps={{ inputProps: { min: 0 } }}
                    defaultValue={0}
                />
                <TextField
                    {...register('managedPolyesterBaseKg', { required: true, pattern: /^[0-9]*$/ })}
                    label="Base Polyester (kg)"
                    type="number"
                    fullWidth
                    error={!!errors.managedPolyesterBaseKg}
                    helperText={errors.managedPolyesterBaseKg ? 'Ingrese un valor numérico' : ''}
                    style={{ marginBottom: '20px' }}
                    InputProps={{ inputProps: { min: 0 } }}
                    defaultValue={0}
                />

                <TextField
                    {...register('managedMixBaseKg', { required: true, pattern: /^[0-9]*$/ })}
                    label="Composición Mixta / Mescla de fibras (kg)"
                    type="number"
                    fullWidth
                    error={!!errors.managedMixBaseKg}
                    helperText={errors.managedMixBaseKg ? 'Ingrese un valor numérico' : ''}
                    style={{ marginBottom: '20px' }}
                    InputProps={{ inputProps: { min: 0 } }}
                    defaultValue={0}
                />
               
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {totalImpact === null ? (
        <Button 
            type="button" 
            variant="contained" 
            color="primary" 
            style={{ margin: '5px' }}
            onClick={handleCalculate}
        >
            Calcular Mitigación
        </Button>
    ) : (
        <Button 
            type="submit" 
            variant="contained" 
            color="secondary" 
            style={{ margin: '5px' }}
        >
            Entrega registrada
        </Button>
    )}
    {/* Indicador de carga */}
    {isLoading && <CircularProgress />}
</div>
                {/* Mensajes de éxito y error */}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </form>
            
            <Dialog open={open} PaperProps={{ style: { borderRadius: 25 } }}>
    <DialogTitle>La mitigación realizada fue:</DialogTitle>
    <DialogContent>
        <Typography variant="body1">
            Agua mitigada: {waterImpactShow} litros
        </Typography>
        <Typography variant="body1">
            CO2e mitigados: {carbonImpactShow} Kg
        </Typography>
    </DialogContent>
<DialogActions style={{ justifyContent: 'space-between' }}>
{dialogOpen ? (
        <>
            <Button variant="outline" onClick={handleCloseDialog} color="primary" style={{ margin: '6px' }}>Registrar otra entrega</Button>
            <Button 
                variant="contained" 
                onClick={() => {
                    setTotalImpact(null); 
                    setSuccessMessage('')
                }} 
                color="primary" 
                style={{ margin: '6px' }}
                component={Link} 
                to="/historica"
            >
                Ver Registro Histórico
            </Button>
        </>
    ) : (
<div >
    
<CircularProgress /><CircularProgress /><CircularProgress /><CircularProgress /> <CircularProgress /><CircularProgress /><CircularProgress />
   
</div>
    )}
</DialogActions>
</Dialog>

        </div>
    );
};

export default ReceptionMeasure;
