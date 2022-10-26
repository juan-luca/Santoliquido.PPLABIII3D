function crearCabecera(row){

const cabecera = document.createElement("thead");
const tr = document.createElement("tr");


for (const key in row) {
    if(key!="id")
    {
        const th= document.createElement("th");
        th.textContent = key;
        th.classList.add("columnas");
        tr.appendChild(th);
    }
    
        
    
}

cabecera.appendChild(tr);
cabecera.classList.add("cabecera");
return cabecera;
}

function crearCuerpo(data){

    const cuerpo = document.createElement("tbody");

    data.forEach((element) => {
        const fila = document.createElement("tr");
        for (const atributo in element) {
            if(atributo==="id")
            {
                fila.setAttribute("data-id",element[atributo]);
                continue;
            }
            
            const td= document.createElement("td");
                td.textContent = element[atributo];
                td.classList.add("columnas");
                fila.appendChild(td);
                fila.classList.add("puntero");
                
            
        }


        const filas = cuerpo.children;

        for(let i=0; i< filas.length ; i++)
        {
            if (!(i%2)) {
                filas[i].classList.add("gris");
            }
        }

        cuerpo.appendChild(fila);
        cuerpo.classList.add("cuerpo");

    });
    return cuerpo;
    
}

export function crearTabla(data){
    if(!Array.isArray(data)){
        return null;
    }

    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));
    tabla.classList.add("tabla");



    return tabla;
    
}