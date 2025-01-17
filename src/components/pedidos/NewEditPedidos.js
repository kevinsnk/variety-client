import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ShowPedidos } from './ShowPedidos';
import { show_alert } from '../../functions';

export const NewEditPedidos = forwardRef((props, ref) => {

    const [idPedido, setIdPedido] = useState("");
    const [cancelado, setCancelado] = useState("");
    const [estado, setEstado] = useState("");
    const [tipo, setTipo] = useState("");
    const [numero, setNumero] = useState("");
    const [fecha, setFecha] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [idEmpleado, setIdEmpleado] = useState("");
    const [sumas, setSumas] = useState(0);
    const [impuesto, setImpuesto] = useState(0);
    const [total, setTotal] = useState(0);

    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, pedido) {
            getEmpleados();
            getClientes();

            console.log("pedido", pedido);
            setIdPedido("");
            setCancelado("");
            setEstado("");
            setTipo("");
            setNumero("");
            setFecha("");
            setFechaEntrega("");
            setIdCliente("");
            setNombreCliente("");
            setIdEmpleado("");
            setSumas(0);
            setImpuesto(0);
            setTotal(0);

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Pedidos");
            } else if (op === 2) {
                setTitle("Editar Pedidos");

                setIdPedido(pedido.idPedido != null ? pedido.idPedido : "");
                setCancelado(pedido.cancelado != null ? pedido.cancelado : "");
                setEstado(pedido.estado != null ? pedido.estado : "");
                setTipo(pedido.tipo != null ? pedido.tipo : "");
                setNumero(pedido.numero != null ? pedido.numero : "");
                setFecha(pedido.fecha != null ? pedido.fecha : "");
                setFechaEntrega(pedido.fechaEntrega != null ? pedido.fechaEntrega : "");
                setIdCliente(pedido.cliente != null ? pedido.cliente.idCliente : "");
                setNombreCliente(pedido.cliente != null ? pedido.cliente.nombreEmpleado : "");
                setIdEmpleado(pedido.empleado != null ? pedido.empleado.idEmpleado : 0);
                setSumas(pedido.sumas != null ? pedido.sumas : 0);
                setImpuesto(pedido.impuesto != null ? pedido.impuesto : 0);
                setTotal(pedido.total != null ? pedido.total : 0);
            }
            window.setTimeout(function () {
                document.getElementById('cancelado').focus();
            }, 500)
        }
    }))

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        if (cancelado.trim() === "") {
            show_alert("El nombre del pedido no puede ir vacío", "warning");
        } else if (tipo.trim() === "") {
            show_alert("El tipo de pedido no puede ir vacío", "warning");
        } else {
            parametros = {
                idPedido: idPedido,
                cancelado: cancelado,
                estado: estado,
                tipo: tipo,
                numero: numero,
                fecha: fecha,
                fechaEntrega: fechaEntrega,
                idCliente: idCliente,
                nombreCliente: nombreCliente,
                idEmpleado: idEmpleado,
                sumas: sumas,
                impuesto: impuesto,
                total: total,
            };
            metodo = "POST"
            if (operation === 1) {
                url = "/pedidos/savePedido";
            } else {
                url = "/pedidos/editPedido";
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
                props.getPedidos();
            } else {
                show_alert(msj, 'warning');
            }
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

    const getEmpleados = async () => {
        await axios.get("/empleados/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.empleados);
                setEmpleados(respuesta.data.empleados);
            }).catch(function (error) {
                show_alert("Error al obtener la información del empleado", "error");
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
                            <label>Cancelado</label>
                            <input type='text' id='cancelado' className='form-control' placeholder='Cancelado' value={cancelado}
                                onChange={(e) => setCancelado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Estado</label>
                            <input type='text' id='estado' className='form-control' placeholder='Estado' value={estado}
                                onChange={(e) => setEstado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Tipo</label>
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                                onChange={(e) => setTipo(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Numero</label>
                            <input type='text' id='numero' className='form-control' placeholder='Numero' value={numero}
                                onChange={(e) => setNumero(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Fecha</label>
                            <input type='date' id='fecha' className='form-control' placeholder="dd-mm-yyyy" value={fecha}
                                onChange={(e) => setFecha(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Fecha Entreha</label>
                            <input type='date' id='fechaEntrega' className='form-control' placeholder="dd-mm-yyyy" value={fechaEntrega}
                                onChange={(e) => setFechaEntrega(e.target.value)}></input>
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
                            <label>Empleado</label>
                            <select id='idEmpleado' className='form-control' placeholder='Empleado' value={idEmpleado}
                                onChange={(e) => setIdEmpleado(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                {empleados.map((empleado, i) => (
                                    <option value={empleado.idEmpleado}>{empleado.nombreEmpleado}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Sumas</label>
                            <input type='text' id='sumas' className='form-control' placeholder='Sumas' value={sumas}
                                onChange={(e) => setSumas(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Impuesto</label>
                            <input type='text' id='impuestos' className='form-control' placeholder='Impuesto' value={impuesto}
                                onChange={(e) => setImpuesto(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Total</label>
                            <input type='text' id='total' className='form-control' placeholder='Total' value={total}
                                onChange={(e) => setTotal(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Tipo Pedido</label>
                            <select id='tipo' className='form-control' value={tipo}
                                onChange={(e) => setTipo(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                <option value="1">Administrador</option>
                                <option value="2">Operador</option>
                            </select>
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
