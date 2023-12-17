import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import { University, universityParams } from "@/types";

export type UniversityState = {
  universities: University[];
};

const initialState: UniversityState = {
  universities: [],
};

export const fetchUniversity = createAsyncThunk(
  "university/fetchUniversity",
  async () => {
    const response = await apiClient.get<University[]>("/university");
    return response.data;
  }
);

export const postUniversity = createAsyncThunk(
  "university/postUniversity",
  async (params: universityParams) => {
    const response = await apiClient.post("/university/create", params);
    return response.data;
  }
);

export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUniversity.fulfilled,
      (state, action: PayloadAction<University[]>) => {
        state.universities = action.payload;
      }
    );
    builder.addCase(
      postUniversity.fulfilled,
      (state, action: PayloadAction<University>) => {
        state.universities.push(action.payload);
      }
    );
  },
});

export default universitySlice.reducer;
