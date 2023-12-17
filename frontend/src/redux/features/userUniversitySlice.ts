import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import { University, UserUniversity, userUniversityParams } from "@/types";

interface UserUniversityState {
  userUniversity: UserUniversity;
};

const initialState: UserUniversityState = {
  userUniversity: {
    id: 0,
    user_id: 0,
    university_id: 0,
  university: {
      id: 0,
      name: "",
    },
  },
};

export const fetchUserUniversity = createAsyncThunk(
  "userUniversity/fetchUserUniversity",
  async () => {
    const response = await apiClient.get<UserUniversity>("/user/university");
    
    if (Object.keys(response.data).length === 0) {
      return initialState.userUniversity;
    }
    return response.data;
  }
);

export const postUserUniversity = createAsyncThunk(
  "userUniversity/postUserUniversity",
  async (params: userUniversityParams) => {
    const response = await apiClient.post("/user/university/create", params);
    return response.data;
  }
);

export const userUniversitySlice = createSlice({
  name: "userUniversity",
  initialState,
  reducers: {
    setUserUniversityId: (state, action: PayloadAction<number>) => {
      if (state.userUniversity) {
        state.userUniversity.university_id = action.payload;
        state.userUniversity.university.id = action.payload;
      }
    },
    setUserUniversity: (state, action: PayloadAction<string>) => {
      if (state.userUniversity) {
        state.userUniversity.university.name = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserUniversity.fulfilled, (state, action: PayloadAction<UserUniversity>) => {
      state.userUniversity = action.payload;
    });
    builder.addCase(
      postUserUniversity.fulfilled,
      (state, action: PayloadAction<UserUniversity>) => {
        state.userUniversity = action.payload;
      }
    );
  },
});

export const { setUserUniversityId, setUserUniversity } = userUniversitySlice.actions;
export default userUniversitySlice.reducer;
