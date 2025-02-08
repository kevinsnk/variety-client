import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const NewEditPedidos = forwardRef((props, ref) => {

    const [idPaquete, setIdPaquete] = useState("");
    //const [fechaIngreso, setFechaIngreso] = useState("");
    const [fechaAsignacion, setFechaAsignacion] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [saldo, setSaldo] = useState(0);
    //const [impuesto, setImpuesto] = useState(0);
    //const [total, setTotal] = useState(0);

    const [paqueteSelected, setPaqueteSelected] = useState([]);

    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [paquetes, setPaquetes] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, pedido) {
            //getEmpleados();
            getPaquetes();
            getClientes();

            setIdPaquete("");
            setFechaAsignacion("");
            setIdCliente("");
            setSaldo(0);

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Pedidos");
            } else if (op === 2) {
                setTitle("Editar Pedidos");

                setIdPaquete(pedido.idPaquete != null ? pedido.idPaquete : "");
                setFechaAsignacion(pedido.fechaAsignacion != null ? pedido.fechaAsignacion : "");
                setIdCliente(pedido.idCliente != null ? pedido.idCliente : "");
                setSaldo(pedido.saldo != null ? pedido.saldo : "");
            }
            window.setTimeout(function () {
                document.getElementById('idPaquete').focus();
            }, 500)
        }
    }))

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        if (idPaquete === "") {
            show_alert("El paquete no puede ir vacío", "warning");
        } else if (idCliente === "") {
            show_alert("El cliente no puede ir vacío", "warning");
        } else {
            parametros = {
                idPaquete: idPaquete,
                fechaAsignacion: fechaAsignacion,
                idCliente: idCliente,
                saldo: saldo,
                entregado : 1
            };
            console.log(parametros);
            metodo = "POST"
            url = "/pedidos/editPedido";

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
                props.getPedidos();
            } else {
                show_alert(msj, 'warning');
            }
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

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

    const getClientes = async () => {
        console.log("Entro a getClientes()");
        await axios.get("/clients/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.clientes);
                setClientes(respuesta.data.clientes);
            }).catch(function (error) {
                show_alert("Error al obtener la información del cliente", "error");
                console.log(error);
            });
    }

    const seleccionarPaquete = (event) => {
        setIdPaquete(paquetes[event.target.value]?.idPaquete);
        setPaqueteSelected(paquetes[event.target.value]);
    }

    useEffect(() => {
        setSaldo(paqueteSelected.pcosto != null ? paqueteSelected.pcosto : 0);
    }, [paqueteSelected]);

    return (
        <div id='modalPedido' className='modal fade bd-example-modal-lg' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <input type='hidden' id='idPedido'></input>
                            <label>No. Paquete</label>
                            <select id='idPaquete' className='form-control' placeholder='No. Paquete'
                                onChange={seleccionarPaquete}>
                                <option value="">Seleccionar una opción</option>
                                {paquetes.map((paquete, i) => (
                                    <option key={i} value={i}>{paquete.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Cliente</label>
                            <select id='idCliente' className='form-control' placeholder='Cliente' value={idCliente}
                                onChange={(e) => setIdCliente(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                {clientes.map((cliente, i) => (
                                    <option value={cliente.idCliente}>{cliente.nombreCliente}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Fecha Entrega</label>
                            <input type='date' id='fechaAsignacion' className='form-control' placeholder="dd-mm-yyyy" value={fechaAsignacion}
                                onChange={(e) => setFechaAsignacion(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Saldo</label>
                            <input type='text' id='saldo' className='form-control' placeholder='Saldo' value={saldo} disabled='true'
                                onChange={(e) => setSaldo(e.target.value)}></input>
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
    )
})
