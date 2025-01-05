import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../functions';
import { NewEditEmpleados } from './NewEditEmpleados';

export const ShowEmpleados = () => {

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

    useEffect(() => {
        getEmpleados();
    }, []);

    const getEmpleados = async () => {
        await axios.get("/empleado/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.empleados);
                setEmpleados(respuesta.data.empleados);
            }).catch(function (error) {
                show_alert("Error al obtener la información del empleado", "Error");
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
                getEmpleados();
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
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmpleado' onClick={() => openModal(1)}>
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
                                {empleados.map((empleado, i) => (
                                    <tr key={empleado.idEmpleado}>
                                        <td>{empleado.idEmpleado}</td>
                                        <td>{empleado.nombreEmpleado}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalEmpleado' onClick={() => openModal(2, empleado)}>
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
            <NewEditEmpleados />
        </div>
    )
}
