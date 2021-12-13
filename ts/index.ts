import "virtual:windi.css"
import "../css/styles.css"

function clamp(input: number, min: number, max: number): number {
	return Math.min(Math.max(input, min), max);
}

function calcular_puntaje(materias: Array<Materia>): number {
	let puntaje_final = 0;
	for (let materia of materias) {
		puntaje_final += materia.puntaje * materia.porcentaje / 100;
	}
	return puntaje_final;
}

function actualizar_puntaje(materias: Array<Materia>): void {
	if (materias.reduce((acc, materia) => acc + materia.porcentaje, 0) !== 100) {
		for (let materia of materias) {
			const diferencia = 100 - materias.reduce((acc, materia) => acc + materia.porcentaje, 0);
			if (diferencia >= 0 || materia.porcentaje + diferencia >= 0) {
				materia.porcentaje += diferencia;
				break;
			} else {
				materia.porcentaje = 0;
			}
		}
	}

	const puntaje_obtenido: number = calcular_puntaje(materias);

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

interface MateriaElementos {
	puntaje: HTMLInputElement,
	porcentaje: HTMLInputElement
}

class Materia {
	elementos: MateriaElementos;

	constructor(input_puntaje: HTMLInputElement, input_porcentaje: HTMLInputElement) {
		this.elementos = {
			puntaje: input_puntaje,
			porcentaje: input_porcentaje
		};
	}

	get puntaje() {
		return clamp(Number(this.elementos.puntaje.value), 150, 850);
	}

	set puntaje(valor: number) {
		this.elementos.puntaje.value = String(clamp(valor, 150, 850));
	}

	get porcentaje(): number {
		return clamp(Number(this.elementos.porcentaje.value), 0, 100);
	}

	set porcentaje(valor: number) {
		this.elementos.porcentaje.value = String(clamp(valor, 0, 100));
	}
}

function obtener_inputs_de_materias(): Array<Materia> {
	const nombres_materias = ["nem", "ranking", "lenguaje", "matematicas", "ciencias"];
	const materias: Array<Materia> = [];
	for (let nombre of nombres_materias) {
		const input_puntaje =
			document.getElementById(`puntaje-${nombre}`) as HTMLInputElement;
		const input_porcentaje =
			document.getElementById(`porcentaje-${nombre}`) as HTMLInputElement;

		if (!input_puntaje || !input_porcentaje) {
			throw new Error(`Uno de los inputs de materia ${nombre} no existe`);
		}

		materias.push(new Materia(input_puntaje, input_porcentaje));
	}

	return materias;
}

const materias: Array<Materia> = obtener_inputs_de_materias();

// Más cercano a "de menos reciente a más reciente" al iniciar
// Para que al iterarlas para ajustar sus porcentajes vaya del último al primero
materias.reverse();

actualizar_puntaje(materias);

function clamp_input(input: HTMLInputElement, minimo: number, maximo: number): void {
	input.value = input.value.slice(0, 3);

	const valor = Number(input.value);
	if (valor !== 0) {
		input.value = String(valor);
	}

	if (input.value.length >= 3) {
		if (valor > maximo) {
			input.value = String(maximo);
		} else if (valor < minimo) {
			input.value = String(minimo);
		}
	}
}

for (let materia of materias) {
	const input_porcentaje = materia.elementos.porcentaje;
	const input_puntaje = materia.elementos.puntaje;
	input_porcentaje.addEventListener("input", (evento) => {
		materias.splice(materias.indexOf(materia), 1);
		materias.push(materia);
		clamp_input(input_porcentaje, 0, 100);
		actualizar_puntaje(materias);
	});

	input_puntaje.addEventListener("input", (evento) => {
		clamp_input(input_puntaje, 150, 850);
		actualizar_puntaje(materias);
	});
}
