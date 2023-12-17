import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from "./apiClient";
import { Camp, campParams } from '@/types';

type CampState = {
  camps: Camp[];
  selectedCamp: Camp;
};

const initialState: CampState = {
  camps: [],
  selectedCamp: {
    id: 0,
    name: '',
    location: '',
    start_date: '',
    end_date: '',
  }
};

export const fetchCamp = createAsyncThunk('camp/fetchCamp', async () => {
  const response = await apiClient.get<Camp[]>('/camp');
  return response.data;
});

export const fetchCampById = createAsyncThunk('camp/fetchCampById', async (id: number) => {
  const response = await apiClient.get<Camp>(`/camp/${id}`);
  return response.data;
});


export const postCamp = createAsyncThunk('camp/postCamp', async (params: campParams) => {
  const response = await apiClient.post('/camp/create', params);
  return response.data;
});

export const putCamp = createAsyncThunk('camp/putCamp', async (params: Camp) => {
  const response = await apiClient.put(`/camp/update/${params.id}`, params);
  return response.data;
});

export const deleteCamp = createAsyncThunk('camp/deleteCamp', async (id: number) => {
  await apiClient.delete(`/camp/delete/${id}`);
  return id;
});

function formatDate(input: string): string {
  // ISO形式の日付から年月日だけを抜き出す
  const date = new Date(input);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const campSlice = createSlice({
  name: 'camp',
  initialState,
  reducers: {
    setCamp: (state, action: PayloadAction<Camp>) => {
      state.selectedCamp = action.payload;
    },
    setCampName: (state, action: PayloadAction<string>) => {
      if (state.selectedCamp) {
        state.selectedCamp.name = action.payload;
      }
    },
    setCampLocation: (state, action: PayloadAction<string>) => {
      if (state.selectedCamp) {
        state.selectedCamp.location = action.payload;
      }
    },
    setCampStartDate: (state, action: PayloadAction<string>) => {
      if (state.selectedCamp && action.payload) {
        state.selectedCamp.start_date = formatDate(action.payload);
      }
    },
    setCampEndDate: (state, action: PayloadAction<string>) => {
      if (state.selectedCamp && action.payload) {
        state.selectedCamp.end_date = formatDate(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCamp.fulfilled, (state, action: PayloadAction<Camp[]>) => {
      state.camps = action.payload;
    });
    builder.addCase(fetchCampById.fulfilled, (state, action: PayloadAction<Camp>) => {
      state.selectedCamp = action.payload;
    });
    builder.addCase(postCamp.fulfilled, (state, action: PayloadAction<Camp>) => {
      state.camps.push(action.payload);
    });
    builder.addCase(putCamp.fulfilled, (state, action: PayloadAction<Camp>) => {
      const index = state.camps.findIndex((camp) => camp.id === action.payload.id);
      if (index !== -1) {
        state.camps[index] = action.payload;
      }
    });
    builder.addCase(deleteCamp.fulfilled, (state, action: PayloadAction<number>) => {
      state.camps = state.camps.filter((camp) => camp.id !== action.payload);
    });
  },
});

export const { setCamp, setCampName, setCampLocation, setCampStartDate, setCampEndDate } = campSlice.actions;
export default campSlice.reducer;
