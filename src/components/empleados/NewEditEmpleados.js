import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../functions';

export const NewEditEmpleados = () => {

    const [empleados, setEmpleados] = useState([]);

    const [idEmpleado, setIdEmpleado] = useState("");
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [apellidoEmpleado, setApellidoEmpleado] = useState("");
    const [direccionEmpleado, setDireccionEmpleado] = useState("");
    const [telefonoEmpleado, setTelefonoEmpleado] = useState("");
    const [celularEmpleado, setCelularEmpleado] = useState("");
    const [emailEmpleado, setEmailEmpleado] = useState("");
    const [activo, setActivo] = useState(0);
    const [tipoEmpleado, setTipoEmpleado] = useState("");

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    const getClientes = async () => {
        await axios.get("/empleado/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.empleados);
                setEmpleados(respuesta.data.empleados);
            }).catch(function (error) {
                show_alert("Error al obtener la información del cliente", "Error");
                console.log(error);
            });
    }

    const openModal = (op, empleado) => {
        console.log(empleado);
        setIdEmpleado("");
        setNombreEmpleado("");
        setApellidoEmpleado("");
        setDireccionEmpleado("");
        setTelefonoEmpleado("");
        setCelularEmpleado("");
        setEmailEmpleado("");
        setActivo(0);
        setTipoEmpleado("");

        setOperation(op);
        if (op === 1) {
            setTitle("Registrar Empleado");
        } else if (op === 2) {
            setTitle("Editar Empleado");

            setIdEmpleado(empleado.idEmpleado);
            setNombreEmpleado(empleado.nombreEmpleado);
            setApellidoEmpleado(empleado.apellidoEmpleado);
            setDireccionEmpleado(empleado.direccionEmpleado);
            setTelefonoEmpleado(empleado.telefonoEmpleado);
            setCelularEmpleado(empleado.celularEmpleado);
            setEmailEmpleado(empleado.emailEmpleado);
            setActivo(empleado.activo);
            setTipoEmpleado(empleado.tipoEmpleado);
        }
        window.setTimeout(function () {
            document.getElementById('nombreEmpleado').focus();
        }, 500)
    }

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        if (nombreEmpleado.trim() === "") {
            show_alert("El nombre del empleado no puede ir vacío", "warning");
        } else if (apellidoEmpleado.trim() === "") {
            show_alert("El apellido del empleado no puede ir vacío", "warning");
        } else if (tipoEmpleado.trim() === "") {
            show_alert("El tipo de empleado no puede ir vacío", "warning");
        } else {
            parametros = {
                nombreEmpleado: nombreEmpleado.trim(),
                apellidoEmpleado: apellidoEmpleado.trim(),
                tipoEmpleado: tipoEmpleado.trim()
            };
            metodo = "POST"
            if (operation === 1) {
                url = "/clients/saveEmpleado";
            } else {
                url = "/clients/editEmpleado";
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
        <div id='modalEmpleado' className='modal fade bd-example-modal-lg' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <input type='hidden' id='idEmpleado'></input>
                            <label>Nombre Empleado</label>
                            <input type='text' id='nombreEmpleado' className='form-control' placeholder='Nombre Empleado' value={nombreEmpleado}
                                onChange={(e) => setNombreEmpleado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Apellido Empleado</label>
                            <input type='text' id='apellidoEmpleado' className='form-control' placeholder='Apellido Empleado' value={apellidoEmpleado}
                                onChange={(e) => setApellidoEmpleado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Dirección Empleado</label>
                            <input type='text' id='direccionEmpleado' className='form-control' placeholder='Dirección Empleado' value={direccionEmpleado}
                                onChange={(e) => setDireccionEmpleado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Teléfono Empleado</label>
                            <input type='text' id='telefonoEmpleado' className='form-control' placeholder='Teléfono Empleado' value={telefonoEmpleado}
                                onChange={(e) => setTelefonoEmpleado(e.target.value)}></input>
                        </div>
                        

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
}
