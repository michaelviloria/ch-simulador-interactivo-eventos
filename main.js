class Zapato {
	constructor(id, nombre, precio, cantidad) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.cantidad = cantidad;
	}
	seleccion() {
		this.seleccionado = true;
	}
}
const Zapatos = [
	new Zapato(01, "Nike Air Force 1", 374227, 30),
	new Zapato(02, "Reebok Ztaur Run", 239990, 20),
	new Zapato(03, "Multicolor Puma Future Rider Play On", 343900, 25),
	new Zapato(04, "Adidas FluidFlow", 296991, 15)
];

const productosContenedor = document.getElementById("productContainer");
const productosSeleccionados = document.getElementById("selectContainer");
const formulario = document.getElementById("form");
const btnSubmit = document.getElementById("submit");

btnSubmit.addEventListener("click", e => {
	e.preventDefault();
	validarValorInput();
});

function agregarProductosStock(cantidadRestar = [0,0,0,0]) {
	if (productosContenedor.childNodes.length > 0) {
		do {
			productosContenedor.removeChild(productosContenedor.firstChild);
		} while (productosContenedor.childNodes.length > 0);
	}
	for (let i = 0; i < Zapatos.length; i++) {
		let contenedor = document.createElement("li");
		contenedor.className = "product-item";
		contenedor.innerHTML = `<h2>${Zapatos[i].nombre}</h2><div><b>$${Zapatos[i].precio}</b><span>cantidad: ${Zapatos[i].cantidad - cantidadRestar[i]}</span></div>`;
		productosContenedor.append(contenedor);
	}
}
agregarProductosStock();

Zapatos.forEach(zapato => {
	const mensajeInput = document.createElement("label");
	const inputElemento = document.createElement("input");
	mensajeInput.innerText = `Escribe una cantidad para el producto: ${zapato.nombre}`;
	inputElemento.className = "input-product";
	inputElemento.setAttribute("type", "number");
	formulario.insertBefore(mensajeInput, btnSubmit);
	formulario.insertBefore(inputElemento, btnSubmit);
});

function validarValorInput() {
	const inputs = formulario.getElementsByClassName("input-product");
	const cantidadProductos = [];
	for (let i = 0; i < inputs.length; i++) {
		let inputsValores = parseInt(inputs[i].value);
		if (!isNaN(inputsValores)) {
			if (inputsValores <= Zapatos[i].cantidad) {
				inputs[i].classList.remove("error");
				inputs[i].classList.add("selected");
				cantidadProductos.push(inputsValores);
			} else {
				inputs[i].classList.remove("selected")
				inputs[i].classList.add("error");
				cantidadProductos.push(0);
			}
		} else {
			inputs[i].classList.remove("selected")
			inputs[i].classList.add("error");
			cantidadProductos.push(0);
		}
	}
	agregarProductosSeleccionados(cantidadProductos);
}

function agregarProductosSeleccionados(arrayCantidad) {
	if (productosSeleccionados.childNodes.length > 0) {
		do {
			productosSeleccionados.removeChild(productosSeleccionados.firstChild);
		} while (productosSeleccionados.childNodes.length > 0);
	}
	for (let i = 0; i < arrayCantidad.length; i++) {
		if (arrayCantidad[i] > 0) {
			let contenedor = document.createElement("li");
			contenedor.className = "product-item";
			contenedor.innerHTML = `<h2>${Zapatos[i].nombre}</h2><div><b>$${Zapatos[i].precio}</b><span>cantidad: ${arrayCantidad[i]}</span></div>`;
			productosSeleccionados.append(contenedor);
		}
	}
	agregarProductosStock(arrayCantidad);
}