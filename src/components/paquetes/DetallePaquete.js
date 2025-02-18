import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';
import { show_alert } from '../../functions';

export const DetallePaquete = forwardRef((props, ref) => {

    const [idPaquete, setIdPaquete] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [pCosto, setPCosto] = useState(0);
    const [pVenta, setPVenta] = useState(0);

    const [detalleProductos, setDetalleProductos] = useState([]);

    const [title, setTitle] = useState("");

    const contentRef = React.useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });

    useImperativeHandle(ref, () => ({
        openModalDetalle(paquete) {
            console.log(paquete);

            setTitle("Detalle Paquete");

            setIdPaquete(paquete.idPaquete);
            setDescripcion(paquete.descripcion);
            setPCosto(paquete.pcosto);
            setPVenta(paquete.pventa);

            getDetallePaquete(paquete.idPaquete);
        }
    }))

    const getDetallePaquete = async (idPaquete) => {
        await axios.get("/paquete/getDetallePaquete?idPaquete=" + idPaquete)
            .then(function (respuesta) {
                setDetalleProductos(respuesta.data.detaPaquetes);
            }).catch(function (error) {
                show_alert("Error al obtener la información de productos", "error");
                console.log(error);
            });
    }

    return (
        <>
            <div id='detallePaquete' className='modal fade bd-example-modal-lg' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body' ref={contentRef}>
                            <div className='form-group'>
                                <input type='hidden' id='idEmpleado'></input>
                                <label>Descripción Paquete</label>
                                <input type='text' id='descripcionPaquete' className='form-control' placeholder='Descripción Paquete' value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)} disabled={true}></input>
                            </div>
                            <div className='form-group'>
                                <label>Costo Paquete</label>
                                <input type='number' id='pCosto' className='form-control' placeholder='Costo Paquete' value={pCosto}
                                    onChange={(e) => setPCosto(e.target.valueAsNumber)} disabled={true}></input>
                            </div>
                            <div className='form-group'>
                                <label>Precio de Venta</label>
                                <input type='number' id='pVenta' className='form-control' placeholder='Precio de Venta' value={pVenta}
                                    onChange={(e) => setPVenta(e.target.valueAsNumber)} disabled={true}></input>
                            </div>
                            <br />
                            <div className='row mt-3'>
                                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr><th>ID</th><th>Descripción</th><th>Costo</th><th>Venta</th><th>Cantidad</th></tr>
                                            </thead>
                                            <tbody>
                                                {detalleProductos?.map((producto, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{producto.detaProducto}</td>
                                                        <td>{producto.costo}</td>
                                                        <td>{producto.venta}</td>
                                                        <td>{producto.cantidad}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                        <div className='modal-footer'>
                            <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success' onClick={() => reactToPrintFn()}>
                                    <i className='fa-solid fa-floppy-disk'></i> Imprimir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
