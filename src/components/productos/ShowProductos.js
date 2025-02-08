import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { show_alert, searchFunction } from '../../functions';
import { NewEditProductos } from './NewEditProductos';

export const ShowProductos = () => {

    const productosModal = useRef();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        await axios.get("/productos/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.productos);
                setProductos(respuesta.data.productos);
            }).catch(function (error) {
                show_alert("Error al obtener la información de productos", "error");
                console.log(error);
            });
    }

    const eliminarProducto = async (parametros) => {
        await axios({ method: "POST", url: "/productos/deleteProducto", data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            getProductos();
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
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProductos' onClick={() => productosModal.current.openModal(1)}>
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
                                <tr><th>ID</th><th>DESCRIPCION</th><th>SERIE</th><th>LOTE</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {productos.map((producto, i) => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.idProducto}</td>
                                        <td>{producto.descripcion.trim()}</td>
                                        <td>{producto.serie}</td>
                                        <td>{producto.lote}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProductos' onClick={() => productosModal.current.openModal(2, producto)}>
                                                <i className='fa-solid fa-edit' ></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger' onClick={() => eliminarProducto(producto)}>
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
            <NewEditProductos ref={productosModal} getProductos={() => getProductos()} />
        </div>
    )
}
