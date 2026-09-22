/* =====================================================
   INFORMACIÓN DE FIGURAS
===================================================== */

const figuras = {

    circulo: {

        nombre: "Círculo",

        emoji: "🔵",

        lados: 0,

        descripcion:
            "Soy redondito y no tengo esquinas. ¡Como una pelota! ⚽"

    },

    triangulo: {

        nombre: "Triángulo",

        emoji: "🔺",

        lados: 3,

        descripcion:
            "Tengo 3 lados y 3 esquinitas. ¡Soy un triángulo! 🔺"

    },

    cuadrado: {

        nombre: "Cuadrado",

        emoji: "🟩",

        lados: 4,

        descripcion:
            "Tengo 4 lados iguales. ¡Como algunas ventanas! 🪟"

    },

    rectangulo: {

        nombre: "Rectángulo",

        emoji: "▭",

        lados: 4,

        descripcion:
            "Tengo 4 lados. ¡Soy más largo que ancho! 📖"

    },

    rombo: {

        nombre: "Rombo",

        emoji: "💎",

        lados: 4,

        descripcion:
            "Tengo 4 lados iguales y parezco un diamante. 💎"

    },

    ovalo: {

        nombre: "Óvalo",

        emoji: "🥚",

        lados: 0,

        descripcion:
            "Soy una figura curva y alargadita. No tengo lados rectos. 🥚"

    },

    estrella: {

        nombre: "Estrella",

        emoji: "⭐",

        lados: 5,

        descripcion:
            "Tengo puntitas y brillo muchísimo. ⭐"

    },

    pentagono: {

        nombre: "Pentágono",

        emoji: "⬟",

        lados: 5,

        descripcion:
            "Tengo 5 lados. ¡Penta significa cinco! ⭐"

    }

};



/* =====================================================
   MOSTRAR FIGURA
===================================================== */

function mostrarFigura(tipo) {

    const figura = figuras[tipo];

    const info =
        document.getElementById(
            "infoFigura"
        );

    info.classList.remove("hidden");

    document.getElementById(
        "figuraGrande"
    ).textContent = figura.emoji;

    document.getElementById(
        "nombreFigura"
    ).textContent = figura.nombre;

    document.getElementById(
        "descripcionFigura"
    ).textContent = figura.descripcion;

    info.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}



/* =====================================================
   OBJETOS DEL MUNDO
===================================================== */

function mostrarObjeto(
    emoji,
    nombre,
    descripcion
) {

    const resultado =
        document.getElementById(
            "objetoResultado"
        );

    resultado.classList.remove("hidden");

    document.getElementById(
        "objetoEmoji"
    ).textContent = emoji;

    document.getElementById(
        "objetoNombre"
    ).textContent = nombre;

    document.getElementById(
        "objetoDescripcion"
    ).textContent = descripcion;

    resultado.classList.add(
        "rebote"
    );

    setTimeout(() => {

        resultado.classList.remove(
            "rebote"
        );

    }, 700);

}



/* =====================================================
   COLORES
===================================================== */

function colorFigura(
    emoji,
    color
) {

    const resultado =
        document.getElementById(
            "colorResultado"
        );

    resultado.textContent =
        emoji +
        " ¡Elegiste el color " +
        color +
        "! ✨";

    resultado.classList.add(
        "rebote"
    );

    crearEstrellitas();

    setTimeout(() => {

        resultado.classList.remove(
            "rebote"
        );

    }, 700);

}



/* =====================================================
   JUEGO DE CONTAR LADOS
===================================================== */

let figuraConteo;

function nuevaFiguraConteo() {

    const nombres =
        Object.keys(figuras);

    const indice =
        Math.floor(
            Math.random() *
            nombres.length
        );

    figuraConteo =
        nombres[indice];

    const figura =
        figuras[figuraConteo];

    document.getElementById(
        "figuraConteo"
    ).textContent =
        figura.emoji;

    document.getElementById(
        "numeroLados"
    ).textContent =
        "¿Cuántos lados?";

    document.getElementById(
        "mensajeLados"
    ).textContent = "";

}


function comprobarLados(
    respuesta
) {

    const figura =
        figuras[figuraConteo];

    const mensaje =
        document.getElementById(
            "mensajeLados"
        );

    if (
        respuesta ===
        figura.lados
    ) {

        mensaje.textContent =
            "🎉 ¡MUY BIEN! ¡Lo encontraste! 🧸💙";

        mensaje.className =
            "text-2xl font-black mt-8 text-green-600 rebote";

        crearEstrellitas();

        setTimeout(
            nuevaFiguraConteo,
            1300
        );

    }

    else {

        mensaje.textContent =
            "💙 ¡Casi! ¡Inténtalo otra vez!";

        mensaje.className =
            "text-2xl font-black mt-8 text-orange-500";

    }

}



/* =====================================================
   JUEGO DE MEMORIA
===================================================== */

const simbolosMemoria = [
    "🔵",
    "🔺",
    "🟩",
    "⭐"
];

let cartasMemoria = [];

