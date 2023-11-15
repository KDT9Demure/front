import React from 'react'
import './css/App.css';
import Header from './nav/header'
import { Outlet } from 'react-router-dom';



function App() {


  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App;
