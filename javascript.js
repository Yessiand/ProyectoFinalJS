emailjs.init('YufpKr7nll0HWSYU8');
//REGISTRO PARA EL TEST//
formulario.addEventListener("submit", validarFormulario);

/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funcion usada para validar el formulario de registro
 * args: 
 * - event: evento usado para lanzar la validacion.
 */
function validarFormulario(event) {
    event.preventDefault();
    // Se inicializan las variables que contendran los objetos del formulario HTML
    let nombreRegistro = document.querySelector("#nombre");
    let emailRegistro = document.querySelector("#email");
    let mensajeRegistro = document.querySelector("#mensaje");

    // Se guardan los valores de los objetos HTML en un objeto JS
    const registro = {
        nombre: nombreRegistro.value,
        email: emailRegistro.value,
        mensaje: mensajeRegistro.value,
    }

    // Se accede a los valores del objeto y se muestra un mensaje por pantalla
    const { nombre, email, mensaje } = registro;
    console.log(nombre + " - " + email + " - " + mensaje);

    Swal.fire({
        title: 'Desea guardar la informacion?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
    }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma que desea enviar la informacion suministrada en el formulario, se desencadena la logica
            // Se busca en el LocalStorage si existe un elemento guardado usando como llave el email unico.
            let objetoRegistroDecodificado = JSON.parse(localStorage.getItem(registro.email));
            if (objetoRegistroDecodificado == null) { // Si no encuentra un elemento, deja que el usuario se registe y realice el test
                console.log(objetoRegistroDecodificado);
                // Se codifica el objeto como un JSON String y se almacena en el LocalStorage
                const objetoRegistroComoJsonString = JSON.stringify(registro);
                localStorage.setItem(registro.email, objetoRegistroComoJsonString);
                
                // Se crea la configuracion para consumir la API de EmailJS
                const serviceID = 'default_service';
                const templateID = 'template_g8vo2kk';

                // Se consume la API de EmailJS para enviar la informacion de registro al corre asignado.
                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        Swal.fire('Guardado!', '', 'success')
                            .then((resultado) => {
                                if (resultado.isConfirmed) {
                                    renderizarTest();
                                }
                            });
                    }, (err) => {
                        Swal.fire('Informaci??n no guardada.', '', 'info')
                        console.log(JSON.stringify(err));
                    });

            } else { // Si encontro un elemento, es porque el usuario ya estaba registrado y habia presentado el test.
                Swal.fire('Su test ya fue presentado, no se puede presentar mas veces', '', 'error')
            }

        } else if (result.isDenied) { // Sino, le da la opcion de que corrija el formulario.
            Swal.fire('Informaci??n no guardada.', '', 'info')
        }
    })
}

let intervalTime = null;
//CONTADOR DE TIEMPO//
/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funcion usada iniciar el contador regresivo
 * args: 
 * - duration: Tiempo limite que tendra el contador
 * - display: imprime los minutos y segundos que van pasando.
 */
