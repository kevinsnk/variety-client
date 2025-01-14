import React, { useEffect, useState, forwardRef, useImperativeHandle, act } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const NewEditBodegas = forwardRef((props, ref) => {


    useImperativeHandle(ref, () => ({
        openModal(op, cliente) {
            
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
            if (tipo === "0") {
                document.getElementById("btnCerrar").click();
                show_alert(msj, 'success');
                props.getBodegas();
            }else{
                show_alert(msj, 'warning');
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
                            <label>Empleado</label>
                                <select  id='idEmpleado' className='form-control' placeholder='ID Empleado' value={idEmpleado}
                                onChange={(e) => setIdEmpleado(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                {empleados.map((empleado, i) => (
                                   <option value={empleado.idEmpleado}>{empleado.nombreEmpleado}</option>
                                ))}
                            </select>
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
