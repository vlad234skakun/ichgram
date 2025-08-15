import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import type { PersistPartial } from "redux-persist/es/persistReducer";
import authReducer from "./slices/auth-slice";
import type { IAuthState } from "./slices/auth-slice";

// Настройка persist
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

// Создание редюсера с persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Тип состояния с учетом persist
type PersistedAuthState = IAuthState & PersistPartial;

// Создание стора
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Типы стора и диспатча
export type RootState = {
  auth: PersistedAuthState;
};
export type AppDispatch = typeof store.dispatch;


// Экспорт персистора
export const persistor = persistStore(store);