function startTimer(duration, display) {
    let timer = duration,
        minutes,
        seconds;
    intervalTime = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 5 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer == 0) {
            Swal.fire({
                title: 'El tiempo ha terminado!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            clearInterval(intervalTime);
            mostrarResultado();
        } else if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funcion usada iniciar el contador y renderizar el test
 * args: N/A
 */
function iniciarTest() {
    mostrarTest();
    let fiveMinutes = 299,
        display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
}

//SIMULADOR DE PREGUNTAS//
const contenedor = document.getElementById("test");
// const botonRes = document.getElementById("boton");
const resultadoTest = document.getElementById("resultado");

const preguntas = [
    {
        pregunta: "1. Patron relacional entre tres elementos de un sistema.",
        respuestas: {
            A: "Triangulaci??n",
            B: "Sistema familiar",
            C: "Conflicto familiar",
        },
        respuestaCorrecta: "a",
    },
    {
        pregunta: "2. La familia nuclear es la familia conviviente formada por los miembros de un solo n??cleo familiar, el grupo formado por los padres y sus hijos.",
        respuestas: {
            A: "Familia monoparental",
            B: "Familia nuclear",
            C: "Familia de origen",
        },
        respuestaCorrecta: "b",
    },
    {
        pregunta: "3.Los fen??menos mentales reflejan fen??menos sociales, es decir el pensamiento no es ??nicamente una masa cerebral compuesto por neuronas, sino que, es el producto de un juego de estructuras interpersonales y relacionales en un contexto familiar o social particular.",
        respuestas: {
            A: "Individualizmo ",
            B: "Socialismo familiar",
            C: "La mente es social",
        },
        respuestaCorrecta: "c",
    },
    {
        pregunta: "4. Es la instituci??n m??s antigua y resistente de todos los grupos humanos, aunque ha ido variando tanto en sus funciones como en su estructura a lo largo de la historia",
        respuestas: {
            A: "Iglesia",
            B: "Escuela",
            C: "Familia",
        },
        respuestaCorrecta: "c",
    },
    {
        pregunta: "5. Interviene en los problemas que presentan los individuos, las parejas, las familias y los grupos de inmigrantes, abordando la influencia que tienen tanto los aspectos individuales como los culturales, sociales, econ??micos, pol??ticos y jur??dicos en la aparici??n de los mismos y en su resoluci??n",
        respuestas: {
            A: "Psicoterapia transcultural ecosist??mica",
            B: "Psicoterapia transgeneracional",
            C: "Terapia centrada en la familia",
        },
        respuestaCorrecta: "a",
    },
    {
        pregunta: "6. Seleccione cuales son los limites en la teor??a sist??mica",
        respuestas: {
            A: "Se clasifican en: Rigidos, flexibles y borrosos",
            B: "De acuerdo al funcionamiento del sistema familiar son: Din??micos o estables",
            C: "Son variados de acuerdo a la constituci??n estructural de la familia, no teniendo un patr??n uniforme",
        },
        respuestaCorrecta: "a",
    },
    {
        pregunta: "7. Cuales son los fundamentos te??ricos de la Terapia Familiar Sistemica",
        respuestas: {
            A: "El psicoanalisis aporta la fundamentaci??n del desarrollo por motivaci??n",
            B: "Pavlov es uno de los principales referentes en el campo de la teor??a comunicacional",
            C: "Sus principios elementales se basan en la teoria general de los sistemas, las ciencias de la comunicaci??n, la cibernetica, las matematicas",
        },
        respuestaCorrecta: "c",
    },
    {
        pregunta: "8. La Teoria Familiar Sistemica entiende que",
        respuestas: {
            A: "Las familias se organizan de acuerdo a dos instancias, la legislativa y la ejecutiva",
            B: "Las familias se organizan en subsistemas, integrados por 2 o mas personas, unidos por rasgos comunes permanentes o moviles",
            C: "Algunas familias tienen subsistemas, que s??lo est??n integrados por personas de diferentes generaciones",
        },
        respuestaCorrecta: "b",
    },
    {
        pregunta: "9. La estabilidad o satisfacci??n de la familia est?? centrada en la realizaci??n de actividades colectivas, de todo el grupo, produciendo dificultades en la individuaci??n de sus miembros sin tomar en cuenta las necesidades personales o privadas de estos, seleccione a que tipo de estructura familiar pertenece",
        respuestas: {
            A: "Familia rigida",
            B: "Familia sobreprotectora",
            C: "Familia amalgamada",
        },
        respuestaCorrecta: "c",
    },
];

/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funcion usada para crear las preguntas y las respuestas del test
 * args: 
 * - respuestasPregunta: posibles opciones de respuestas correctas a la pregunta
 * - numeroDePregunta: identificador de la pregunta actual que contendra las respuestas
 */
function imprimirOpcionRespuesta(respuestasPregunta, numeroDePregunta) {
    const respuestas = [];
    Object.entries(respuestasPregunta).forEach(entry => {
        const [key, value] = entry;
        respuestas.push(`<label>
        <input  type="radio" name="${numeroDePregunta}" value="${key}"/>
        ${key} : ${value} 
    </label>`);
    });
    return respuestas;
}

/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funcion usada para imprimir las preguntas y las respuestas del test
 * args: N/A
 */
function mostrarTest() {
    const preguntasYrespuestas = [];

    preguntas.forEach((preguntaActual, numeroDePregunta) => {
        const respuestasPregunta = { ...preguntaActual.respuestas };
        const respuestasImpresas = imprimirOpcionRespuesta(respuestasPregunta, numeroDePregunta);
        preguntasYrespuestas.push(
            `<div class="cuestion" >${preguntaActual.pregunta}</div>
            <div class= "respuestas"> ${respuestasImpresas.join("<br>")} </div>
            <br>
            `
        );
    });

    contenedor.innerHTML = preguntasYrespuestas.join("");

    let botonComprobarTest = document.getElementById("botonFisicoComprobar");
    console.log(botonComprobarTest);

    if (botonComprobarTest == null) {
        botonComprobarTest = document.createElement("button");
        botonComprobarTest.innerText = "Comprobar";
        botonComprobarTest.type = "button";
        botonComprobarTest.classList.add("boton");
        botonComprobarTest.id = "botonFisicoComprobar";
        botonComprobarTest.addEventListener("click", mostrarResultado);

        let divBotonComprobar = document.getElementById("botonComprobar");

        divBotonComprobar.appendChild(botonComprobarTest);
    }
}

/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funcion usada para crear los elementos del Test cuando el usuario esta habilitado para realizarlo.
 * args: N/A
 */
function renderizarTest() {
    // Se obtiene el objeto del div Padre en donde se a??adiran los elementos del test
    let divPadre = document.getElementById("renderizarTest");

    // Se crea el div que contendra la informacion del test
    let divIniciarTest = document.createElement("div");
    let parrafoIndicativo = document.createElement("p");

    let textoParrafoIndicativo = document.createTextNode("Pincha el boton comenzar test");
    parrafoIndicativo.appendChild(textoParrafoIndicativo);

    // Se crea el boton que iniciara el test
    let botonComenzarTest = document.createElement("button");
    botonComenzarTest.innerText = "Comenzar el test";
    botonComenzarTest.type = "button";
    botonComenzarTest.id = "botonComenzarTest";
    botonComenzarTest.classList.add("boton");
    botonComenzarTest.addEventListener("click", iniciarTest);

    // Se crea el div que contendra las respuestas acertads
    let divRespuestaAcertada = document.createElement("div");
    divRespuestaAcertada.id = "respuestaAcertada";

    // Se a??aden los elementos hijos al div padre que inicia el test
    divIniciarTest.appendChild(parrafoIndicativo);
    divIniciarTest.appendChild(botonComenzarTest);
    divIniciarTest.appendChild(divRespuestaAcertada);

    divPadre.appendChild(divIniciarTest);

    let divTimer = document.createElement("div");
    let divParrafoTimer = document.createElement("div");
    divParrafoTimer.classList.add("parrafo");

    //Usando funci??n para insertar elementos HTML sin necesidad de crearlos, manipulando en que espacio del elemento se crearan
    divParrafoTimer.insertAdjacentHTML(
        'beforeend',
        'El test termina en <span id="time">05:00</span> minutos!',
    );

    divTimer.appendChild(divParrafoTimer);
    divPadre.appendChild(divTimer);
}

/*
 * Author: Yessica Portilla
 * Date: 25-10-2022
 * Description: Funci??n para comprobar las respuestas correctas e incorrectas.
 * args: N/A
 */
function mostrarResultado() {
    const respuestas = contenedor.querySelectorAll(".respuestas");
    let respuestasCorrectas = 0;

    preguntas.forEach((preguntaActual, numeroDePregunta) => {
        const todasLasRespuestas = respuestas[numeroDePregunta];
        const checkboxRespuestas = `input[name='${numeroDePregunta}']:checked`;
        const respuestaElegida = (todasLasRespuestas.querySelector(checkboxRespuestas) || {}
        ).value;
        if (respuestaElegida != null) {
            respuestaElegida.toUpperCase() == preguntaActual.respuestaCorrecta.toUpperCase() ? (respuestas[numeroDePregunta].style.color = 'green', (respuestasCorrectas++)) :
                respuestas[numeroDePregunta].style.color = 'red';
        } else {
            respuestas[numeroDePregunta].style.color = 'red';
        }

    });

    resultadoTest.innerHTML =
        "Usted ha acertado " + respuestasCorrectas + " preguntas de un total de " + preguntas.length;

    clearInterval(intervalTime);
}
