import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';
import { NewEditPedidos } from './NewEditPedidos';

export const ShowPedidos = () => {

    const pedidoModal = useRef();
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        getPedidos();
    }, []);

    const getPedidos = async () => {
        await axios.get("/pedidos/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.pedidos);
                setPedidos(respuesta.data.pedidos);
            }).catch(function (error) {
                show_alert("Error al obtener la información del pedido", "error");
                console.log(error);
            });
    }

    const eliminarPedidos = async (parametros) => {
        await axios({ method: "POST", url: "/pedidos/deletePedido", data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            getPedidos();
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
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalPedido' onClick={() => pedidoModal.current.openModal(1)}>
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
                                <tr><th>ID</th><th>ESTADO</th><th>CLIENTE</th><th>EMPLEADO</th><th>TOTAL</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedidos, i) => (
                                    <tr key={pedidos.idPedido}>
                                        <td>{pedidos.idPedido}</td>
                                        <td>{pedidos.estado} </td>
                                        <td>{pedidos.cliente?.nombreCliente} </td>
                                        <td>{pedidos.empleado?.nombreEmpleado + ' ' + pedidos.empleado?.apellidoEmpleado}</td>
                                        <td>{pedidos.total}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalPedido' onClick={() => pedidoModal.current.openModal(2, pedidos)}>
                                                <i className='fa-solid fa-edit' ></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger' onClick={() => eliminarPedidos(pedidos)}>
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
            <NewEditPedidos ref={pedidoModal} getPedidos={() => getPedidos()}/>
        </div>
    )
}
