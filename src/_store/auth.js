import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { currentUser: null },
  reducers: {
    signedIn: (state, { payload }) => {
      state.currentUser = payload
    },
    signedOut: (state, _) => {
      state.currentUser = null
    }
  }
})

export const { signedIn, signedOut } = authSlice.actions
export default authSlice.reducer
