import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthState} from '../../types/User.ts';
import {
    getCurrentUserInfo,
    login,
    logout,
    register,
} from '../operations/authOperations';

const initialState: AuthState = {
    user: {uid: null, name: null, email: null},
    authorized: false,
    error: null,
};

const authSlice = createSlice({
    name: 'authorized',
    initialState,
    reducers: {
        refreshError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.authorized = true;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.authorized = true;
            })
            .addCase(logout.fulfilled, state => {
                state.user = {uid: null, name: null, email: null};
                state.authorized = false;
            })
            .addCase(getCurrentUserInfo.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.authorized = true;
            })
            .addMatcher(
                action => action.type.endsWith('/fulfilled'),
                state => {
                    state.error = null;
                },
            )
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<string>) => {
                    state.error = action.payload;
                },
            );
    },
});
// export const {refreshError} = authSlice.actions;

export default authSlice.reducer;
