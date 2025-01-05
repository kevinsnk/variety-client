import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';
import { NewEditClient } from './NewEditClient';

export const ShowClients = () => {

    const [clientes, setClientes] = useState([]);

    const [idCliente, setIdCliente] = useState("");
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
    const [activo, setActivo] = useState("");

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useEffect(() => {
        getClientes();
    }, []);

    const getClientes = async () => {
        await axios.get("/clients/getAll")
        .then(function (respuesta) {
            console.log(respuesta.data.clientes);
            setClientes(respuesta.data.clientes);
        }).catch(function (error) {
            show_alert("Error al obtener la información del cliente", "Error");
            console.log(error);
        });
    }

    const openModal = (op, cliente) => {
        console.log(cliente);
        setIdCliente("");
        setNombreCliente("");
        setNombreComercial("");
        setGrupoCliente("");
        setDireccionCliente("");
        setPaisCliente("");
        setDepartamentoCliente("");
        setMunicipioCliente("");
        setTelefonoCliente("");
        setCelularCliente("");
        setEmailCliente("");
        setNrcCliente("");
        setNitCliente("");
        setDuiCliente("");
        setGiroCliente("");
        setContactoCliente("");
        setSitioWebCliente("");
        setWhatsappCliente("");
        setLatitud("");
        setLongitud("");
        setCtaContableCliente("");
        setIdEmpleado("");
        setActivo("");

        setOperation(op);
        if (op === 1) {
            setTitle("Registrar Cliente");
        } else if (op === 2) {
            setTitle("Editar Cliente");

            setIdCliente(cliente.idCliente);
            setNombreCliente(cliente.nombreCliente);
            setNombreComercial(cliente.nombreComercial);
            setGrupoCliente(cliente.grupoCliente);
            setDireccionCliente(cliente.direccionCliente);
            setPaisCliente(cliente.paisCliente);
            setDepartamentoCliente(cliente.departamentoCliente);
            setMunicipioCliente(cliente.municipioCliente);
            setTelefonoCliente(cliente.telefonoCliente);
            setCelularCliente(cliente.celularCliente);
            setEmailCliente(cliente.emailCliente);
            setNrcCliente(cliente.nrcCliente);
            setNitCliente(cliente.nitCliente);
            setDuiCliente(cliente.duiCliente);
            setGiroCliente(cliente.giroCliente);
            setContactoCliente(cliente.contactoCliente);
            setSitioWebCliente(cliente.sitioWebCliente);
            setWhatsappCliente(cliente.whatsappCliente);
            setLatitud(cliente.latitud);
            setLongitud(cliente.longitud);
            setCtaContableCliente(cliente.ctaContableCliente);
            setIdEmpleado(cliente.idEmpleado);
            setActivo(cliente.Activo);
        }
        window.setTimeout(function () {
            document.getElementById('nombreCliente').focus();
        }, 500)
    }

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        if (nombreCliente.trim() === "") {
            show_alert("El nombre del cliente no puede ir vacío", "warning");
        } else if (nombreComercial.trim() === "") {
            show_alert("El nombre comercial del cliente no puede ir vacío", "warning");
        } else if (grupoCliente.trim() === "") {
            show_alert("El grupo cliente no puede ir vacío", "warning");
        } else {
            parametros = {
                nombreCliente: nombreCliente.trim(),
                nombreComercial: nombreComercial.trim(),
                grupoCliente: grupoCliente.trim()
            };
            metodo = "POST"
            if (operation === 1) {
                url = "/clients/saveClient";
            } else {
                url = "/clients/editClient";
            }

            enviarSolicitud(parametros, metodo, url);
        }
    }

    const enviarSolicitud = async (parametros, metodo, url) => {
        await axios({ method: metodo, url: url, data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alert(msj, tipo);
            if (tipo === 0) {
                document.getElementById("btnCerrar").click();
                getClientes();
            }
        }).catch(function (error) {
            show_alert("Error en la solicitud", "Error");
            console.log(error);
        });
    }
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalClients' onClick={() => openModal(1)}>
                                <i className='fa-solid fa-circle-plus'></i>Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr><th>ID</th><th>NOMBRE</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente, i) => (
                                    <tr key={cliente.idCliente}>
                                        <td>{cliente.idCliente}</td>
                                        <td>{cliente.nombreCliente}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalClients' onClick={() => openModal(2, cliente)}>
                                                <i className='fa-solid fa-edit' ></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger'>
                                                <i className='fa-solid fa-trash' ></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <NewEditClient />
        </div>
    )
}
