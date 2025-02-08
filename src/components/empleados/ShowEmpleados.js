import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert, searchFunction } from '../../functions';
import { NewEditEmpleados } from './NewEditEmpleados';

export const ShowEmpleados = () => {

    const empleadoModal = useRef();
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        getEmpleados();
    }, []);

    const getEmpleados = async () => {
        await axios.get("/empleados/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.empleados);
                setEmpleados(respuesta.data.empleados);
            }).catch(function (error) {
                show_alert("Error al obtener la información del empleado", "error");
                console.log(error);
            });
    }

    const eliminarEmpleado = async (parametros) => {
        await axios({ method: "POST", url: "/empleados/deleteEmpleado", data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            getEmpleados();
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmpleado' onClick={() => empleadoModal.current.openModal(1)}>
                                <i className='fa-solid fa-circle-plus'></i>Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-lg-3 offset-0 offset-lg-2'>
                    <input type="text" id="myInput" onKeyUp={() => searchFunction()} placeholder="Buscar..." />
                </div>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table id="myTable"  className='table table-bordered'>
                            <thead>
                                <tr><th>ID</th><th>NOMBRE</th><th>Tipo Empleado</th><th>Estado</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {empleados.map((empleado, i) => (
                                    <tr key={empleado.idEmpleado}>
                                        <td>{empleado.idEmpleado}</td>
                                        <td>{empleado.nombreEmpleado.trim() + ' ' + empleado.apellidoEmpleado.trim()}</td>
                                        <td>{empleado.tipoEmpleado}</td>
                                        <td>{empleado.activo}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalEmpleado' onClick={() => empleadoModal.current.openModal(2, empleado)}>
                                                <i className='fa-solid fa-edit' ></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger' onClick={() => eliminarEmpleado(empleado)}>
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
            <NewEditEmpleados ref={empleadoModal} getEmpleados={() => getEmpleados()} />
        </div>
    )
}
