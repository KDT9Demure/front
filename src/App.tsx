import React from 'react'
import Header from './nav/header'
import Footer from './nav/footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header/>
        <Outlet/>
        <Footer/>
      </Provider>
    </>
  )
}

export default App;
