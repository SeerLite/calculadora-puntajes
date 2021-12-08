function calcular_puntaje(puntajes: Array<number>, porcentajes: Array<number>): number {
	let puntaje_final = 0;
	for (let i = 0; i < Math.min(puntajes.length, porcentajes.length); i++) {
		puntaje_final += puntajes[i] * porcentajes[i] / 100;
	}
	return puntaje_final;
}

function actualizar_puntaje() {
	const inputs_porcentajes = document.querySelectorAll(".porcentajes input");
	const inputs_puntajes = document.querySelectorAll(".puntajes input");

	const puntaje_obtenido = calcular_puntaje(
		[...inputs_porcentajes].map((elemento) => Number((elemento as HTMLInputElement).value)),
		[...inputs_puntajes].map((elemento) => Number((elemento as HTMLInputElement).value))
	);

	const salida = document.getElementById("puntaje-obtenido");
	if (salida === null) {
		throw new Error("Elemento #puntaje-obtenido no existe");
	}
	salida.innerText = String(puntaje_obtenido);
}

document.body.addEventListener("input", (evento) => {
	const elemento = evento.target as HTMLInputElement;
	const valor = Number(elemento.value);
	const maximo = [...elemento.parentElement!.classList].includes("puntajes") ? 850 : 100;
	const minimo = 0;
	if (valor > maximo) {
		elemento.value = String(Math.min(Number(elemento!.value.slice(0, 3)), maximo));
	} else if (valor < minimo){
		elemento.value = String(minimo);
	}
});

document.body.addEventListener("input", actualizar_puntaje);

// TODO: Modificar porcentajes para que el total esté
// siempre en el rango 0-100. Modificar el menos reciente.
const inputs_porcentaje_recientes = new Set(
	document.querySelectorAll(".porcentajes input")
);

actualizar_puntaje();
