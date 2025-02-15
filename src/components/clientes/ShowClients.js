import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { show_alert, searchFunction } from '../../functions';
import { NewEditClient } from './NewEditClient';
import { NewCuentaXCobrar } from '../cuentasxcobrar/NewCuentaXCobrar.js';

export const ShowClients = () => {

    const clienteModal = useRef();
    const cuentasxCobrarModal = useRef();
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        getClientes();
    }, []);

    const getClientes = async () => {
        await axios.get("/clients/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.clientes);
                setClientes(respuesta.data.clientes);
            }).catch(function (error) {
                show_alert("Error al obtener la información del cliente", "error");
                console.log(error);
            });
    }

    const eliminarCliente = async (parametros) => {
        console.log(parametros);
        await axios({ method: "POST", url: "/clients/deleteClient", data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            getClientes();
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
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalClients' onClick={() => clienteModal.current.openModal(1)}>
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
                        <table id="myTable" className='table table-bordered'>
                            <thead>
                                <tr><th>ID</th><th>NOMBRE</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente, i) => (
                                    <tr key={cliente.idCliente}>
                                        <td>{cliente.idCliente}</td>
                                        <td>{cliente.nombreCliente}</td>
                                        <td>
                                            <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalMovimientos' onClick={() => cuentasxCobrarModal.current.openModal(cliente)}>
                                                <i class="fa-solid fa-money-check-dollar"></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalClients' onClick={() => clienteModal.current.openModal(2, cliente)}>
                                                <i className='fa-solid fa-edit' ></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger' onClick={() => eliminarCliente(cliente)}>
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
            <NewEditClient ref={clienteModal} getClientes={() => getClientes()} />
            <NewCuentaXCobrar ref={cuentasxCobrarModal}/>
        </div>
    )
}
