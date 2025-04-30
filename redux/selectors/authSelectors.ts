import {RootState} from '../store.ts';

export const selectAuthorized = (state: RootState) =>
    state.authorized.authorized;
export const selectUser = (state: RootState) => state.authorized.user;
export const selectError = (state: RootState) => state.authorized.error;
