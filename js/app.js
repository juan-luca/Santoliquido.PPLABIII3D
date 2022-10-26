
import { crearTabla } from './tablaDinamica.js'
import { avisoAuto } from './avisoAuto.js'
import { validarCampoVacio, validarSoloNumeros, validarCamposVaciosClick, validarCantPuertas, validarClases, validarCantKms, validarPotencia, clearError } from './validaciones.js';


export const avisos = [];

const $frmAviso = document.forms[0];
const $divTabla = document.querySelector(".divTabla");
const id = document.querySelector("[name=id]");
const titulo = document.querySelector("[name=titulo]");
const rdVenta = document.querySelector("[id=rdVenta]");
const rdAlquiler = document.querySelector("[id=rdAlquiler]");
const descripcion = document.querySelector("[name=descripcion]");
const precio = document.querySelector("[name=precio]");
const puertas = document.querySelector("[name=puertas]");
const kms = document.querySelector("[name=kms]");
const transaccion = document.querySelector("[name=transaccion]");
const potencia = document.querySelector("[name=potencia]");
const btnModificar = document.querySelector("[name=btnModificar]");
const btnCancelar = document.querySelector("[name=btnCancelar]");
const btnGuardar = document.querySelector("[name=btnGuardar]");
const btnEliminar = document.querySelector("[name=btnEliminar]");
const spiner = document.querySelector("[name=spiner]");
const controles = $frmAviso.elements;

actualizarTabla();


$divTabla.addEventListener("click", (e) => {

   const emisor = e.target;
   let flag = 1;
   if (emisor.matches("tbody tr td")) {
      let id = emisor.parentElement.dataset.id;
      const aviso = avisoAuto.buscarAviso(id);
      cargando();
      rellenarCamposConAviso(aviso);
   }
   validarCamposVaciosClick(controles);
});



btnModificar.addEventListener("click", (e) => {
   e.preventDefault();
   if (validarClases(controles) != 1) {
      if (validarCamposVaciosClick(controles) != 1) {
         const aviso = new avisoAuto(id.value, titulo.value, $frmAviso.transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);
         if (window.confirm("Esta seguro de modificar el vehiculo "+aviso.titulo+"?")) {
         cargando();
         aviso.ModficarAviso();
         limpiarCampos();
         actualizarTabla();
      }
      }

   }
})

btnEliminar.addEventListener("click", (e) => {
   e.preventDefault();

   const aviso = new avisoAuto(id.value, titulo.value, $frmAviso.transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);
   if (window.confirm("Esta seguro de eliminar el vehiculo "+aviso.titulo+"?")) {
      cargando();
      aviso.EliminarAviso();
      limpiarCampos();
      actualizarTabla();
   }

})



btnCancelar.addEventListener("click", (e) => {
   cargando();

   e.preventDefault();
   limpiarCampos();
})

btnGuardar.addEventListener("click", (e) => {
   e.preventDefault();

   if (validarClases(controles) != 1) {
      if (validarCamposVaciosClick(controles) != 1) {

         const nuevoAviso = new avisoAuto(avisoAuto.generarId(), titulo.value, $frmAviso.transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);
         cargando();
         nuevoAviso.agregarAviso();

         limpiarCampos();
      }


   }
   actualizarTabla();


})


titulo.addEventListener("blur", validarCampoVacio);
descripcion.addEventListener("blur", validarCampoVacio);
precio.addEventListener("blur", validarCampoVacio);
puertas.addEventListener("blur", validarCampoVacio);
kms.addEventListener("blur", validarCampoVacio);
potencia.addEventListener("blur", validarCampoVacio);

precio.addEventListener('keypress', validarSoloNumeros);
puertas.addEventListener('keypress', validarSoloNumeros);
kms.addEventListener('keypress', validarSoloNumeros);
potencia.addEventListener('keypress', validarSoloNumeros);


puertas.addEventListener('blur', validarCantPuertas);
kms.addEventListener('blur', validarCantKms);
potencia.addEventListener('blur', validarPotencia);




function actualizarTabla() {
   if (localStorage.getItem("avisos")) {
      if (avisos.length == 0) {
         JSON.parse(localStorage.getItem("avisos")).forEach((element) => {
            avisos.push(element);
         });
      }

      while ($divTabla.hasChildNodes()) {
         $divTabla.removeChild($divTabla.firstChild);
      }
      $divTabla.appendChild(crearTabla(JSON.parse(localStorage.getItem("avisos"))));
   }


}


function limpiarCampos() {

   for (const control of controles) {
      if (control.type == "text" || control.name == "id") {
         control.value = "";
         clearError(control);

      } else if (control.name == "transaccion") {
         rdVenta.checked = true;
         rdAlquiler.checked = false;
      }
   }
   console.log(id);
   validarBotonesOcultos();
}

function rellenarCamposConAviso(aviso) {
   titulo.value = aviso.titulo;

   if (aviso.transaccion == "Venta") {
      rdVenta.checked = true;
      rdAlquiler.checked = false;
   } else {
      rdVenta.checked = false;
      rdAlquiler.checked = true;
   }
   
   descripcion.value = aviso.descripcion;
   precio.value = aviso.precio;
   puertas.value = aviso.puertas;
   kms.value = aviso.kms;
   potencia.value = aviso.potencia;
   id.value = aviso.id;
   validarBotonesOcultos();
   foco(titulo);
}


function validarBotonesOcultos() {
   if (id.value != 0) {
      btnCancelar.setAttribute("type", "button");
      btnEliminar.setAttribute("type", "button");
      btnModificar.setAttribute("type", "button");
      btnGuardar.setAttribute("type", "hidden");
   } else {
      btnEliminar.setAttribute("type", "hidden");
      btnCancelar.setAttribute("type", "hidden");
      btnModificar.setAttribute("type", "hidden");
      btnGuardar.setAttribute("type", "submit");
   }
}

function foco(elemento) {
   elemento.focus();
}

function cargando() {
   spiner.classList.remove("oculto");
   spiner.classList.add("loader");

   setTimeout(() => {
      spiner.classList.remove("loader");
      spiner.classList.add("oculto");
   }, 3000);
}



