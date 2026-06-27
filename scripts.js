/*==================================================
    CREDYCASH JGL EXPRESS
    SCRIPT.JS - PARTE 1
===================================================*/

const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
});

/*=========================================
            INICIALIZACIÓN
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    calcularCredito();

    const valor = document.getElementById("valor");
    const interes = document.getElementById("interes");
    const plazo = document.getElementById("plazo");

    if(valor){
        valor.addEventListener("input", calcularCredito);
    }

    if(interes){
        interes.addEventListener("input", calcularCredito);
    }

    if(plazo){
        plazo.addEventListener("input", calcularCredito);
    }

});


/*=========================================
        OBTENER VALOR NUMÉRICO
=========================================*/

function numero(id){

    const valor = document.getElementById(id);

    if(!valor) return 0;

    return parseFloat(valor.value) || 0;

}


/*=========================================
          FORMATEAR MONEDA
=========================================*/

function dinero(numeroValor){

    return formatoCOP.format(numeroValor);

}


/*=========================================
        VALIDAR CAMPOS OBLIGATORIOS
=========================================*/

function validarFormulario(){

    const obligatorios = [

        "nombres",
        "apellidos",
        "cedula",
        "telefono",
        "direccion",
        "empresa",
        "direccionEmpresa",
        "valor"

    ];

    let correcto = true;

    obligatorios.forEach(id=>{

        const campo = document.getElementById(id);

        if(!campo) return;

        if(campo.value.trim()===""){

            campo.style.borderColor="#ef4444";
            correcto=false;

        }else{

            campo.style.borderColor="#22c55e";

        }

    });

    return correcto;

}


/*=========================================
        CALCULAR CRÉDITO
=========================================*/

function calcularCredito(){

    const valor = numero("valor");

    const interes = numero("interes");

    const plazo = numero("plazo");

    const valorInteres = valor * interes / 100;

    const total = valor + valorInteres;

    let cuotaDiaria = 0;
    let cuotaSemanal = 0;
    let cuotaQuincenal = 0;
    let cuotaMensual = 0;

    if(plazo>0){

        cuotaDiaria = total/plazo;

    }

    cuotaSemanal = total/4;

    cuotaQuincenal = total/2;

    cuotaMensual = total;

    actualizarResumen({

        valor,

        interes,

        valorInteres,

        total,

        plazo,

        cuotaDiaria,

        cuotaSemanal,

        cuotaQuincenal,

        cuotaMensual

    });

}


/*=========================================
        ACTUALIZAR RESUMEN
=========================================*/

function actualizarResumen(datos){

    cambiarTexto("valorSolicitado", dinero(datos.valor));

    cambiarTexto("valorInteres", dinero(datos.valorInteres));

    cambiarTexto("valorTotal", dinero(datos.total));

    cambiarTexto("plazoTexto", datos.plazo + " días");

    cambiarTexto("cuotaDiaria", dinero(datos.cuotaDiaria));

    cambiarTexto("cuotaSemanal", dinero(datos.cuotaSemanal));

    cambiarTexto("cuotaQuincenal", dinero(datos.cuotaQuincenal));

    cambiarTexto("cuotaMensual", dinero(datos.cuotaMensual));

}


/*=========================================
        CAMBIAR TEXTO HTML
=========================================*/

function cambiarTexto(id,texto){

    const elemento=document.getElementById(id);

    if(elemento){

        elemento.innerHTML=texto;

    }

}


/*=========================================
        LIMPIAR FORMULARIO
=========================================*/

function limpiarFormulario(){

    document.querySelectorAll("input").forEach(campo=>{

        if(campo.type==="number"){

            campo.value="";

        }else{

            campo.value="";

        }

    });

    document.getElementById("interes").value=30;

    document.getElementById("plazo").value=15;

    calcularCredito();

}


/*=========================================
        OBTENER DATOS
=========================================*/

function obtenerDatos(){

    return{

        nombres:document.getElementById("nombres").value,

        apellidos:document.getElementById("apellidos").value,

        cedula:document.getElementById("cedula").value,

        telefono:document.getElementById("telefono").value,

        direccion:document.getElementById("direccion").value,

        empresa:document.getElementById("empresa").value,

        direccionEmpresa:document.getElementById("direccionEmpresa").value,

        valor:numero("valor"),

        interes:numero("interes"),

        plazo:numero("plazo")

    };

}