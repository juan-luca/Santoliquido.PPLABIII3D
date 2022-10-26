import { avisos } from "./app.js";
export class Aviso {
    


    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo=titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        
    }


    static generarId() {
        
        if (JSON.parse(localStorage.getItem("avisos"))) {
            const last = avisos[avisos.length - 1].id;
            return last + 1
        } else {
            return 1;
        }

    }

    ModficarAviso() {
        
        const itemAModificar = avisos.find(item=>item.id == this.id);
        itemAModificar.titulo=this.titulo;
        itemAModificar.transaccion=this.transaccion;
        itemAModificar.descripcion=this.descripcion;
        itemAModificar.precio=this.precio;
        itemAModificar.puertas=this.puertas;
        itemAModificar.kms=this.kms;
        itemAModificar.potencia=this.potencia;
        localStorage.setItem("avisos", JSON.stringify(avisos));
        
     }
     EliminarAviso() {
        
        const itemAModificar = avisos.find(item=>item.id == this.id);
        const index =avisos.indexOf(itemAModificar);
        
        avisos.splice(index,1);
       
        
        localStorage.setItem("avisos", JSON.stringify(avisos));
        
     }

     agregarAviso() {
           avisos.push(this);
           localStorage.setItem("avisos", JSON.stringify(avisos));
     }

     static buscarAviso(id) {
        let ret = 0;
        if (localStorage.getItem("avisos")) {
           JSON.parse(localStorage.getItem("avisos")).forEach((element) => {
              if (element.id == id) {
                 ret = element;
              }
           });
           return ret;
        }
     }
}