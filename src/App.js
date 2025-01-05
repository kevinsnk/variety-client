import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowClients } from './components/ShowClients.js';
import { ShowEmpleados } from './components/empleados/ShowEmpleados.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<ShowClients></ShowClients>}></Route>
        <Route path='/empleados' element={<ShowEmpleados></ShowEmpleados>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
