import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    value: '',
  },
  reducers: {
    updateEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateEmail } = emailSlice.actions;

export default emailSlice.reducer;
