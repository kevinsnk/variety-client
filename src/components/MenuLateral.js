import React, {useState} from 'react';
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";

const MenuLateral = () => {

  const [prueba, setPrueba] = useState(false);
  return (
    <>
      <Sidebar width={"270px"} isCollapse={prueba} userName={"Kevin"} designation={"Administrador"}>
        <Logo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png">
          Variety
        </Logo>
        <Menu subHeading="HOME">
          <MenuItem link="/" icon={<i class="fa-solid fa-house"></i>}>
            Inicio
          </MenuItem>
          <MenuItem link="/clientes" icon={<i className='fa-solid fa-floppy-disk'></i>}>
          Clientes
          </MenuItem>
          <MenuItem>Empleados</MenuItem>
        </Menu>
        <Menu subHeading="APPS">
          <MenuItem>Chat</MenuItem>
          <MenuItem>Calendar</MenuItem>
        </Menu>
        <Menu subHeading="OTHERS">
          <Submenu title="Menu Level">
            <MenuItem>Post</MenuItem>
            <MenuItem>Details</MenuItem>
            <Submenu title="Level 2">
              <MenuItem>new</MenuItem>
              <MenuItem>Hello</MenuItem>
            </Submenu>
          </Submenu>

          <MenuItem>Chip</MenuItem>
          <MenuItem target="_blank" link="google.com">
            External Link
          </MenuItem>
        </Menu>
      </Sidebar>
      <button className='btn btn-success' onClick={() => setPrueba(true)}>
      <i className='fa-solid fa-floppy-disk'></i> Guardar
    </button>
    </>
  );
};

export default MenuLateral;