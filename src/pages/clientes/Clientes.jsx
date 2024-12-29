import React, { useState, useEffect } from 'react';
import './clientes.scss';

function Clientes() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [grupoCliente, setGrupoCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [paisCliente, setPaisCliente] = useState("");
  const [departamentoCliente, setDepartamentoCliente] = useState("");
  const [municipioCliente, setMunicipioCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [celularCliente, setCelularCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [nrcCliente, setNrcCliente] = useState("");
  const [nitCliente, setNitCliente] = useState("");
  const [duiCliente, setDuiCliente] = useState("");
  const [giroCliente, setGiroCliente] = useState("");
  const [contactoCliente, setContactoCliente] = useState("");
  const [sitioWebCliente, setSitioWebCliente] = useState("");
  const [whatsappCliente, setWhatsappCliente] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [ctaContableCliente, setCtaContableCliente] = useState("");
  const [idEmpleado, setIdEmpleado] = useState("");
  const [Activo, setActivo] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/clients/findAll")
      .then((response) => {
        response.json()
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const enviarFormulario = (event) => {
    const reviewInfo = {
      nombreCliente : nombreCliente,
      nombreComercial : nombreComercial,
      grupoCliente : grupoCliente,
      direccionCliente : direccionCliente,
      paisCliente : paisCliente,
      departamentoCliente : departamentoCliente,
      municipioCliente : municipioCliente,
      telefonoCliente : telefonoCliente,
      celularCliente : celularCliente,
      emailCliente : emailCliente,
      nrcCliente : nrcCliente,
      nitCliente : nitCliente,
      duiCliente : duiCliente,
      giroCliente : giroCliente,
      contactoCliente : contactoCliente,
      sitioWebCliente : sitioWebCliente,
      whatsappCliente : whatsappCliente,
      latitud : latitud,
      longitud : longitud,
      ctaContableCliente: ctaContableCliente,
    };
    fetch("http://localhost:8080/clients/save", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(reviewInfo),
    })
      .then((respose) => respose.json())
      .then((newReview) => {
        setNombreCliente("");
        setNombreComercial("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validarFormulario = (event) => {
    event.preventDefault();
    alert(`Formulario a mandar: 
      Nombre Cliente: ${nombreCliente}
      Nombre Comercial: ${nombreComercial}`);

      enviarFormulario();
  }

  return (
    <div className="clientesForm">
      <form onSubmit={validarFormulario}>
        <label>Nombre Cliente:</label>
          <input 
            type="text" 
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
          />
        <label>Nombre Comercial:
          <input 
            type="text" 
            value={nombreComercial}
            onChange={(e) => setNombreComercial(e.target.value)}
          />
        </label>
        <label>Grupo Cliente:
          <input 
            type="text" 
            value={grupoCliente}
            onChange={(e) => setGrupoCliente(e.target.value)}
          />
        </label>

        <label>Direccion Cliente:</label>
          <input 
            type="text" 
            value={direccionCliente}
            onChange={(e) => setDireccionCliente(e.target.value)}
          />
        <label>Pais Cliente:
          <input 
            type="text" 
            value={paisCliente}
            onChange={(e) => setPaisCliente(e.target.value)}
          />
        </label>
        <label>Departamento Cliente:
          <input 
            type="text" 
            value={departamentoCliente}
            onChange={(e) => setDepartamentoCliente(e.target.value)}
          />
        </label>
        <label>Municipio Cliente:</label>
          <input 
            type="text" 
            value={municipioCliente}
            onChange={(e) => setMunicipioCliente(e.target.value)}
          />
        <label>Telefono Cliente:
          <input 
            type="text" 
            value={telefonoCliente}
            onChange={(e) => setTelefonoCliente(e.target.value)}
          />
        </label>
        <label>Celular Cliente:
          <input 
            type="text" 
            value={celularCliente}
            onChange={(e) => setCelularCliente(e.target.value)}
          />
        </label>
        <label>Email Cliente:</label>
          <input 
            type="text" 
            value={emailCliente}
            onChange={(e) => setEmailCliente(e.target.value)}
          />
        <label>Nrc Cliente:
          <input 
            type="text" 
            value={nrcCliente}
            onChange={(e) => setNrcCliente(e.target.value)}
          />
        </label>
        <label>Nit Cliente:
          <input 
            type="text" 
            value={nitCliente}
            onChange={(e) => setNitCliente(e.target.value)}
          />
        </label>

        <label>Dui Cliente:</label>
          <input 
            type="text" 
            value={duiCliente}
            onChange={(e) => setDuiCliente(e.target.value)}
          />
        <label>Giro Cliente:
          <input 
            type="text" 
            value={giroCliente}
            onChange={(e) => setGiroCliente(e.target.value)}
          />
        </label>
        <label>Contacto Cliente:
          <input 
            type="text" 
            value={contactoCliente}
            onChange={(e) => setContactoCliente(e.target.value)}
          />
        </label>
        <label>Sitio Web Cliente:</label>
          <input 
            type="text" 
            value={sitioWebCliente}
            onChange={(e) => setSitioWebCliente(e.target.value)}
          />
        <label>Whatsapp Cliente:
          <input 
            type="text" 
            value={whatsappCliente}
            onChange={(e) => setWhatsappCliente(e.target.value)}
          />
        </label>
        <label>Cuenta Contable Cliente:
          <input 
            type="text" 
            value={ctaContableCliente}
            onChange={(e) => setCtaContableCliente(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Clientes;