import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';
import { useReactToPrint } from "react-to-print";

export const NewEditPaquetes = forwardRef((props, ref) => {

    const [idPaquete, setIdPaquete] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [pCosto, setPCosto] = useState(0);
    const [pVenta, setPVenta] = useState(0);

    const [idProducto, setIdProducto] = useState("");
    const [detaProducto, setDetaProducto] = useState("");
    const [costo, setCosto] = useState(0);
    const [venta, setVenta] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [idBodega, setIdBodega] = useState("");

    const [detalleProductos, setDetalleProductos] = useState([]);
    const [producto, setProducto] = useState([]);
    const [listaProductos, setListaProductos] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    const contentRef = React.useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });

    useImperativeHandle(ref, () => ({
        openModal(op, paquete) {
            console.log(paquete);
            setIdPaquete("");
            setDescripcion("");
            setPCosto(0);
            setPVenta(0);
            setCantidad(0);
            setDetalleProductos([]);

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Paquete");
            } else if (op === 2) {
                setTitle("Editar Paquete");

                getDetallePaquete(paquete.idPaquete);

                setIdPaquete(paquete.idPaquete);
                setDescripcion(paquete.descripcion);
                setPCosto(paquete.pcosto);
                setPVenta(paquete.pventa);
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

    const getProductos = async () => {
        await axios.get("/productos/getAll")
            .then(function (respuesta) {
                //console.log(respuesta.data.productos);
                setListaProductos(respuesta.data.productos);
            }).catch(function (error) {
                show_alert("Error al obtener la información de productos", "error");
                console.log(error);
            });
    }

    const getDetallePaquete = async (idPaquete) => {
        await axios.get("/paquete/getDetallePaquete?idPaquete=" + idPaquete)
            .then(function (respuesta) {
                setDetalleProductos(respuesta.data.detaPaquetes);
            }).catch(function (error) {
                show_alert("Error al obtener la información de productos", "error");
                console.log(error);
            });
    }

    const openModalProductos = () => {
        getProductos();
        setIdProducto("");
        setDetaProducto("");
        setCosto(0);
        setVenta(0);
        setCantidad(0);
        setProducto([]);

        window.setTimeout(function () {
            document.getElementById('idProducto').focus();
        }, 500)
    }

    const agregarProducto = () => {
        var productoTemp;
        productoTemp = {
            idPaquete: idPaquete,
            idProducto: idProducto,
            detaProducto: detaProducto,
            costo: costo,
            venta: venta,
            cantidad: cantidad,
            idBodega: idBodega
        };
        setDetalleProductos(detalleProductos => [...detalleProductos, productoTemp]);

        document.getElementById("btnCerrarProducto").click();
    }

    useEffect(() => {
        console.log("producto", producto);
        setDetaProducto(producto.descripcion);
        setCosto(producto.valCompra);
        setVenta(producto.valVenta);
    }, [producto]);

    useEffect(() => {
        console.log("detalleProductos", detalleProductos);
        for (let i = 0; i < detalleProductos.length; i++) {
            setPCosto(pCosto + detalleProductos[i]?.costo);
            setPVenta(pVenta + + detalleProductos[i]?.venta);
        }
    }, [detalleProductos]);

    const productoSelected = (event) => {
        setIdProducto(listaProductos[event.target.value]?.idProducto);
        setProducto(listaProductos[event.target.value]);
    }

    return (
        <>
            <div id='modalPaquete' className='modal fade bd-example-modal-lg' aria-hidden='true' ref={contentRef}>
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
                            <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success' onClick={() => reactToPrintFn()}>
                                    <i className='fa-solid fa-floppy-disk'></i> Imprimir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='modalProducto' className='modal fade bd-example-modal-lg' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>Agregar Producto</label>
                            <button id='btnCerrarProducto' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label>Producto</label>
                                <select id='idProducto' className='form-control' placeholder='Producto'
                                    onChange={productoSelected}>
                                    <option value="">Seleccionar una opción</option>
                                    {listaProductos.map((producto, i) => (
                                        <option key={i} value={i}>{producto.descripcion}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>Costo</label>
                                <input type='number' id='costo' className='form-control' placeholder='Costo' value={costo}
                                    onChange={(e) => setCosto(e.target.valueAsNumber)}></input>
                            </div>
                            <div className='form-group'>
                                <label>Venta</label>
                                <input type='number' id='venta' className='form-control' placeholder='Venta' value={venta}
                                    onChange={(e) => setVenta(e.target.valueAsNumber)}></input>
                            </div>
                            <div className='form-group'>
                                <label>Cantidad</label>
                                <input type='number' id='cantidad' className='form-control' placeholder='Cantidad' value={cantidad}
                                    onChange={(e) => setCantidad(e.target.valueAsNumber)}></input>
                            </div>
                            <br />
                            <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success'
                                    data-bs-target="#modalPaquete" data-bs-toggle="modal"
                                    onClick={() => agregarProducto()}>
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
