import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/types";
import apiClient from "./apiClient";
import { userParams } from "@/types/Request/User";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await apiClient.get<User>("/user");
  return response.data;
});

export const putUser = createAsyncThunk(
  "user/putUser",
  async (user: userParams) => {
    const response = await apiClient.put<User>("/user/update", user);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGrade: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.grade = action.payload;
      }
    },
    setLicenseDeadline: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.license_deadline = action.payload;
      }
    },
    setBirthday: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.birthday = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(putUser.fulfilled, (state, action: PayloadAction<userParams>) => {
    });
  },
});

export const { setGrade, setLicenseDeadline, setBirthday } = userSlice.actions;
export default userSlice.reducer;
