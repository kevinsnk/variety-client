import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowClients } from './components/clientes/ShowClients.js';
import { ShowEmpleados } from './components/empleados/ShowEmpleados.js';
import Navbar from './components/Navbar.js';
import { ShowPaquetes } from './components/paquetes/ShowPaquetes.js';
import { ShowPedidos } from './components/pedidos/ShowPedidos.js';
import { ShowProductos } from './components/productos/ShowProductos.js';
import { ShowBodegas } from './components/bodegas/ShowBodegas.js';
import { ShowCuentasxCobrar } from './components/cuentasxcobrar/ShowCuentasxCobrar.js';
import MenuLateral from './components/MenuLateral.js';
import './estilos/css/Style.css';

function App() {
  return (
    <>

      <Navbar></Navbar>
      <div id="main">
        <Routes>
          <Route path='/clientes' element={<ShowClients></ShowClients>}></Route>
          <Route path='/empleados' element={<ShowEmpleados></ShowEmpleados>}></Route>
          <Route path='/bodegas' element={<ShowBodegas></ShowBodegas>}></Route>
          <Route path='/paquetes' element={<ShowPaquetes></ShowPaquetes>}></Route>
          <Route path='/pedidos' element={<ShowPedidos></ShowPedidos>}></Route>
          <Route path='/productos' element={<ShowProductos></ShowProductos>}></Route>
          <Route path='/cuentasxcobrar' element={<ShowCuentasxCobrar></ShowCuentasxCobrar>}></Route>
        </Routes>
      </div>

    </>
  );
}

export default App;
