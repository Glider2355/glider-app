import {
  CampParticipation,
  CampParticipationError,
  CampParticipationPrams,
} from "@/types";
import apiClient from "./apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CampParticipationState = {
  campParticipations: CampParticipation[];
  errors: CampParticipationError | null;
};

const initialState: CampParticipationState = {
  campParticipations: [],
  errors: null,
};

export const fetchCampParticipation = createAsyncThunk(
  "campParticipation/fetchCampParticipation",
  async (id: number) => {
    const response = await apiClient.get<CampParticipation[]>(
      `camp/join/${id}`
    );
    return response.data;
  }
);

export const postCampParticipation = createAsyncThunk(
  "campParticipation/postCampParticipation",
  async (params: CampParticipationPrams, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`camp/join`, params);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        // エラーレスポンスがある場合は、エラーレスポンスをrejectWithValueで返す
        return rejectWithValue(error.response.data) as CampParticipationError;
      } else {
        // エラーレスポンスがない場合は、エラーメッセージを返す
        return rejectWithValue({ genericError: 'An error occurred' }) as CampParticipationError;
      }
    }
  }
);

export const deleteCampParticipation = createAsyncThunk(
  "campParticipation/deleteCampParticipation",
  async (id: number) => {
    const response = await apiClient.delete(`camp/join/${id}`);
    return response.data;
  }
);

export const campParticipationSlice = createSlice({
  name: "campParticipation",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCampParticipation.fulfilled, (state, action) => {
      state.campParticipations = action.payload;
    });
    builder.addCase(postCampParticipation.fulfilled, (state, action) => {});
    builder.addCase(postCampParticipation.rejected, (state, action) => {
      state.errors = action.payload as CampParticipationError;
    });
    builder.addCase(deleteCampParticipation.fulfilled, (state, action) => {});
  },
});

export const { clearErrors } = campParticipationSlice.actions;
export default campParticipationSlice.reducer;
