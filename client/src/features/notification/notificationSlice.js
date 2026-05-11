import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

const initialState = {
  notifications: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get notifications
export const getNotifications = createAsyncThunk('notification/get', async (_, thunkAPI) => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Mark as read
export const markAsRead = createAsyncThunk('notification/markRead', async (id, thunkAPI) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Mark all as read
export const markAllAsRead = createAsyncThunk('notification/markAllRead', async (_, thunkAPI) => {
  try {
    const response = await api.put('/notifications/readall');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((n) =>
          n._id === action.payload._id ? action.payload : n
        );
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({ ...n, isRead: true }));
      });
  },
});

export const { resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
