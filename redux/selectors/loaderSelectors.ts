import {RootState} from '../store.ts';

export const selectIsLoading = (state: RootState) => state.loader.isLoading;
