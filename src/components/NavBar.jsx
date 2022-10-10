import React from 'react'
import { useAuth } from '../context/authContext'
import '../css/custom/style-custom.css'

const NavBar = () => {
  const { toggle, logout } = useAuth();

  const handleLogout = async () =>{
    await logout();
  }

  return (
    <nav className={`sidebar sidebar-offcanvas menuLateral ${toggle ? "active" : ""}`} id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            <i className="mdi mdi-grid-large menu-icon" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item nav-category">Realtime</li>
        <li className="nav-item">
          <a className="nav-link" href="#/aforos">
            <i className="menu-icon mdi mdi-floor-plan" />
            <span className="menu-title">Aforos</span>
          </a>
        </li>
        <li className="nav-item nav-category">Reportes</li>
        <li className="nav-item">
          <a className="nav-link" href="#/reportar-contagio">
            <i className="menu-icon mdi mdi-card-text-outline" />
            <span className="menu-title">Reportar Contagio</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#">
            <i className="menu-icon mdi mdi-layers-outline" />
            <span className="menu-title">Configuración</span>
          </a>
        </li>
        <li className="nav-item nav-category">Logout</li>
        <li className="nav-item">
          <a className="nav-link mr-1" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
          </svg>
            <span className="menu-title">Salir</span>
            <i className="menu-arrow" />
          </a>
        </li>
      </ul>
    </nav>

  )
}

export default NavBar