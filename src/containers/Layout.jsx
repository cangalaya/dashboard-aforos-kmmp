import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
//import '../vendors/datatables.net-bs4/dataTables.bootstrap4.css'
import '../css/select.dataTables.min.css'
import '../css/canvas-css/canvas.css'
import '../css/custom/style-custom.css'



const Layout = ({ children }) => {
  return (
    <div className='Layout'>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <NavBar />
        <div className="main-panel main-panel-custom">
          <div className="content-wrapper">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout;