import { oficinasempleo } from './oficinasempleo.js';
var oficinasempleosAll = oficinasempleo;


function mostrarOficinas(oficinas) {
    eliminar();
    
    var islaUsuario = document.rellenar.filtroisla.value; // Isla que escribio el usuario
    var muniUsuario = document.rellenar.filtromunicipio.value; // Municipio que escribio el usuario

    var islasReptidas = filtrar(islaUsuario, muniUsuario, oficinas);

    var islas = Array.from(new Set(islasReptidas));

    islas.forEach(isla => {
        idCss("section","isla");
        fichaDato(isla, "h1")
        var nodoh1 = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
        nodoh1.appendChild(createNode("hr","",[],[]));
        // Todas oficinas que pertenecen a la isla que escribio el usuario
        var oficinasIsla = "";
        if (!(muniUsuario == "")) {
            oficinasIsla = oficinas.filter(oficinas => oficinas.municipioTxt == muniUsuario);
        }
        else {
            oficinasIsla = oficinas.filter(oficinas => oficinas.islaTxt == isla);
        }

        // Municipios Repetidos
        var municipiosRepetidos = oficinasIsla.map(municipios => {
            return municipios.municipioTxt;
        });

        var municipios = Array.from(new Set(municipiosRepetidos));
        municipios.forEach(municipio => {
            idCss("article","municipio");
            fichaDato(municipio, "h2")
            // Todas las oficinas que pertenecen al municipio actual
            var oficinasMunic = oficinas.filter(oficinas => oficinas.municipioTxt == municipio);
            var ficha = oficinasMunic.map(nombre => {
                return nombre;
            });
            idCss("div","fichas")
            var nombre = Array.from(new Set(ficha));
            nombre.forEach(ficha => {
                idCss("div","ficha");
                fichaDato("Nombre", "h3");
                fichaDato("", "hr");
                fichaDato(ficha.oficina, "p");
                fichaDato("Dirección", "h3");
                fichaDato("", "hr");
                fichaDato(ficha.direccion, "p");
                fichaDato("Teléfono", "h3");
                fichaDato("", "hr");
                fichaDato(ficha.telefono, "p");

            })

        })

    });

}

function fichaDato(dato, etiqueta) {
    var elemento = document.createElement(etiqueta);
    var informacion ="";
    if(etiqueta == "h1"){
        if (isNaN(dato)) {
            dato = dato.toUpperCase();
            }
            var contenido = document.createTextNode(dato);
            elemento.appendChild(contenido);
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
    }
    if(etiqueta == "h2"){
        if (isNaN(dato)) {
            dato = dato.toUpperCase();
            }
            var contenido = document.createTextNode(dato);
            elemento.appendChild(contenido);
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.lastElementChild;
    }
    if((etiqueta == "h3") || (etiqueta == "hr") || (etiqueta == "p")){
        var contenido = document.createTextNode(dato);
            elemento.appendChild(contenido);
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
    }
    informacion.appendChild(elemento);

}

function idCss(etiqueta,nombreId) {
    var elemento = document.createElement(etiqueta);
    elemento.setAttribute("id", nombreId)
    var informacion ="";
    if(etiqueta == "section"){
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling;
    }
    if(etiqueta == "article"){
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
    }
    if(nombreId == "fichas"){
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.lastElementChild;
    }
    if(nombreId == "ficha"){
        informacion = document.body.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.lastElementChild.lastElementChild;
    }
    informacion.appendChild(elemento);
}

function filtrar(islaUsu, muniUsu, oficinas) {
    //Si el usuario no pulsa el boton o no escribe nada no filtra
    var islasRepetidas = "";
    if (!(muniUsu == "")) {
        var filtroIsla = oficinas.filter(oficinas => oficinas.municipioTxt == muniUsu);
        islasRepetidas = filtroIsla.map(islas => {
            return islas.islaTxt
        });
    }
    else {
        if (!(islaUsu == "")) {
            var filtroIsla = oficinas.filter(oficinas => oficinas.islaTxt == islaUsu);
            islasRepetidas = filtroIsla.map(islas => {
                return islas.islaTxt
            });
        }
        else {
            islasRepetidas = oficinas.map(islas => {
                return islas.islaTxt
            });
        }


    }
    return islasRepetidas;
}

function createNode(nodeName, nodeText, nodeClasses, nodeAttributes) {
    var node = document.createElement(nodeName);
    if (nodeText != "") {
        var textNode = document.createTextNode(nodeText);
        node.appendChild(textNode);
    }

    if (nodeClasses.length > 0) {
        nodeClasses.forEach(nodeClass => node.classList.add(nodeClass));
    }
    if (nodeAttributes.length > 0) {
        nodeAttributes.forEach(nodeAttribute => node.setAttribute(nodeAttribute.name, nodeAttribute.value))
    }
    return node;
}

function cancelar(){
    window.onload = mostrarOficinas(oficinasempleosAll);
}

function eliminar() {
    document.body.firstElementChild.nextElementSibling.nextElementSibling.innerHTML ='';
}

window.onload = mostrarOficinas(oficinasempleosAll);
document.rellenar.filtrado.addEventListener("click", main);
document.rellenar.cancelado.addEventListener("click", cancelar);
function main() {
    mostrarOficinas(oficinasempleosAll);
}



