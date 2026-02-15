import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentAPI } from '../services/api';

const initialState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchStudents = createAsyncThunk('students/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const response = await studentAPI.getAll(params);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
  }
});

export const fetchStudentById = createAsyncThunk('students/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await studentAPI.getById(id);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch student');
  }
});

export const createStudent = createAsyncThunk('students/create', async (data, { rejectWithValue }) => {
  try {
    const response = await studentAPI.create(data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create student');
  }
});

export const updateStudent = createAsyncThunk('students/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await studentAPI.update(id, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update student');
  }
});

export const fetchStudentsByClass = createAsyncThunk('students/fetchByClass', async (classId, { rejectWithValue }) => {
  try {
    const response = await studentAPI.getByClass(classId);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
  }
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.data || action.payload;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.unshift(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      });
  },
});

export const { clearError, clearCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;
