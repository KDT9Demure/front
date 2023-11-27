import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/counter";
import signinReducer from "../reducer/singin";

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    signin:signinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;