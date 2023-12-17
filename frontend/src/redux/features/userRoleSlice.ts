import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import { UserRole, userRoleParams} from "@/types";

export type UserRolesState = {
  userRoles: UserRole[];
  loading: boolean;
};

export const initialUserState: UserRolesState = {
  userRoles: [
    {
      id: 0,
      user_id: 0,
      role_id: 0,
      certification: 1,
      role: {
        id: 0,
        name: "",
      },
    },
  ],
  loading: false,
};

export const fetchUserRole = createAsyncThunk(
  "role/fetchUserRole",
  async () => {
    const response = await apiClient.get<UserRole[]>("/user/role");
    return response.data;
  }
);

export const postUserRole = createAsyncThunk(
  "role/postUserRole",
  async (params: userRoleParams) => {
    const response = await apiClient.post("/user/role/create", params);
    return response.data;
  }
);

export const deleteUserRole = createAsyncThunk(
  "role/deleteUserRole",
  async (id: number) => {
    const response = await apiClient.delete(`/user/role/delete/${id}`);
    return response.data;
  }
);

export const userRoleSlice = createSlice({
  name: "userRole",
  initialState: initialUserState,
  reducers: {
    editUserRoleByIndex: (state, action: PayloadAction<{ index: number, userRole: UserRole }>) => {
      const { index, userRole } = action.payload;
      if (index >= 0 && index < state.userRoles.length) {
        state.userRoles[index] = userRole;
      }
    },
    addUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRoles.push(action.payload);
    },
    deleteUserRoleByIndex: (state, action: PayloadAction<number>) => {
      state.userRoles.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserRole.fulfilled,
      (state, action: PayloadAction<UserRole[]>) => {
        state.userRoles = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(postUserRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      postUserRole.fulfilled,
      (state, action: PayloadAction<UserRole[]>) => {
        state.userRoles = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(deleteUserRole.fulfilled, (state, action: PayloadAction<number>) => {
      state.userRoles = state.userRoles.filter((userRole) => userRole.id !== action.payload);
    });
  },
});

export const { editUserRoleByIndex, addUserRole, deleteUserRoleByIndex } = userRoleSlice.actions;
export default userRoleSlice.reducer;
