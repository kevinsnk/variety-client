import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const NewEditPaquetes = forwardRef((props, ref) => {

    const [idPaquete, setIdPaquete] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [pCosto, setPcosto] = useState("");
    const [pVenta, setPventa] = useState("");

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, paquete) {
            console.log(paquete);
            setIdPaquete("");
            setDescripcion("");
            setPcosto("");
            setPventa("");

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Paquete");
            } else if (op === 2) {
                setTitle("Editar Paquete");

                setIdPaquete(paquete.idPaquete);
                setDescripcion(paquete.descripcion);
                setPcosto(paquete.pCosto);
                setPventa(paquete.pVenta);
            }
            window.setTimeout(function () {
                document.getElementById('descripcionPaquete').focus();
            }, 500)
        }
    }))

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        console.log(descripcion);
        console.log(pCosto);
        console.log(pVenta);
        if (descripcion.trim() === "") {
            show_alert("La descripción no puede ir vacío", "warning");
        } else if (pCosto === "") {
            show_alert("El costo no puede ir vacío", "warning");
        } else if (pVenta === "") {
            show_alert("El valor de venta no puede ir vacío", "warning");
        } else {
            parametros = {
                idPaquete: idPaquete,
                descripcion: descripcion.trim(),
                pCosto: pCosto,
                pVenta: pVenta
            };
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
                            <input type='text' id='pCosto' className='form-control' placeholder='Costo Paquete' value={pCosto}
                                onChange={(e) => setPcosto(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Precio de Venta</label>
                            <input type='text' id='pVenta' className='form-control' placeholder='Precio de Venta' value={pVenta}
                                onChange={(e) => setPventa(e.target.value)}></input>
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
