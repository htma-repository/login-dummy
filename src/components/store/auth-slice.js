import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  value: "",
  isValid: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    inputEmail(state, action) {
      return {
        value: action.payload,
        isValid: action.payload.includes("@"),
      };
    },
    inputEmailBlur(state, action) {
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    },
    inputPassword(state, action) {
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6,
      };
    },
    inputPasswordBlur(state, action) {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
