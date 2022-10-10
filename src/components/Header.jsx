import React from 'react'
import { useAuth } from '../context/authContext'
import '../css/custom/style-custom.css'

import logo from '../images/logo-kmmp.svg'

const Header = () => {
    const {clickToggle} = useAuth();
    
    const handleClickToggle = () => {
        clickToggle();
    }
    
    return (
        <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                <div className="me-3 button-hidden">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
                        <span className="icon-menu" />
                    </button>
                </div>
                <div>
                    <a className="navbar-brand brand-logo" href="/">
                        <img src={logo} alt="logo" />
                    </a>
                    <a className="navbar-brand brand-logo-mini" href="/">
                        <img src={logo} alt="logo" className='custom-logo-mini' />
                    </a>
                </div>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-top">
                <ul className="navbar-nav">
                    <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                        <h1 className="welcome-text">Buen día, <span className="text-black fw-bold">Administrador Callao</span></h1>
                        <h3 className="welcome-sub-text">El reporte mensual del control de aforo es: </h3>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item d-none d-lg-block">
                        <div id="datepicker-popup" className="input-group date datepicker navbar-date-picker">
                            <span className="input-group-addon input-group-prepend border-right">
                                <span className="icon-calendar input-group-text calendar-icon" />
                            </span>
                            <input type="text" className="form-control" />
                        </div>
                    </li>
                    <li className="nav-item">
                        <form className="search-form" action="#">
                            <i className="icon-search" />
                            <input type="search" className="form-control" placeholder="Search Here" title="Search here" />
                        </form>
                    </li>
                    <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                        <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image" /> </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                            <div className="dropdown-header text-center">
                                <img className="img-md rounded-circle" src="images/faces/face8.jpg" alt="Profile image" />
                                <p className="mb-1 mt-3 font-weight-semibold">Admistrador</p>
                                <p className="fw-light text-muted mb-0">administrador.aforos@gmail.com</p>
                            </div>
                            <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" /> My Profile <span className="badge badge-pill badge-danger">1</span></a>
                            <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2" />Aforos</a>
                            <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" />Reportar Contagio</a>
                            <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-power text-primary me-2" />Sign Out</a>
                        </div>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas" onClick={handleClickToggle}>
                    <span className="mdi mdi-menu" />
                </button>
            </div>
        </nav>
    )
}

export default Header