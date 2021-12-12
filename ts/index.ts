function calcular_puntaje(puntajes: Array<number>, porcentajes: Array<number>): number {
	let puntaje_final = 0;
	for (let i = 0; i < Math.min(puntajes.length, porcentajes.length); i++) {
		puntaje_final += puntajes[i] * porcentajes[i] / 100;
	}
	return puntaje_final;
}

function actualizar_puntaje() {
	const inputs_puntajes: Array<HTMLInputElement> =
		Array.from(document.querySelectorAll(".puntajes input"));

	let valores_porcentajes = inputs_porcentajes_recientes.map((elemento) => Number(elemento.value));
	const valores_puntajes = inputs_puntajes.map((elemento) => Number(elemento.value));

	if (valores_porcentajes.reduce((acc, x) => acc + x) !== 100) {
		for (let [i, porcentaje] of valores_porcentajes.entries()) {
			const diferencia = 100 - valores_porcentajes.reduce((acc, x) => acc + x);
			if (diferencia >= 0 || porcentaje + diferencia >= 0) {
				valores_porcentajes[i] = porcentaje + diferencia;
				break;
			} else {
				valores_porcentajes[i] = 0;
			}
		}

		// slice para no tocar el último elemento modificado
		for (let [i, porcentaje] of valores_porcentajes.slice(0, -1).entries()) {
			inputs_porcentajes_recientes[i].value = String(porcentaje);
		}
	}

	const puntaje_obtenido = calcular_puntaje( valores_porcentajes, valores_puntajes);

	const salida = document.getElementById("puntaje-obtenido");
	if (!salida) {
		throw new Error("Elemento #puntaje-obtenido no existe");
	}
	salida.innerText = String(puntaje_obtenido);
}

document.body.addEventListener("input", (evento) => {
	const elemento = evento.target as HTMLInputElement;

	let clasesParent;
	if (!elemento.parentElement || !(clasesParent = Array.from(elemento.parentElement.classList))) {
		// No sé si estoy usando los errors correctamente
		throw new Error(`${elemento} no tiene parents`);
	}

	enum Categoria {Puntaje, Porcentaje}

	let categoria;
	if (clasesParent.includes("puntajes")) {
		categoria = Categoria.Puntaje;
	} else if (clasesParent.includes("porcentajes")) {
		categoria = Categoria.Porcentaje;
	} else {
		throw new Error(`${elemento} no pertenece a ninguna categoria (puntaje/porcentaje)`)
	}

	if (categoria === Categoria.Porcentaje) {
		inputs_porcentajes_recientes.splice(inputs_porcentajes_recientes.indexOf(elemento), 1);
		inputs_porcentajes_recientes.push(elemento);
	}

	elemento.value = elemento.value.slice(0, 3);

	const valor = Number(elemento.value);
	if (valor !== 0) {
		elemento.value = String(valor);
	}

	if (elemento.value.length < 3) return;

	let maximo, minimo;
	if (categoria === Categoria.Puntaje) {
		maximo = 850;
		minimo = 150;
	} else {
		maximo = 100;
		minimo = 0;
	}

	if (valor > maximo) {
		elemento.value = String(Math.min(valor, maximo));
	} else if (valor < minimo){
		elemento.value = String(minimo);
	}
});

document.body.addEventListener("input", actualizar_puntaje);

const inputs_porcentajes_recientes: Array<HTMLInputElement> = Array.from(
	document.querySelectorAll(".porcentajes input")
);
inputs_porcentajes_recientes.reverse();

for (let input of inputs_porcentajes_recientes) {
	input.addEventListener("focus", (evento) => {
		inputs_porcentajes_recientes.splice(inputs_porcentajes_recientes.indexOf(input), 1);
		inputs_porcentajes_recientes.push(input);
	})
}

actualizar_puntaje();
