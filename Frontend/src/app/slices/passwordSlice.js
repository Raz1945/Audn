import { createSlice } from '@reduxjs/toolkit';

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    value: '',
  },
  reducers: {
    updatePassword: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePassword } = passwordSlice.actions;
export default passwordSlice.reducer;
