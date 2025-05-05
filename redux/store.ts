import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore,combineReducers} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import authReducer from './slices/authSlice';
import expensesSliceReducer from './slices/expensesSlice';
import loaderSliceReducer from './slices/loaderSlice';

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
    authorized: persistedAuthReducer,
    loader: loaderSliceReducer,
    expenses: expensesSliceReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default {store, persistor};
