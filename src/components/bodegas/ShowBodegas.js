import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../../functions';
import { NewEditBodegas } from './NewEditBodegas';

export const ShowBodegas = () => {

    const bodegasModal = useRef();
    const [bodegas, setBodegas] = useState([]);

    useEffect(() => {
        getBodegas();
    }, []);

    const getBodegas = async () => {
        await axios.get("/bodegas/getAll")
        .then(function (respuesta) {
            console.log(respuesta.data.bodega);
            setBodegas(respuesta.data.bodega);
        }).catch(function (error) {
            show_alert("Error al obtener la información de las bodegas", "error");
            console.log(error);
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalBogedas' onClick={() => bodegasModal.current.openModal(1)}>
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
                                <tr><th>DESCRIPCION</th><th>UBICACIÓN FINAL</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {bodegas.map((bodega, i) => (
                                    <tr key={bodega.idBodega}>
                                        <td>{bodega.descripcion}</td>
                                        <td>{bodega.ubicacionFi}</td>
                                        <td>
                                            <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalBogedas' onClick={() => bodegasModal.current.openModal(2, bodega)}>
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
            <NewEditBodegas ref={bodegasModal} getBodegas={()=> getBodegas()} />
        </div>
    )
}
