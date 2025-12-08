import React from 'react'
import { Outlet } from "react-router" 
import Navbar from '/src/components/Navbar/Navbar.jsx'

function Layout() {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

export default Layout
