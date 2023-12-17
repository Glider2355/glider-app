import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import { Role, roleParams } from "@/types";

export type RoleState = {
    roles: Role[];
};

const initialState: RoleState = {
    roles: [],
};

export const fetchRole = createAsyncThunk(
    "role/fetchRole",
    async () => {
        const response = await apiClient.get<Role[]>("/role");
        return response.data;
    }
);

export const postRole = createAsyncThunk(
    "role/postRole",
    async (params: roleParams) => {
        const response = await apiClient.post("/role/create", params);
        return response.data;
    }
);

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchRole.fulfilled,
            (state, action: PayloadAction<Role[]>) => {
                state.roles = action.payload;
            }
        );
        builder.addCase(
            postRole.fulfilled,
            (state, action: PayloadAction<Role>) => {
                state.roles.push(action.payload);
            }
        );
    }
});

export default roleSlice.reducer;
