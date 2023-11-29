import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from "../reducer/counter";
import signinReducer, { signinSlice } from "../reducer/singin";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
    signin: signinSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['signin'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
    // reducer: {
    //   counter:counterReducer,
    //   signin:signinReducer,
    // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;