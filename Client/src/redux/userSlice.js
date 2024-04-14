import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${VITE_API_BASE}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('El correo electrónico ya está registrado');
                } else {
                    throw new Error('Error al registrar el usuario');
                }
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        console.log('Dispatching loginUser action...');

        // Simula un retraso en la respuesta del backend
        await new Promise(resolve => setTimeout(resolve, 800));  // Retrasa la respuesta 

        try {
const response = await fetch(`${VITE_API_BASE}/users/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://hebra-circular.vercel.app'
  },
  body: JSON.stringify(userData)
});
            let data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('userId', data.userId);
                console.log('localStorage after loginUser:', localStorage);
            } else {
                return rejectWithValue(data);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // userInfo: null,
        // token: null,
        authorized: false,
        error: null,
        isLoading: false,
        logUser :{
            email: null,
        },
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.logUser = {
                email: null,
            };         
            state.authorized = false; // Asegúrate de establecer authorized en false al hacer logout
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
          },
setAuthorized: (state, action) => {
    state.authorized = action.payload;
const email = localStorage.getItem('email');
if (email && email !== 'null') {
    state.logUser = { email };
}
},
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // state.token = action.payload.token;
                state.logUser = {
                    email: action.meta.arg.email,
                };
                state.isLoading = false;
                state.error = null;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('email', action.meta.arg.email);
                localStorage.setItem('userId', action.payload.userId);
                state.authorized = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const selectUser = (state) => state.user;
export const { clearError, logout, setAuthorized } = userSlice.actions;

// Verificación del token al cargar la aplicación
export const checkAuthStatus = () => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(setAuthorized(!!token));
};

export default userSlice.reducer;
