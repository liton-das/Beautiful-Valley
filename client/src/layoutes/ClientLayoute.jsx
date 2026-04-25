import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/client-ui/Navbar'

const ClientLayoute = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default ClientLayoute
