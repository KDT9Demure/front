import React from 'react'
import Header from './nav/header'
import Footer from './nav/footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Token from './verify/Token';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header/>
        <Outlet/>
        <Footer/>
        <Token />
      </Provider>
    </>
  )
}

export default App;
