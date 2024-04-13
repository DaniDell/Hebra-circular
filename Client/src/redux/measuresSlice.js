import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './userSlice'; 


export const createMeasure = createAsyncThunk(
    'measures/create',
    async (measureData, { rejectWithValue, dispatch }) => { // Agrega el parámetro dispatch
        try {
const response = await fetch(`${process.env.VITE_BACKEND_URL}/measures/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(measureData)
            });
            if (!response.ok) {
                if (response.status === 403) { // Verifica si el error es 400 (Forbidden)
                    dispatch(logout()); // Desloguea al usuario si el token ha expirado
                    throw new Error('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.'); // Mensaje de error para mostrar al usuario
                } else {
                    throw new Error('Error al crear la medida');
                }
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);





export const getMeasuresByUserId = createAsyncThunk(
    'measures/getByUserId',
    async (_, { rejectWithValue }) => {
        try {
    
            const userId = localStorage.getItem('userId');


    const response = await fetch(`${process.env.VITE_BACKEND_URL}/measures/getby?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                console.error(`Error: ${response.status}`);
                return rejectWithValue(response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);


const measuresSlice = createSlice({
    name: 'measures',
    initialState: {
        measuresList: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.measuresList = []; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMeasure.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createMeasure.fulfilled, (state, action) => {
                state.measuresList.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createMeasure.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload.message ? action.payload.message : action.payload;
                } else {
                    state.error = action.error.message;
                }
                state.isLoading = false;
            })
            .addCase(getMeasuresByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMeasuresByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.measuresList = action.payload; // Asigna los datos de las medidas obtenidos en el caso de éxito
                state.error = null; // Limpia cualquier error anterior
            })
            .addCase(getMeasuresByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload : 'Network error'; // Asigna el error obtenido en el caso de error
            });
        
    },
});

export const { logout: logoutMeasures } = measuresSlice.actions;
export const selectMeasures = (state) => state.measures;


export default measuresSlice.reducer;
