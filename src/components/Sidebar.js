import React from 'react';
import '../estilos/css/Sidebar.css';

const Sidebar = () => {

    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
    const openNav = (e) => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
    const closeNav = (e) => {
        console.log("PRUEBA");
        e.preventDefault();
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }

    return (
        <>
            <div id="mySidenav" class="sidenav">
                <a href="/"  class="closebtn" onclick={() => closeNav()}>&times;</a>
                <a href="/clientes">Clientes</a>
                <a href="/empleados">Empleados</a>
                <a href="/paquetes">Paquetes</a>
                <a href="/pedidos">Pedidos</a>
                <a href="/productos">Productos</a>
            </div>
            <span onclick={() => openNav()}>open</span>
            <button className='btn btn-success' onClick={() => openNav()}>
                <i className='fa-solid fa-floppy-disk'></i> Guardar
            </button>
        </>
    );
};

export default Sidebar;