import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { classAPI } from '../services/api';

const initialState = {
  classes: [],
  currentClass: null,
  loading: false,
  error: null,
};

export const fetchClasses = createAsyncThunk('classes/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const response = await classAPI.getAll(params);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch classes');
  }
});

export const fetchClassById = createAsyncThunk('classes/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await classAPI.getById(id);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch class');
  }
});

export const createClass = createAsyncThunk('classes/create', async (data, { rejectWithValue }) => {
  try {
    const response = await classAPI.create(data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create class');
  }
});

export const updateClass = createAsyncThunk('classes/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await classAPI.update(id, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update class');
  }
});

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentClass: (state) => {
      state.currentClass = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.unshift(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      });
  },
});

export const { clearError, clearCurrentClass } = classSlice.actions;
export default classSlice.reducer;
