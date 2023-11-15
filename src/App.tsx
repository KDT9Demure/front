import React from 'react'
import Header from './nav/header'
import { Outlet } from 'react-router-dom';
import Footer from './nav/footer';



function App() {


  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App;
