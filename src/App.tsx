import React from 'react'
import Header from './nav/header'
import Footer from './nav/footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Token from './verify/Token';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Chatbot from './route/Chatbot';

function App() {

    let persistor = persistStore(store);

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Token />
                    <Header />
                    <Outlet />
                    <Chatbot />
                    <Footer />
                </PersistGate>
            </Provider>
        </>
    )
}

export default App;
