import React from 'react'
import './css/App.css';
import Header from './route/header'
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
