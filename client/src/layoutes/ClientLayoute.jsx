import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/client-ui/Navbar'
import Footer from '../components/client-ui/Footer'

const ClientLayoute = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* Footer */}
      <Footer/>
    </>
  )
}

export default ClientLayoute
