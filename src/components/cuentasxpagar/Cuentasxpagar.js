import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const Cuentasxpagar = forwardRef((props, ref) => {

    const [idCobro, setIdCobro] = useState("");
    const [fechaCobro, setsetFechaCobro] = useState("");
    const [IdCliente, setIdCliente] = useState("");
    const [montoPagado, setMontoPagado] = useState(0);
    const [referencia, setReferencia] = useState("");

    const [listaMovimientos, setListaMovimientos] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, paquete) {
            console.log(paquete);
            setIdCobro("");
            setsetFechaCobro("");
            setIdCliente("");
            setMontoPagado(0);
            setReferencia("");

            window.setTimeout(function () {
                document.getElementById('descripcionPaquete').focus();
            }, 500)
        }
    }))

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        if (descripcion.trim() === "") {
            show_alert("La descripción no puede ir vacío", "warning");
        } else if (pCosto === 0) {
            show_alert("El costo no puede ir vacío", "warning");
        } else if (pVenta === 0) {
            show_alert("El valor de venta no puede ir vacío", "warning");
        } else {
            parametros = {
                idPaquete: idPaquete,
                descripcion: descripcion.trim(),
                pcosto: pCosto,
                pventa: pVenta,
                detallePaquete: detalleProductos
            };
            console.log("PARAMETROS A ENVIAR: ", parametros);
            metodo = "POST"
            if (operation === 1) {
                url = "/paquete/savePaquete";
            } else {
                url = "/paquete/editPaquete";
            }

            enviarSolicitud(parametros, metodo, url);
        }
    }

    const enviarSolicitud = async (parametros, metodo, url) => {
        await axios({ method: metodo, url: url, data: parametros }).then(function (respuesta) {
            var tipo = respuesta.data.codigo;
            var msj = respuesta.data.descripcion;
            show_alert(msj, tipo);
            if (tipo === "0") {
                document.getElementById("btnCerrar").click();
                show_alert(msj, 'success');
                props.getPaquetes();
            } else {
                show_alert(msj, 'warning');
            }
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

    return (
        <>
            <div id='modalPaquete' className='modal fade bd-example-modal-lg' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <input type='hidden' id='idEmpleado'></input>
                                <label>Descripción Paquete</label>
                                <input type='text' id='descripcionPaquete' className='form-control' placeholder='Descripción Paquete' value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}></input>
                            </div>
                            <div className='form-group'>
                                <label>Costo Paquete</label>
                                <input type='number' id='pCosto' className='form-control' placeholder='Costo Paquete' value={pCosto}
                                    onChange={(e) => setPCosto(e.target.valueAsNumber)}></input>
                            </div>
                            <div className='form-group'>
                                <label>Precio de Venta</label>
                                <input type='number' id='pVenta' className='form-control' placeholder='Precio de Venta' value={pVenta}
                                    onChange={(e) => setPVenta(e.target.valueAsNumber)}></input>
                            </div>
                            <br />
                            <div className='col-md-4 offset-md-4'>
                                <div className='d-grid mx-auto'>
                                    <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducto' onClick={() => openModalProductos()}>
                                        <i className='fa-solid fa-circle-plus'></i>Agregar Producto
                                    </button>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr><th>ID</th><th>Descripción</th></tr>
                                            </thead>
                                            <tbody>
                                                {detalleProductos?.map((producto, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{producto.detaProducto}</td>
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
