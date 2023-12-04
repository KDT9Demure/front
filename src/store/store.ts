import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from "../reducer/counter";
import { signinSlice } from "../reducer/singin";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
import { buySlice } from "../reducer/buy";

const reducers = combineReducers({
    signin: signinSlice.reducer,
    buy:buySlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['signin', 'buy'],
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