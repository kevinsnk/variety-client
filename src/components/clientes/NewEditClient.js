import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const NewEditClient = forwardRef((props, ref) => {

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

    useImperativeHandle(ref, () => ({
        openModal(op, cliente) {
            console.log(cliente);
            console.log(op);
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

                setIdCliente(cliente.idCliente != null ? cliente.idCliente : "");
                setNombreCliente(cliente.nombreCliente != null ? cliente.nombreCliente : "");
                setNombreComercial(cliente.nombreComercial != null ? cliente.nombreComercial : "");
                setGrupoCliente(cliente.grupoCliente != null ? cliente.grupoCliente : "");
                setDireccionCliente(cliente.direccionCliente != null ? cliente.direccionCliente : "");
                setPaisCliente(cliente.paisCliente != null ? cliente.paisCliente : "");
                setDepartamentoCliente(cliente.departamentoCliente != null ? cliente.departamentoCliente : "");
                setMunicipioCliente(cliente.municipioCliente != null ? cliente.municipioCliente : "");
                setTelefonoCliente(cliente.telefonoCliente != null ? cliente.telefonoCliente : "");
                setCelularCliente(cliente.celularCliente != null ? cliente.celularCliente : "");
                setEmailCliente(cliente.emailCliente != null ? cliente.emailCliente : "");
                setNrcCliente(cliente.nrcCliente != null ? cliente.nrcCliente : "");
                setNitCliente(cliente.nitCliente != null ? cliente.nitCliente : "");
                setDuiCliente(cliente.duiCliente != null ? cliente.duiCliente : "");
                setGiroCliente(cliente.giroCliente != null ? cliente.giroCliente : "");
                setContactoCliente(cliente.contactoCliente != null ? cliente.contactoCliente : "");
                setSitioWebCliente(cliente.sitioWebCliente != null ? cliente.sitioWebCliente : "");
                setWhatsappCliente(cliente.whatsappCliente != null ? cliente.whatsappCliente : "");
                setLatitud(cliente.latitud != null ? cliente.latitud : "");
                setLongitud(cliente.longitud != null ? cliente.longitud : "");
                setCtaContableCliente(cliente.ctaContableCliente != null ? cliente.ctaContableCliente : "");
                setIdEmpleado(cliente.idEmpleado != null ? cliente.idEmpleado : "");
                setActivo(cliente.Activo != null ? cliente.Activo : "");
            }
            window.setTimeout(function () {
                document.getElementById('nombreCliente').focus();
            }, 500)
        }
    }))

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
                grupoCliente: grupoCliente.trim(),
                idEmpleado : idEmpleado.trim()
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
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            if (tipo === 0) {
                document.getElementById("btnCerrar").click();
                //getClientes();
            }
        }).catch(function (error) {
            show_alert("Error en la solicitud", "error");
            console.log(error);
        });
    }
    return (
        <div id='modalClients' className='modal fade bd-example-modal-lg' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <input type='hidden' id='idCliente'></input>
                            <label>Nombre Cliente</label>
                            <input type='text' id='nombreCliente' className='form-control' placeholder='Nombre Cliente' value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Nombre Comercial</label>
                            <input type='text' id='nombreComercial' className='form-control' placeholder='Nombre Comercial' value={nombreComercial}
                                onChange={(e) => setNombreComercial(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Grupo Cliente</label>
                            <input type='text' id='grupoCliente' className='form-control' placeholder='Grupo Cliente' value={grupoCliente}
                                onChange={(e) => setGrupoCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Dirección Cliente</label>
                            <input type='text' id='direccionCliente' className='form-control' placeholder='Dirección Cliente' value={direccionCliente}
                                onChange={(e) => setDireccionCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Pais Cliente</label>
                            <input type='text' id='paisCliente' className='form-control' placeholder='Pais Cliente' value={paisCliente}
                                onChange={(e) => setPaisCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Departamento Cliente</label>
                            <input type='text' id='departamentoCliente' className='form-control' placeholder='Departamento Cliente' value={departamentoCliente}
                                onChange={(e) => setDepartamentoCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Municipio Cliente</label>
                            <input type='text' id='municipioCliente' className='form-control' placeholder='Municipio Cliente' value={municipioCliente}
                                onChange={(e) => setMunicipioCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Teléfono Cliente</label>
                            <input type='text' id='telefonoCliente' className='form-control' placeholder='Teléfono Cliente' value={telefonoCliente}
                                onChange={(e) => setTelefonoCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Celular Cliente</label>
                            <input type='text' id='celularCliente' className='form-control' placeholder='Celular Cliente' value={celularCliente}
                                onChange={(e) => setCelularCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Email Cliente</label>
                            <input type='text' id='emailCliente' className='form-control' placeholder='Email Cliente' value={emailCliente}
                                onChange={(e) => setEmailCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>NRC Cliente</label>
                            <input type='text' id='nrcCliente' className='form-control' placeholder='NRC Cliente' value={nrcCliente}
                                onChange={(e) => setNrcCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>NIT Cliente</label>
                            <input type='text' id='nitCliente' className='form-control' placeholder='NIT Cliente' value={nitCliente}
                                onChange={(e) => setNitCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>DUI Cliente</label>
                            <input type='text' id='duiCliente' className='form-control' placeholder='DUI Cliente' value={duiCliente}
                                onChange={(e) => setDuiCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Giro Cliente</label>
                            <input type='text' id='giroCliente' className='form-control' placeholder='Giro Cliente' value={giroCliente}
                                onChange={(e) => setGiroCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Contacto Cliente</label>
                            <input type='text' id='contactoCliente' className='form-control' placeholder='Contacto Cliente' value={contactoCliente}
                                onChange={(e) => setContactoCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Sitio Web Cliente</label>
                            <input type='text' id='sitioWebCliente' className='form-control' placeholder='Sitio Web Cliente' value={sitioWebCliente}
                                onChange={(e) => setSitioWebCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Whatsapp Cliente</label>
                            <input type='text' id='whatsappCliente' className='form-control' placeholder='Whatsapp Cliente' value={whatsappCliente}
                                onChange={(e) => setWhatsappCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Cuenta Contable Cliente</label>
                            <input type='text' id='ctaContableCliente' className='form-control' placeholder='Cuenta Contable Cliente' value={ctaContableCliente}
                                onChange={(e) => setCtaContableCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Latitud</label>
                            <input type='text' id='latitud' className='form-control' placeholder='Latitud' value={latitud}
                                onChange={(e) => setLatitud(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Longitud</label>
                            <input type='text' id='longitud' className='form-control' placeholder='Longitud' value={longitud}
                                onChange={(e) => setLongitud(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>ID Empleado</label>
                            <input type='text' id='idEmpleado' className='form-control' placeholder='ID Empleado' value={idEmpleado}
                                onChange={(e) => setIdEmpleado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Activo</label>
                            <input type='text' id='activo' className='form-control' placeholder='Activo' value={activo}
                                onChange={(e) => setActivo(e.target.value)}></input>
                        </div>
                        <br />
                        <div className='d-grid col-6 mx-auto'>
                            <button className='btn btn-success' onClick={() => validarFormulario()}>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
