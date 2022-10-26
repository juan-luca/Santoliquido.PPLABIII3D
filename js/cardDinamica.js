const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
if (avisos.length != 0) {
    
    crearCarta(avisos);
}


function crearCarta(avisos) {


    const $cardContainer = document.querySelector("[name=cardContainer]");
    //incimos el ciclo por cada objeto del array

    avisos.forEach((aviso, index) => {
        //se crea el articulo que va a contener toda la carta
        const $articulo = document.createElement("article");
        $articulo.classList.add("card");

        // se crea el div que va a contener el ttulo, descripcion, precio y especs
        const $divBody = document.createElement("div");
        $divBody.classList.add("cardBody");
        $articulo.appendChild($divBody);


        //titulo

        const $titulo = document.createElement("h3");
        $titulo.textContent = aviso.titulo;
        $divBody.appendChild($titulo);


        //descripcion
        const $descripcion = document.createElement("p");
        $descripcion.classList.add("pDescripcion");
        $descripcion.textContent = aviso.descripcion;
        $divBody.appendChild($descripcion);
        //precio
        const $precio = document.createElement("p");
        $precio.classList.add("pPrecio");
        $precio.textContent = "$"+aviso.precio;
        $divBody.appendChild($precio);


        // se crea el div que va a contener las especificaciones
        const $divEspec = document.createElement("div");
        $divEspec.classList.add("divEspec");
        $divBody.appendChild($divEspec);
        //especificaciones


        //divPuertas
        const $divPuertas = document.createElement("div");
        $divPuertas.classList.add("divIco");
        $divEspec.appendChild($divPuertas);


        //img puerta + texto
        const $imgPuertas = document.createElement("img");
        $imgPuertas.classList.add("ico");
        $imgPuertas.setAttribute("src", "./img/puerta.png");
        $imgPuertas.setAttribute("alt", "icono_puertas");
        $divPuertas.appendChild($imgPuertas);
        const $cantPuertas = document.createElement("p");
        $cantPuertas.classList.add("textoIco");
        $cantPuertas.textContent = aviso.puertas+" puertas";
        $divPuertas.appendChild($cantPuertas);



        //divKms
        const $divKms = document.createElement("div");
        $divKms.classList.add("divIco");
        $divEspec.appendChild($divKms);

        //img kms + texto
        const $imgKms = document.createElement("img");
        $imgKms.classList.add("ico");
        $imgKms.setAttribute("src", "./img/velocimetro.png");
        $imgKms.setAttribute("alt", "icono_kms");
        $divKms.appendChild($imgKms);
        const $cantKms = document.createElement("p");
        $cantKms.classList.add("textoIco");
        $cantKms.textContent = aviso.kms+" kms";
        $divKms.appendChild($cantKms);


        //divPotencia
        const $divPotencia = document.createElement("div");
        $divPotencia.classList.add("divIco");
        $divEspec.appendChild($divPotencia);

        //img potencia + texto
        const $imgPotencia = document.createElement("img");
        $imgPotencia.classList.add("ico");
        $imgPotencia.setAttribute("src", "./img/potencia.png");
        $imgPotencia.setAttribute("alt", "icono_potencia");
        $divPotencia.appendChild($imgPotencia);
        const $Potencia = document.createElement("p");
        $Potencia.classList.add("textoIco");
        $Potencia.textContent = aviso.potencia + " hp";
        $divPotencia.appendChild($Potencia);

        const $divBtn = document.createElement("div");
        $divBtn.classList.add("divBtn");
        $divBody.appendChild($divBtn);

        const $boton = document.createElement("input");
        $boton.setAttribute("type", "button");
        $boton.setAttribute("name", "btnAviso");
        $boton.setAttribute("value", "Ver aviso");
        $boton.classList.add("btn-orange");
        $divBtn.appendChild($boton);

        $cardContainer.appendChild($articulo);
    });
}