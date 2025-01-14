import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowClients } from './components/clientes/ShowClients.js';
import { ShowEmpleados } from './components/empleados/ShowEmpleados.js';
import Navbar from './components/Navbar.js';
import { ShowPaquetes } from './components/paquetes/ShowPaquetes.js';

function App() {
  return (
    <>

      <Navbar></Navbar>
      <Routes>
        <Route path='/clientes' element={<ShowClients></ShowClients>}></Route>
        <Route path='/empleados' element={<ShowEmpleados></ShowEmpleados>}></Route>
        <Route path='/paquetes' element={<ShowPaquetes></ShowPaquetes>}></Route>
      </Routes>
    </>
  );
}

export default App;
