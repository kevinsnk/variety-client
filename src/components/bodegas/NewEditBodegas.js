import React, { useEffect, useState, forwardRef, useImperativeHandle, act } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const NewEditBodegas = forwardRef((props, ref) => {

    const [idBodega, setIdBodega] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacionFi, setUbicacionFi] = useState("");

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, bodega) {
            console.log(bodega);
            setIdBodega("");
            setDescripcion("");
            setUbicacionFi("");

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Bodega");
            } else if (op === 2) {
                setTitle("Editar Bodega");

                setIdBodega(bodega?.idBodega);
                setDescripcion(bodega?.descripcion);
                setUbicacionFi(bodega?.ubicacionFi);
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
        if (idBodega.trim() === "") {
            show_alert("El código de bodega no puede ir vacío", "warning");
        } else if (descripcion.trim() === "") {
            show_alert("La descripción no puede ir vacío", "warning");
        } else if (ubicacionFi.trim() === "") {
            show_alert("La ubicación fisica no puede ir vacío", "warning");
        } else {
            parametros = {
                idBodega: idBodega,
                descripcion: descripcion,
                ubicacionFi: ubicacionFi
            };
            console.log("PARAMETROS A ENVIAR: ", parametros);
            metodo = "POST"
            if (operation === 1) {
                url = "/bodegas/saveBodega";
            } else {
                url = "/bodegas/editBodega";
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
                props.getBodegas();
            } else {
                show_alert(msj, 'warning');
            }
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

    return (
        <div id='modalBogedas' className='modal fade bd-example-modal-lg' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <label>ID Bodega</label>
                            <input type='text' id='idBodega' className='form-control' placeholder='ID Bodega' value={idBodega}
                                onChange={(e) => setIdBodega(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Descripcion</label>
                            <input type='number' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                                onChange={(e) => setDescripcion(e.target.valueAsNumber)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Ubicación Fisica</label>
                            <input type='number' id='ubicacionFi' className='form-control' placeholder='Ubicación Fisica' value={ubicacionFi}
                                onChange={(e) => setUbicacionFi(e.target.valueAsNumber)}></input>
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
