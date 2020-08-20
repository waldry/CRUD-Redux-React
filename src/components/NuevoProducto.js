import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions de redux

import { crearNuevoProducto } from "../actions/productoAction";
import { mostrarAlerta, ocultaralertaAction } from "../actions/alertaAction";

const NuevoProducto = ({ history }) => {
	//State del componente
	const [nombre, setNombre] = useState("");
	const [precio, setPrecio] = useState(0);
	//Utilizar use dispatch y te crea una funcion
	const dispatch = useDispatch();

	//Acceder al state del store
	const cargando = useSelector((state) => state.productos.loading);
	const error = useSelector((state) => state.productos.error);
	const alerta = useSelector((state) => state.alerta.alerta);

	//Manda a llamar el action de productoAction
	const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));
	//Cuando el submit se ejecute
	//#region Enviar el formulario
	const enviarForm = (e) => {
		e.preventDefault();

		//Validar form
		if (nombre.trim() === "" || precio <= 0) {
			const alerta = {
				msg: "Ambos campos son obligatorios",
				classes: "alert alert-danger text-center text-uppercase p3",
			};
			dispatch(mostrarAlerta(alerta));
			return;
		}
		//Errores
		dispatch(ocultaralertaAction());
		//Crear producto.
		agregarProducto({
			nombre,
			precio,
		});

		//Redireccionar
		history.push("/");
		//#endregion
	};
	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Agregar Nuevo Producto
						</h2>
						{alerta ? <p className={alerta.classes}>{alerta.msg} </p> : null}
						<form onSubmit={enviarForm}>
							<div className="form-group">
								<label htmlFor="">Nombre Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="nombre"
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="">Precio Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="precio"
									value={precio}
									onChange={(e) => setPrecio(Number(e.target.value))}
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
							>
								{" "}
								Agregar
							</button>
						</form>
						{cargando ? <p>cargando...</p> : null}
						{error ? (
							<p className="alert alert-danger p2 mt-4 text-center">
								Hubo un error
							</p>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoProducto;
