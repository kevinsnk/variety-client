import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { show_alert, searchFunction } from '../../functions';
import { NewEditPaquetes } from './NewEditPaquetes';

export const ShowPaquetes = () => {

    const paqueteModal = useRef();
    const [paquetes, setPaquetes] = useState([]);

    useEffect(() => {
        getPaquetes();
    }, []);

    const getPaquetes = async () => {
        await axios.get("/paquete/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.paquete);
                setPaquetes(respuesta.data.paquete);
            }).catch(function (error) {
                show_alert("Error al obtener la información del paquetes", "error");
                console.log(error);
            });
    }

    const eliminarPaquete = async (parametros) => {
        await axios({ method: "POST", url: "/paquete/deletePaquete", data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            getPaquetes();
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
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalPaquete' onClick={() => paqueteModal.current.openModal(1)}>
                                <i className='fa-solid fa-circle-plus'></i>Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-lg-3 offset-0 offset-lg-2'>
                    <input type="text" id="myInput" onKeyUp={() => searchFunction()} placeholder="Buscar..."/>
                </div>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table id="myTable" className='table table-bordered'>
                            <thead>
                                <tr><th>ID</th><th>Descripción</th><th>Costo</th><th>Venta</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {paquetes.map((paquete, i) => (
                                    <tr key={paquete.idPaquete}>
                                        <td>{paquete.idPaquete}</td>
                                        <td>{paquete.descripcion.trim()}</td>
                                        <td>{paquete.pcosto}</td>
                                        <td>{paquete.pventa}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalPaquete' onClick={() => paqueteModal.current.openModal(2, paquete)}>
                                                <i className='fa-solid fa-edit' ></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger' onClick={() => eliminarPaquete(paquete)}>
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
            <NewEditPaquetes ref={paqueteModal} getPaquetes={() => getPaquetes()} />
        </div>
    )
}
