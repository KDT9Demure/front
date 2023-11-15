import React from 'react'
import './css/App.css';
import Layout from './route/layout'
import { Outlet } from 'react-router-dom';



function App() {


  return (
    <>
      <Layout/>
      <Outlet/>
    </>
  )
}

export default App;