let primeraCarta = null;

let segundaCarta = null;

let bloqueoMemoria = false;

let parejasEncontradas = 0;


function iniciarMemoria() {

    cartasMemoria = [

        ...simbolosMemoria,

        ...simbolosMemoria

    ].sort(
        () => Math.random() - 0.5
    );

    primeraCarta = null;

    segundaCarta = null;

    bloqueoMemoria = false;

    parejasEncontradas = 0;

    const contenedor =
        document.getElementById(
            "memoria"
        );

    contenedor.innerHTML = "";


    cartasMemoria.forEach(
        (simbolo, indice) => {

            const carta =
                document.createElement(
                    "button"
                );

            carta.className =
                "h-32 bg-azulPrincipal text-white rounded-3xl text-6xl font-black shadow-lg hover:scale-105 transition";

            carta.textContent =
                "❓";

            carta.dataset.simbolo =
                simbolo;

            carta.dataset.indice =
                indice;

            carta.onclick =
                () => voltearCarta(carta);

            contenedor.appendChild(
                carta
            );

        }
    );

}


function voltearCarta(carta) {

    if (
        bloqueoMemoria ||
        carta === primeraCarta ||
        carta.textContent !== "❓"
    ) {

        return;

    }

    carta.textContent =
        carta.dataset.simbolo;


    if (!primeraCarta) {

        primeraCarta =
            carta;

        return;

    }


    segundaCarta =
        carta;

    bloqueoMemoria = true;


    if (
        primeraCarta.dataset.simbolo ===
        segundaCarta.dataset.simbolo
    ) {

        parejasEncontradas++;

        primeraCarta = null;

        segundaCarta = null;

        bloqueoMemoria = false;

        crearEstrellitas();

        document.getElementById(
            "mensajeMemoria"
        ).textContent =
            "🌟 ¡Pareja encontrada!";

        if (
            parejasEncontradas ===
            simbolosMemoria.length
        ) {

            document.getElementById(
                "mensajeMemoria"
            ).textContent =
                "🎉 ¡GANASTE! ¡Encontraste todas! 🧸💙";

        }

    }

    else {

        setTimeout(() => {

            primeraCarta.textContent =
                "❓";

            segundaCarta.textContent =
                "❓";

            primeraCarta = null;

            segundaCarta = null;

            bloqueoMemoria = false;

            document.getElementById(
                "mensajeMemoria"
            ).textContent =
                "💙 ¡Inténtalo de nuevo!";

        }, 800);

    }

}



/* =====================================================
   ATRAPA LA FIGURA
===================================================== */

let objetivoAtrapa = "";

let puntosAtrapa = 0;


function nuevoAtrapa() {

    const nombres =
        Object.keys(figuras);

    const indice =
        Math.floor(
            Math.random() *
            nombres.length
        );

    objetivoAtrapa =
        nombres[indice];

    document.getElementById(
        "objetivoAtrapa"
    ).textContent =
        figuras[objetivoAtrapa].emoji;


    const contenedor =
        document.getElementById(
            "zonaAtrapa"
        );

    contenedor.innerHTML = "";


    const mezcladas =
        [...nombres].sort(
            () => Math.random() - 0.5
        );


    mezcladas.forEach(
        tipo => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.className =
                "boton-nino bg-white border-4 border-cieloOscuro shadow-md text-5xl";

            boton.textContent =
                figuras[tipo].emoji;

            boton.onclick =
                () => comprobarAtrapa(tipo);

            contenedor.appendChild(
                boton
            );

        }
    );

    document.getElementById(
        "mensajeAtrapa"
    ).textContent = "";

}


function comprobarAtrapa(
    tipo
) {

    const mensaje =
        document.getElementById(
            "mensajeAtrapa"
        );

    if (
        tipo ===
        objetivoAtrapa
    ) {

        puntosAtrapa++;

        document.getElementById(
            "puntosAtrapa"
        ).textContent =
            puntosAtrapa;

        mensaje.textContent =
            "🎉 ¡MUY BIEN! ¡Encontraste la figura! 🧸✨";

        mensaje.className =
            "text-2xl font-black mt-8 text-green-600 rebote";

        crearEstrellitas();

        setTimeout(
            nuevoAtrapa,
            1000
        );

    }

    else {

        mensaje.textContent =
            "💙 ¡Casi! Mira otra vez.";

        mensaje.className =
            "text-2xl font-black mt-8 text-orange-500";

    }

}



/* =====================================================
   ESTRELLITAS
===================================================== */

function crearEstrellitas() {

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const estrella =
            document.createElement(
                "div"
            );

        estrella.className =
            "estrella";

        estrella.textContent =
            "✨";

        estrella.style.left =
            Math.random() * 100 +
            "vw";

        estrella.style.top =
            Math.random() * 70 +
            "vh";

        estrella.style.fontSize =
            (
                20 +
                Math.random() * 25
            ) +
            "px";

        document.body.appendChild(
            estrella
        );

        setTimeout(() => {

            estrella.remove();

        }, 1000);

    }

}



