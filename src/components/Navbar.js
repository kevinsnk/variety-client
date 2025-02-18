import React from 'react';
import '../estilos/css/Navbar.css';

const Navbar = () => {
  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Variety
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/clientes">Clientes</a>
          </li>
          <li>
            <a href="/empleados">Empleados</a>
          </li>
          <li>
            <a href="/bodegas">Bodegas</a>
          </li>
          <li>
            <a href="/paquetes">Paquetes</a>
          </li>
          <li>
            <a href="/pedidos">Pedidos</a>
          </li>
          <li>
            <a href="/productos">Productos</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/account" className="user-icon">
          <i className="fas fa-user"></i>
        </a>
      </div>
    </nav>
    </>
  );
};

export default Navbar;