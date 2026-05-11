import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

const initialState = {
  address: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Save user address
export const saveUserAddress = createAsyncThunk('address/save', async (addressData, thunkAPI) => {
  try {
    const response = await api.post('/address', addressData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user address
export const getUserAddress = createAsyncThunk('address/get', async (_, thunkAPI) => {
  try {
    const response = await api.get('/address');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    resetAddressState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(saveUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload;
      })
      .addCase(getUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        // Not setting error here because address might not exist yet which is fine
      });
  },
});

export const { resetAddressState } = addressSlice.actions;
export default addressSlice.reducer;
