import { Role } from "./Role";

export type UserRole = {
    id?: number;
    user_id: number;
    role_id: number;
    certification: number;
    role: Role;
  };
