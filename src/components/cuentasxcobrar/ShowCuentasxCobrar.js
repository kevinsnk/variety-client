import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert, searchFunction } from '../../functions';

export const ShowCuentasxCobrar = forwardRef((props, ref) => {

    const [idCobro, setIdCobro] = useState("");
    const [fechaCobro, setsetFechaCobro] = useState("");
    const [IdCliente, setIdCliente] = useState("");
    const [montoPagado, setMontoPagado] = useState(0);
    const [referencia, setReferencia] = useState("");

    const [listaMovimientos, setListaMovimientos] = useState([]);
    const [listaCXC, setlistaCXC] = useState([]);

    const [paquetes, setPaquetes] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useEffect(() => {
        getCXC();
    }, []);

    const getCXC = async () => {
        await axios.get("/cxc/getAll")
            .then(function (respuesta) {
                setlistaCXC(respuesta.data.paquete);
            }).catch(function (error) {
                show_alert("Error al obtener la información del paquetes", "error");
                console.log(error);
            });
    }

    return (
        <div className='App'>
            <div className='row mt-3'>
                <div className='col-lg-3 offset-0 offset-lg-2'>
                    <input type="text" id="myInput" onKeyUp={() => searchFunction()} placeholder="Buscar..." />
                </div>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table id="myTable" className='table table-bordered'>
                            <thead>
                                <tr><th>CLIENTE</th><th>DESCRIPCIÓN</th><th>DEBITOS</th><th>CRÉDITOS</th><th>SALDOS</th><th>ACCIONES</th></tr>
                            </thead>
                            <tbody>
                                {paquetes.map((paquete, i) => (
                                    <tr key={paquete.idPaquete}>
                                        <td>{paquete.cliente.trim()}</td>
                                        <td>{paquete.descripcion.trim()}</td>
                                        <td>{paquete.debito}</td>
                                        <td>{paquete.credito}</td>
                                        <td>{paquete.saldo}</td>
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
    )
})
