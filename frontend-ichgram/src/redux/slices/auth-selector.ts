import type { RootState } from "../store";

export const selectToken = (store: RootState) => store.auth.token;

export const selectError = (store: RootState) => store.auth.error

export const selectUser = (store: RootState) => store.auth.user