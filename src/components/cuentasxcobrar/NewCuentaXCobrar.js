import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert, searchFunction } from '../../functions';

export const NewCuentaXCobrar = forwardRef((props, ref) => {

    const [idCobro, setIdCobro] = useState("");
    const [fechaCobro, setFechaCobro] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [montoPagado, setMontoPagado] = useState(0);
    const [referencia, setReferencia] = useState("");

    const [listaMovimientos, setListaMovimientos] = useState([]);
    const [listaCXC, setlistaCXC] = useState([]);

    const [movimientos, setMovimientos] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);


    useImperativeHandle(ref, () => ({
        openModal(cliente) {
            console.log(cliente);
            setIdCobro("");
            setFechaCobro("");
            setIdCliente(cliente?.idCliente);
            setNombreCliente(cliente?.nombreCliente);
            setMontoPagado("");
            setReferencia("");

            getMovimientosByClient(cliente?.idCliente);

            window.setTimeout(function () {
                document.getElementById('montoPagado').focus();
            }, 500)
        }
    }))

    const getMovimientosByClient = async (parametros) => {
        await axios({ method: "GET", url: "/cxc/getMovimientosByClient", data: parametros }).then(function (respuesta) {
            setMovimientos(respuesta.data.movimientos);
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;

    }

    return (
        <div id='modalMovimientos' className='modal fade bd-example-modal-lg' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>Cuentas x Cobrar</label>
                        <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <input type='hidden' id='idEmpleado'></input>
                            <label>Nombre Cliente</label>
                            <input type='text' id='nombreCliente' className='form-control' value={nombreCliente} disabled="true"
                                onChange={(e) => setNombreCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Monto a Pagar:</label>
                            <input type='number' id='montoPagado' className='form-control' placeholder='0.0' value={montoPagado}
                                onChange={(e) => setMontoPagado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Referencia</label>
                            <input type='text' id='referencia' className='form-control' placeholder='Referencia' value={referencia}
                                onChange={(e) => setReferencia(e.target.value)}></input>
                        </div>
                        <br />
                        <div className='d-grid col-6 mx-auto'>
                            <button className='btn btn-success' onClick={() => validarFormulario()}>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table id="myTable" className='table table-bordered'>
                                <thead>
                                    <tr><th>CLIENTE</th><th>DESCRIPCIÓN</th><th>DEBITOS</th><th>CRÉDITOS</th><th>SALDOS</th><th>ACCIONES</th></tr>
                                </thead>
                                <tbody>
                                    {movimientos.map((movimiento, i) => (
                                        <tr>
                                            <td>{movimiento.cliente.nombreCliente.trim()}</td>
                                            <td>{movimiento.descripcion.trim()}</td>
                                            <td>{movimiento.debito}</td>
                                            <td>{movimiento.credito}</td>
                                            <td>{movimiento.saldo}</td>
                                            <td>
                                                <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalClients' onClick={() => console.log("xDDD")}>
                                                    <i class="fa-solid fa-money-check-dollar"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
