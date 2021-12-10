function calcular_puntaje(puntajes, porcentajes) {
  let puntaje_final = 0;
  for (let i = 0; i < Math.min(puntajes.length, porcentajes.length); i++) {
    puntaje_final += puntajes[i] * porcentajes[i] / 100;
  }
  return puntaje_final;
}
function actualizar_puntaje() {
  const inputs_porcentajes = document.querySelectorAll(".porcentajes input");
  const inputs_puntajes = document.querySelectorAll(".puntajes input");
  const puntaje_obtenido = calcular_puntaje([...inputs_porcentajes].map((elemento) => Number(elemento.value)), [...inputs_puntajes].map((elemento) => Number(elemento.value)));
  const salida = document.getElementById("puntaje-obtenido");
  if (!salida) {
    throw new Error("Elemento #puntaje-obtenido no existe");
  }
  salida.innerText = String(puntaje_obtenido);
}
document.body.addEventListener("input", (evento) => {
  const elemento = evento.target;
  elemento.value = elemento.value.slice(0, 3);
  const valor = Number(elemento.value);
  if (valor !== 0) {
    elemento.value = String(valor);
  }
  if (elemento.value.length < 3)
    return;
  let clasesParent;
  if (!elemento.parentElement || !(clasesParent = Array.from(elemento.parentElement.classList))) {
    throw new Error(`${elemento} no tiene parents`);
  }
  let maximo, minimo;
  if (clasesParent.includes("puntajes")) {
    maximo = 850;
    minimo = 150;
  } else {
    maximo = 100;
    minimo = 0;
  }
  if (valor > maximo) {
    elemento.value = String(Math.min(valor, maximo));
  } else if (valor < minimo) {
    elemento.value = String(minimo);
  }
});
document.body.addEventListener("input", actualizar_puntaje);
const inputs_porcentaje_recientes = new Set(document.querySelectorAll(".porcentajes input"));
actualizar_puntaje();
