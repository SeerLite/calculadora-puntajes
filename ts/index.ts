import "virtual:windi.css"
import "../css/styles.css"

function clamp(input: number, min: number, max: number): number {
	return Math.min(Math.max(input, min), max);
}

function destacar(elemento: HTMLElement) {
	const color_destacado = ["bg-gray-400", "text-green-900"];
	elemento.classList.add(...color_destacado);
	setTimeout(() => elemento.classList.remove(...color_destacado), 150);
}

function calcular_puntaje(materias: Array<Materia>): number {
	let puntaje_final = 0;
	for (const materia of materias) {
		puntaje_final += materia.puntaje * materia.porcentaje / 100;
	}
	return puntaje_final;
}

function actualizar_puntaje(materias: Array<Materia>): void {
	for (const materia of materias) {
		const diferencia = 100 - materias.reduce((acc, materia) => acc + materia.porcentaje, 0);
		if (diferencia >= 0 || materia.porcentaje + diferencia >= 0) {
			materia.porcentaje += diferencia;
			break;
		} else {
			materia.porcentaje = 0;
		}
	}

	const puntaje_obtenido: number = calcular_puntaje(materias);

	const salida = document.getElementById("puntaje-ponderado");
	if (!salida) {
		throw new Error("Elemento #puntaje-ponderado no existe");
	}

	const puntaje_obtenido_str = String(Math.floor(puntaje_obtenido * 10) / 10);
	if (salida.innerText !== puntaje_obtenido_str) {
		salida.innerText = puntaje_obtenido_str;
		destacar(salida);
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
		const valor_str = String(clamp(valor, 150, 850));
		if (this.elementos.puntaje.value !== valor_str) {
			this.elementos.puntaje.value = valor_str;
			destacar(this.elementos.puntaje);
		}
	}

	clamp_puntaje() {
		this.puntaje = this.puntaje;
	}

	get porcentaje(): number {
		return clamp(Number(this.elementos.porcentaje.value), 0, 100);
	}

	set porcentaje(valor: number) {
		const valor_str = String(clamp(valor, 0, 100));
		if (this.elementos.porcentaje.value !== valor_str) {
			this.elementos.porcentaje.value = valor_str;
			destacar(this.elementos.porcentaje);
		}
	}

	clamp_porcentaje() {
		this.porcentaje = this.porcentaje;
	}
}

function obtener_inputs_de_materias(): Array<Materia> {
	const nombres_materias = ["nem", "ranking", "lenguaje", "matematicas", "ciencias"];
	const materias: Array<Materia> = [];
	for (const nombre of nombres_materias) {
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

for (const materia of materias) {
	const input_porcentaje = materia.elementos.porcentaje;
	const input_puntaje = materia.elementos.puntaje;

	input_porcentaje.addEventListener("focus", input_porcentaje.select);

	input_porcentaje.addEventListener("input", (evento) => {
		materias.splice(materias.indexOf(materia), 1);
		materias.push(materia);

		input_porcentaje.value = input_porcentaje.value.slice(0, 3);
		if (input_porcentaje.value.length >= 3) {
			materia.clamp_porcentaje();
		}
		actualizar_puntaje(materias);
	});

	input_porcentaje.addEventListener("blur", (evento) => {
		materia.clamp_porcentaje();
	});

	input_puntaje.addEventListener("focus", input_puntaje.select);

	input_puntaje.addEventListener("input", (evento) => {
		input_puntaje.value = input_puntaje.value.slice(0, 3);
		if (input_puntaje.value.length >= 3) {
			materia.clamp_puntaje();
		}
		actualizar_puntaje(materias);
	});

	input_puntaje.addEventListener("blur", (evento) => {
		materia.clamp_puntaje();
	});
}