/* =====================================================
   P5.JS
===================================================== */

let figurasCreadas = [];


function setup() {

    let canvas =
        createCanvas(
            650,
            420
        );

    canvas.parent(
        "p5-container"
    );

    textAlign(
        CENTER,
        CENTER
    );

}


function draw() {

    background(
        234,
        247,
        255
    );


    /* NUBES */

    fill(
        255,
        255,
        255,
        180
    );

    noStroke();

    ellipse(
        100,
        70,
        130,
        55
    );

    ellipse(
        150,
        70,
        150,
        65
    );

    ellipse(
        530,
        100,
        150,
        60
    );


    /* FIGURAS */

    for (
        let i = 0;
        i < figurasCreadas.length;
        i++
    ) {

        let f =
            figurasCreadas[i];


        f.x += f.velX;

        f.y += f.velY;


        if (
            f.x < 30 ||
            f.x > width - 30
        ) {

            f.velX *= -1;

        }


        if (
            f.y < 30 ||
            f.y > height - 40
        ) {

            f.velY *= -1;

        }


        fill(
            f.r,
            f.g,
            f.b
        );


        if (
            f.tipo ===
            "triangulo"
        ) {

            triangle(

                f.x,
                f.y - 25,

                f.x - 28,
                f.y + 25,

                f.x + 28,
                f.y + 25

            );

        }

        else if (
            f.tipo ===
            "cuadrado"
        ) {

            rectMode(
                CENTER
            );

            rect(
                f.x,
                f.y,
                50,
                50,
                8
            );

        }

        else if (
            f.tipo ===
            "estrella"
        ) {

            dibujarEstrella(
                f.x,
                f.y,
                15,
                30,
                5
            );

        }

        else if (
            f.tipo ===
            "rombo"
        ) {

            beginShape();

            vertex(
                f.x,
                f.y - 30
            );

            vertex(
                f.x + 30,
                f.y
            );

            vertex(
                f.x,
                f.y + 30
            );

            vertex(
                f.x - 30,
                f.y
            );

            endShape(
                CLOSE
            );

        }

        else if (
            f.tipo ===
            "pentagono"
        ) {

            dibujarPoligono(
                f.x,
                f.y,
                30,
                5
            );

        }

        else if (
            f.tipo ===
            "rectangulo"
        ) {

            rectMode(
                CENTER
            );

            rect(
                f.x,
                f.y,
                65,
                40,
                8
            );

        }

        else if (
            f.tipo ===
            "ovalo"
        ) {

            ellipse(
                f.x,
                f.y,
                65,
                42
            );

        }

        else {

            circle(
                f.x,
                f.y,
                50
            );

        }

    }


    /* MENSAJE */

    fill(
        40,
        70,
        90
    );

    textSize(16);

    textStyle(BOLD);

    text(
        "☁️ ¡Haz clic para crear figuras! ✨",
        width / 2,
        height - 20
    );

}


function mousePressed() {

    if (
        mouseX >= 0 &&
        mouseX <= width &&
        mouseY >= 0 &&
        mouseY <= height
    ) {

        const tipos =
            Object.keys(figuras);

        const tipo =
            tipos[
                Math.floor(
                    Math.random() *
                    tipos.length
                )
            ];


        figurasCreadas.push({

            x: mouseX,

            y: mouseY,

            velX:
                random(
                    -2,
                    2
                ),

            velY:
                random(
                    -2,
                    2
                ),

            tipo: tipo,

            r:
                random(
                    80,
                    150
                ),

            g:
                random(
                    140,
                    220
                ),

            b:
                random(
                    190,
                    255
                )

        });

    }

}


function dibujarEstrella(
    x,
    y,
    radio1,
    radio2,
    puntos
) {

    let angulo =
        TWO_PI / puntos;

    let mitad =
        angulo / 2;

    beginShape();

    for (
        let a = 0;
        a < TWO_PI;
        a += angulo
    ) {

        let sx =
            x +
            cos(a) *
            radio2;

        let sy =
            y +
            sin(a) *
            radio2;

        vertex(
            sx,
            sy
        );


        sx =
            x +
            cos(
                a +
                mitad
            ) *
            radio1;

        sy =
            y +
            sin(
                a +
                mitad
            ) *
            radio1;

        vertex(
            sx,
            sy
        );

    }

    endShape(
        CLOSE
    );

}


function dibujarPoligono(
    x,
    y,
    radio,
    lados
) {

    beginShape();

    for (
        let i = 0;
        i < lados;
        i++
    ) {

        let angulo =
            TWO_PI *
            i /
            lados -
            HALF_PI;

        let px =
            x +
            cos(angulo) *
            radio;

        let py =
            y +
            sin(angulo) *
            radio;

        vertex(
            px,
            py
        );

    }

    endShape(
        CLOSE
    );

}


function limpiarTablero() {

    figurasCreadas = [];

}



/* =====================================================
   INICIAR
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        nuevaFiguraConteo();

        iniciarMemoria();

        nuevoAtrapa();

    }
);