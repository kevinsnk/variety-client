import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { show_alert } from '../../functions';

export const NewEditProductos = forwardRef((props, ref) => {

    const [idProducto, setIdProducto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [descripPrint, setDescripPrint] = useState("");
    const [grupo, setGrupo] = useState("");
    const [tipo, setTipo] = useState("");
    const [uniCompra, setUniCompra] = useState("");
    const [valCompra, setValCompra] = useState("");
    const [uniVenta, setUniVenta] = useState("");
    const [valVenta, setValVenta] = useState("");
    const [uniInvent, setUniInvent] = useState("");
    const [valInvent, setValInvent] = useState("");
    const [serie, setSerie] = useState("");
    const [lote, setLote] = useState("");

    const [unidades, setUnidades] = useState([]);

    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    useImperativeHandle(ref, () => ({
        openModal(op, producto) {

            getUnidades();

            console.log(producto);
            setIdProducto("");
            setDescripcion("");
            setDescripPrint("");
            setGrupo("");
            setTipo("");
            setUniCompra("");
            setValCompra("");
            setUniVenta("");
            setValVenta("");
            setUniInvent("");
            setValInvent("");
            setSerie("");
            setLote("");

            setOperation(op);
            if (op === 1) {
                setTitle("Registrar Producto");
            } else if (op === 2) {
                setTitle("Editar Producto");

                setIdProducto(producto.idProducto);
                setDescripcion(producto.descripcion);
                setDescripPrint(producto.descripPrint);
                setGrupo(producto.grupo);
                setTipo(producto.tipo);
                setUniCompra(producto.uniCompra);
                setValCompra(producto.valCompra);
                setUniVenta(producto.uniVenta);
                setValVenta(producto.valVenta);
                setUniInvent(producto.uniInvent);
                setValInvent(producto.valInvent);
                setSerie(producto.serie);
                setLote(producto.lote);
            }
            window.setTimeout(function () {
                document.getElementById('descripcion').focus();
            }, 500)
        }
    }))

    const getUnidades = async () => {
        await axios.get("/unidades/getAll")
            .then(function (respuesta) {
                console.log(respuesta.data.unidades);
                setUnidades(respuesta.data.unidades);
            }).catch(function (error) {
                show_alert("Error al obtener la información de las unidades", "error");
                console.log(error);
            });
    }

    const validarFormulario = () => {
        var parametros;
        var metodo;
        var url;
        if (descripcion === "") {
            show_alert("La descripcion no puede ir vacío", "warning");
        } else if (descripPrint === "") {
            show_alert("La descripcion print no puede ir vacío", "warning");
        } else if (grupo === "") {
            show_alert("El grupo de producto no puede ir vacío", "warning");
        } else if (tipo === "") {
            show_alert("El tipo no puede ir vacío", "warning");
        } else if (uniCompra === "") {
            show_alert("Unidad de compra no puede ir vacío", "warning");
        } else if (valCompra === "") {
            show_alert("Valor Compra no puede ir vacío", "warning");
        } else if (uniVenta === "") {
            show_alert("Unidad Venta no puede ir vacío", "warning");
        } else if (valVenta === "") {
            show_alert("Valor Venta no puede ir vacío", "warning");
        } else if (uniInvent === "") {
            show_alert("Unidad Inventario no puede ir vacío", "warning");
        } else if (valInvent === "") {
            show_alert("Valor Inventario no puede ir vacío", "warning");
        } else if (serie === "") {
            show_alert("Serie no puede ir vacío", "warning");
        } else if (lote === "") {
            show_alert("Lote no puede ir vacío", "warning");
        } else {
            parametros = {
                idProducto: idProducto,
                descripcion: descripcion.trim(),
                descripPrint: descripPrint.trim(),
                grupo: grupo,
                tipo: tipo,
                uniCompra: uniCompra,
                valCompra: valCompra,
                uniVenta: uniVenta,
                valVenta: valVenta,
                uniInvent: uniInvent,
                valInvent: valInvent,
                serie: serie,
                lote: lote
            };
            metodo = "POST"
            if (operation === 1) {
                url = "/productos/saveProducto";
            } else {
                url = "/productos/editProducto";
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
                props.getProductos();
            } else {
                show_alert(msj, 'warning');
            }
        }).catch(function (error) {
            show_alert("Servicio no disponible.", "error");
            console.log(error);
        });
    }

    return (
        <div id='modalProductos' className='modal fade bd-example-modal-lg' aria-hidden='true'>
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <input type='hidden' id='idProducto'></input>
                            <label>ID Producto</label>
                            <input type='text' id='idProducto' className='form-control' placeholder='ID Producto ' value={idProducto}
                                onChange={(e) => setIdProducto(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Descripcion</label>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripcio ' value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Descripcion Print</label>
                            <input type='text' id='descripPrint' className='form-control' placeholder='Descripcion Print' value={descripPrint}
                                onChange={(e) => setDescripPrint(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Grupo</label>
                            <input type='text' id='grupo' className='form-control' placeholder='Grupo' value={grupo}
                                onChange={(e) => setGrupo(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Tipo</label>
                            <input type='text' id='tipo' className='form-control' placeholder='Tipo' value={tipo}
                                onChange={(e) => setTipo(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Unidad Compra</label>
                            <select id='uniCompra' className='form-control' placeholder='Unidad Compra' value={uniCompra}
                                onChange={(e) => setUniCompra(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                {unidades.map((unidad, i) => (
                                    <option value={unidad.idUnidad}>{unidad.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Valor Compra</label>
                            <input type='text' id='valCompra' className='form-control' placeholder='Valor Compra' value={valCompra}
                                onChange={(e) => setValCompra(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Unidad Venta</label>
                            <select id='uniVenta' className='form-control' placeholder='Unidad Venta' value={uniVenta}
                                onChange={(e) => setUniVenta(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                {unidades.map((unidad, i) => (
                                    <option value={unidad.idUnidad}>{unidad.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Valor Venta</label>
                            <input type='text' id='valVenta' className='form-control' placeholder='Valor Venta' value={valVenta}
                                onChange={(e) => setValVenta(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Unidad Inventario</label>
                            <select id='uniInvent' className='form-control' placeholder='Unidad Inventario' value={uniInvent}
                                onChange={(e) => setUniInvent(e.target.value)}>
                                <option value="">Seleccionar una opción</option>
                                {unidades.map((unidad, i) => (
                                    <option value={unidad.idUnidad}>{unidad.descripcion}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Valor Inventario</label>
                            <input type='text' id='valInvent' className='form-control' placeholder='Valor Inventario' value={valInvent}
                                onChange={(e) => setValInvent(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Serie</label>
                            <input type='text' id='serie' className='form-control' placeholder='Serie' value={serie}
                                onChange={(e) => setSerie(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label>Lote</label>
                            <input type='text' id='lote' className='form-control' placeholder='Lote' value={lote}
                                onChange={(e) => setLote(e.target.value)}></input>
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
