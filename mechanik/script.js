function createCanvas(elementId) {
    var element = document.getElementById(elementId);
    var canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 100;
    canvas.style.width = "100%";
    element.appendChild(canvas);
    return canvas.getContext("2d");
}

function updatePosition(context, x, v, a, t) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    x = v * t + 0.5 * a * t * t;
    context.fillRect(x, 25, 50, 50);
    return x;
}

function startAnimation(elementId, v, a, spuren) {
    //wenn es schon ein canvas gibt nimm das ansonsten erstelle eins
    var context = document.querySelector("#" + elementId + " canvas")?.getContext("2d") || createCanvas(elementId);
    var x = 0;
    var t = 0;
    var lastTime = new Date().getTime();
    var animationFrameId;

    let positionen = [];

    function update() {
        var currentTime = new Date().getTime();
        var dt = currentTime - lastTime;

        if (spuren) {
            positionen.push({x: x, t: t});
        }

        lastTime = currentTime;
        t += dt;
        x = updatePosition(context, x, v, a, t);

        if (spuren) {
            //punkte zeichnen
            context.fillStyle = "black";
            for (let i = 0; i < positionen.length; i++) {
                context.fillRect(positionen[i].x + 25, 50, 1, 1);
            }
        }

        // Stop the animation if the object touches the right wall
        if (x + 50 < context.canvas.width) {
            animationFrameId = requestAnimationFrame(update);
        }
    }
    update();
}

function createGleichfoermigeBewegung(elementId) {
    const element = document.getElementById(elementId);
    let spuren = false;

    startAnimation(elementId, 0.25, 0, spuren);

    const buttons = document.createElement("div");
    element.appendChild(buttons);

    createButton(buttons, "Start", function() {
        startAnimation(elementId, 0.25, 0, spuren);
    });

    createCheckbox(buttons, "Spur anzeigen", function() {
        spuren = !spuren;
    });
}

function createBeschleunigteBewegung(elementId) {
    const element = document.getElementById(elementId);
    let spuren = false;

    startAnimation(elementId, 0, 0.005, spuren);

    const buttons = document.createElement("div");
    element.appendChild(buttons);

    createButton(buttons, "Start", function() {
        startAnimation(elementId, 0, 0.005, spuren);
    });

    createCheckbox(buttons, "Spur anzeigen", function() {
        spuren = !spuren;
    });
}