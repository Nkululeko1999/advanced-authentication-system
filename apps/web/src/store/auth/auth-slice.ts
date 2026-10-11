import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserRole = "admin" | "user" | "guest";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountVerified: boolean;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

type UserProfileUpdate = Partial<
  Pick<User, "firstName" | "lastName" | "avatar">
>;

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    updateUser: (state, action: PayloadAction<UserProfileUpdate>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
