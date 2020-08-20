import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

//Muestra alerta
export function mostrarAlerta(alerta) {
	return (dispatch) => {
		dispatch(crearAlerta(alerta));
	};
}

const crearAlerta = (alerta) => ({
	type: MOSTRAR_ALERTA,
	payload: alerta,
});

export function ocultaralertaAction() {
	return (dispatch) => {
		dispatch(ocultaralerta());
	};
}

const ocultaralerta = () => ({
	type: OCULTAR_ALERTA,
});
