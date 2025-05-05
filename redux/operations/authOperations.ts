import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FirebaseError} from 'firebase/app';

import {
    registerAPI,
    loginAPI,
    logoutAPI,
    getUserProfileAPI,
} from '../../services/firebaseAPI';
import {LoginData, RegisterData,User} from '../../types/User.ts';
import {getReadableErrorMessage} from '../../utils/getReadableFirebaseError.ts';
import {RootState} from '../store.ts';

export const register = createAsyncThunk(
    'auth/register',
    async ({displayName, email, password}: RegisterData, {rejectWithValue}) => {
        try {
            const userData: FirebaseAuthTypes.User | null = await registerAPI({displayName, email, password}) || null;

            if (!userData) {
                return rejectWithValue('Registration failed');
            }

            return {
                uid: userData.uid,
                name: displayName,
                email: userData.email,
            };
        } catch (error) {
          return rejectWithValue(getReadableErrorMessage((error as FirebaseError).code) || 'An unexpected error occurred during registration');
        }
    },
);

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: LoginData, {rejectWithValue}) => {
        try {
            const userData: FirebaseAuthTypes.User | null = await loginAPI({
                email,
                password,
            });

            if (!userData) {
                return rejectWithValue('Registration failed');
            }

            return {
                uid: userData.uid,
                name: userData.displayName,
                email: userData.email,
            };
        } catch (error) {
          return rejectWithValue(getReadableErrorMessage((error as FirebaseError).code) || 'An unexpected error occurred during login');
        }
    },
);

export const getCurrentUserInfo = createAsyncThunk<
    User,
    void,
    {
        state: RootState;
    }
>('auth/getCurrentUserInfo', async (_, {rejectWithValue}) => {
    try {
        const userData: FirebaseAuthTypes.User | null = await getUserProfileAPI();

        if (!userData) {
            return {
                uid: null,
                name: null,
                email: null,
            };
        }

        return {
            uid: userData.uid,
            name: userData.displayName,
            email: userData.email,
        };
    } catch (error) {
      return rejectWithValue(getReadableErrorMessage((error as FirebaseError).code) || 'An unexpected error occurred during fetch');
    }
});

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await logoutAPI();
        } catch (error) {
          return rejectWithValue(getReadableErrorMessage((error as FirebaseError).code) || 'An unexpected error occurred during logout');
        }
    },
);
