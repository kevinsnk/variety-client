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
    const [nombreCliente, setNombreCliente] = useState(0);
    const [idEmpleado, setIdEmpleado] = useState("");
    const [sumas, setSumas] = useState("");
    const [impuestos, setImpuestos] = useState("");
    const [total, setTotal] = useState(0);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, pedido) {
            console.log(pedido);
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
            setSumas("");
            setImpuestos("");
            setTotal("");

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Pedidos");
            } else if (op === 2) {
                setTitle("Editar Pedidos");

                setIdPedido(pedido.setIdPedido);
                setCancelado(pedido.setCancelado);
                setEstado(pedido.setEstado);
                setTipo(pedido.setTipo);
                setNumero(pedido.setNumero);
                setFecha(pedido.setFecha);
                setFechaEntrega(pedido.setFechaEntrega);
                setIdCliente(pedido.setIdCliente);
                setNombreCliente(pedido.setNombreCliente);
                setIdEmpleado(pedido.setIdEmpleado);
                setSumas(pedido.setSumas);
                setImpuestos(pedido.setImpuestos);
                setTotal(pedido.setTotal);
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
                cancelado: cancelado.trim(),
                estado: estado.trim(),
                tipo: tipo.trim(),
                numero: numero.trim(),
                fecha: fecha.trim(),
                fechaEntrega: fechaEntrega.trim(),
                idCliente: idCliente.trim(),
                nombreCliente: nombreCliente.trim(),
                idEmpleado: idEmpleado.trim(),
                sumas: sumas.trim(),
                impuestos: impuestos.trim(),
                total: total.trim(),
            };
            metodo = "POST"
            if (operation === 1) {
                url = "/pedidos/savePedidos";
            } else {
                url = "/pedidos/editPedidos";
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
                            <label>Nombre Pedido</label>
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
                            <input type='text' id='fecha' className='form-control' placeholder='Fecha' value={fecha}
                                onChange={(e) => setFecha(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Fecha Entreha</label>
                            <input type='text' id='fechaEntrega' className='form-control' placeholder='Fecha entrega' value={fechaEntrega}
                                onChange={(e) => setFechaEntrega(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Id Cliente</label>
                            <input type='text' id='idCliente' className='form-control' placeholder='Id Cliente' value={idCliente}
                                onChange={(e) => setIdCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>nombre Cliente</label>
                            <input type='text' id='nombreCliente' className='form-control' placeholder='Nombre Cliente' value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Id Empleado</label>
                            <input type='text' id='idEmpleado' className='form-control' placeholder='Id Empleado' value={idEmpleado}
                                onChange={(e) => setIdEmpleado(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Sumas</label>
                            <input type='text' id='sumas' className='form-control' placeholder='Sumas' value={sumas}
                                onChange={(e) => setSumas(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Impuesto</label>
                            <input type='text' id='impuestos' className='form-control' placeholder='Impuesto' value={impuestos}
                                onChange={(e) => setImpuestos(e.target.value)}></input>
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
