import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const AsignarPaquetexBodega = forwardRef((props, ref) => {

    const [idBodega, setIdBodega] = useState([]);
    const [paquetesSelected, setPaquetesSelected] = useState([]);

    const [paquete, setPaquete] = useState([]);
    const [listaPaquetes, setListaPaquetes] = useState([]);
    const [bodegas, setBodegas] = useState([]);

    useImperativeHandle(ref, () => ({
        openModalAsignacionBodega() {
            getPaquetesXAsignar();
            getBodegas();

            window.setTimeout(function () {
                document.getElementById('descripcionPaquete').focus();
            }, 500)
        }
    }))

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

    const getPaquetesXAsignar = async () => {
        await axios.get("/paquete/getPaquetesXAsignar")
            .then(function (respuesta) {
                console.log(respuesta.data.paquete);
                setListaPaquetes(respuesta.data.paquete);
            }).catch(function (error) {
                show_alert("Error al obtener la información del paquetes", "error");
                console.log(error);
            });
    }

    const bodegaSelected = (event) => {
        setIdBodega(bodegas[event.target.value]?.idBodega);
    }

    const paqueteSelected = (event) => {
        setPaquete(listaPaquetes[event.target.value]);
    }

    const validarFormulario = () => {

    }

    const agregarPaquete = () => {
        setPaquetesSelected(paquetesSelected => [...paquetesSelected, paquete]);
    }

    return (
        <>
            <div id='modalAsignarBodega' className='modal fade bd-example-modal-lg' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>Asignar Bodega</label>
                            <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label>Producto</label>
                                <select id='idBodega' className='form-control' placeholder='Producto'
                                    onChange={bodegaSelected}>
                                    <option value="">Seleccionar una opción</option>
                                    {bodegas.map((bodega, i) => (
                                        <option key={i} value={i}>{bodega.descripcion}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>Producto</label>
                                <select id='idPaquete' className='form-control' placeholder='Producto'
                                    onChange={paqueteSelected}>
                                    <option value="">Seleccionar una opción</option>
                                    {listaPaquetes.map((paquete, i) => (
                                        <option key={i} value={i}>{paquete.descripcion}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success' onClick={() => agregarPaquete()}>
                                    <i className='fa-solid fa-circle-plus'></i> Agregar Paquete
                                </button>
                            </div>
                            <br />
                            <div className='row mt-3'>
                                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr><th>ID</th><th>Descripción</th></tr>
                                            </thead>
                                            <tbody>
                                                {paquetesSelected?.map((paquete, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{paquete.descripcion}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
        </>
    )
})
