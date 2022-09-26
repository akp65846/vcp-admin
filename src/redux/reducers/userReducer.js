import {createSlice} from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        access_token : null
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.access_token = action.payload
        }
    }
})

export const { setAccessToken } = userReducer.actions
export default userReducer.reducer