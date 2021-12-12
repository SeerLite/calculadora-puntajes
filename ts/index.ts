function clamp(input: number, min: number, max: number): number {
	return Math.min(Math.max(input, min), max);
}

function calcular_puntaje(puntajes: Array<number>, porcentajes: Array<number>): number {
	let puntaje_final = 0;
	for (let [i, puntaje] of puntajes.entries()) {
		puntaje_final += puntaje * porcentajes[i] / 100;
	}
	return puntaje_final;
}

function actualizar_puntaje(): void {
	const inputs_puntajes: Array<HTMLInputElement> =
		Array.from(document.querySelectorAll(".puntajes input"));

	const valores_porcentajes: Array<number> = inputs_porcentajes_recientes.map(
		(elemento) => clamp(Number(elemento.value), 0, 100)
	);
	const valores_puntajes: Array<number> = inputs_puntajes.map(
		(elemento) => clamp(Number(elemento.value), 150, 850)
	);

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

	const puntaje_obtenido: number = calcular_puntaje(valores_porcentajes, valores_puntajes);

	const salida = document.getElementById("puntaje-obtenido");
	if (!salida) {
		throw new Error("Elemento #puntaje-obtenido no existe");
	}

	const puntaje_obtenido_str = String(puntaje_obtenido);
	if (salida.innerText !== puntaje_obtenido_str) {
		salida.innerText = puntaje_obtenido_str;
		const color_destacado = ["bg-gray-400", "text-green-900"];
		salida.classList.add(...color_destacado);
		setTimeout(() => salida.classList.remove(...color_destacado), 150);
	}
}

document.body.addEventListener("input", (evento) => {
	const elemento = evento.target as HTMLInputElement;

	let clasesParent: Array<string>;
	if (!elemento.parentElement || !(clasesParent = Array.from(elemento.parentElement.classList))) {
		// No sé si estoy usando los errors correctamente
		throw new Error(`${elemento} no tiene parents`);
	}

	enum Categoria {Puntaje, Porcentaje}

	let categoria: Categoria;
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

	if (elemento.value.length >= 3) {
		let maximo, minimo;
		if (categoria === Categoria.Puntaje) {
			maximo = 850;
			minimo = 150;
		} else {
			maximo = 100;
			minimo = 0;
		}

		if (valor > maximo) {
			elemento.value = String(maximo);
		} else if (valor < minimo) {
			elemento.value = String(minimo);
		}
	}

	actualizar_puntaje();
});

const inputs_porcentajes_recientes: Array<HTMLInputElement> = Array.from(
	document.querySelectorAll(".porcentajes input")
);
inputs_porcentajes_recientes.reverse();

actualizar_puntaje();
