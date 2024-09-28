function createAdditiveFarbmischungSimulation(elementId) {
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    animation.appendChild(canvas);

    const context = canvas.getContext("2d");

    let r = 255, g = 255, b = 255;

    let redSlider = createSlider(animation, 0, 255, 255, 1, function() {
        r = this.value;
        all.value = (parseInt(redSlider.value) + parseInt(greenSlider.value) + parseInt(blueSlider.value)) / 3;
        draw();
    }, "Rot");

    let greenSlider = createSlider(animation, 0, 255, 255, 1, function() {
        g = this.value;
        all.value = (parseInt(redSlider.value) + parseInt(greenSlider.value) + parseInt(blueSlider.value)) / 3;
        draw();
    }, "Grün");

    let blueSlider = createSlider(animation, 0, 255, 255, 1, function() {
        b = this.value
        all.value = (parseInt(redSlider.value) + parseInt(greenSlider.value) + parseInt(blueSlider.value)) / 3;
        draw();
    }, "Blau");

    let all = createSlider(animation, 0, 255, 255, 1, function() {
        r = this.value;
        g = this.value;
        b = this.value;
        redSlider.value = this.value;
        greenSlider.value = this.value;
        blueSlider.value = this.value
        draw();
    }, "Alle");

    function draw() {
        // Set the background to black
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Set the composite operation to 'lighter' for additive color mixing
        context.globalCompositeOperation = "lighter";

        // Draw the three circles
        context.fillStyle = `rgb(${r}, 0, 0)`;
        context.beginPath();
        context.arc(100, 106, 85, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = `rgb(0, ${g}, 0)`;
        context.beginPath();
        context.arc(200, 106, 85, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = `rgb(0, 0, ${b})`;
        context.beginPath();
        context.arc(150, 193, 85, 0, 2 * Math.PI);
        context.fill();

        // Reset the composite operation to default
        context.globalCompositeOperation = "source-over";
    }

    draw();
}

function createReflexionSimulation(elementId) {
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 156;
    animation.appendChild(canvas);

    const context = canvas.getContext("2d");

    let angle = 0;

    let angleSlider = createSlider(animation, 0, 180, 0, 1, function() {
        angle = this.value;
        draw();
    }, "Einfallswinkel");

    function draw() {
        //clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the mirror
        context.strokeStyle = "black";
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(0, 154);
        context.lineTo(300, 154);
        context.stroke();

        // Draw the incoming light ray
        context.lineWidth = 2;

        //draw einfallslot
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150, 0);
        context.stroke();

        context.strokeStyle = "green";
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150 + 220 * Math.cos(angle * Math.PI / 180), 150 - 220 * Math.sin(angle * Math.PI / 180));
        context.stroke();

        // Calculate the reflected angle
        const reflectedAngle = 2 * 90 - angle;

        // Draw the reflected light ray
        context.strokeStyle = "blue";
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150 + 220 * Math.cos(reflectedAngle * Math.PI / 180), 150 - 220 * Math.sin(reflectedAngle * Math.PI / 180));
        context.stroke();


        //zeichne den Winkel ein mit ° Symbol
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.font = "16px Arial";
        context.fillText(Math.abs(parseInt(angle) - 90) + "°", 150 + 50 * Math.cos(angle * Math.PI / 180), 150 - 50 * Math.sin(angle * Math.PI / 180));
        context.fillText(Math.abs(parseInt(angle) - 90) + "°", 150 + 50 * Math.cos(reflectedAngle * Math.PI / 180), 150 - 50 * Math.sin(reflectedAngle * Math.PI / 180));

        //half curve from the ray to the einfallslot
        context.strokeStyle = "black";
        context.beginPath();
        if (angle > 90) {
            context.arc(150, 150, 50, Math.PI + Math.PI / 2, Math.abs(angle) * Math.PI / 180 + Math.PI);
        }else {
            context.arc(150, 150, 50, Math.abs(angle) * Math.PI / 180 + Math.PI, Math.PI + Math.PI / 2);
        }
        context.stroke();

        //half curve from the reflected ray to the einfallslot
        context.beginPath();
        if (reflectedAngle > 90) {
            context.arc(150, 150, 50, Math.PI + Math.PI / 2, Math.abs(reflectedAngle) * Math.PI / 180 + Math.PI);
        }else {
            context.arc(150, 150, 50, Math.abs(reflectedAngle) * Math.PI / 180 + Math.PI, Math.PI + Math.PI / 2);
        }
        context.stroke();

    }

    draw();
}

function createSammellinsenSimulation(elementId) {
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    animation.appendChild(canvas);

    const context = canvas.getContext("2d");

    let diopters = 50;
    let laserHeight = 150;

    let dioptersSlider = createSlider(animation, 0, 50, 50, 1, function() {
        diopters = parseInt(this.value);
        draw();
    }, "Dioptrien");

    let laserHeightSlider = createSlider(animation, 0, 300, 150, 1, function() {
        laserHeight = parseInt(this.value);
        draw();
    }, "Laserhöhe");

    function draw() {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw lens
        context.strokeStyle = "black";
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(150, 50);
        // Sammellinsenform (gewölbt)
        context.quadraticCurveTo(150 - diopters, 150, 150, 250); // Left side of the lens
        context.quadraticCurveTo(150 + diopters, 150, 150, 50);  // Right side of the lens
        context.stroke();

        //Der Laser kommt von Links geradlinig auf die Linse zu

        //zeichne den Laser
        context.strokeStyle = "green";
        context.beginPath();
        context.moveTo(0, laserHeight);
        context.lineTo(300, laserHeight);
        context.stroke();
    }


    draw();
}

function createZerstreuungslinsenSimulation(elementId) {
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    animation.appendChild(canvas);

    const context = canvas.getContext("2d");

    let diopters = -50;
    let laserHeight = 150;

    let dioptersSlider = createSlider(animation, -50, 0, -50, 1, function() {
        diopters = parseInt(this.value);
        draw();
    }, "Dioptrien");

    let laserHeightSlider = createSlider(animation, 0, 300, 150, 1, function() {
        laserHeight = parseInt(this.value);
        draw();
    }, "Laserhöhe");

    function draw() {
        //clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        //draw lens
        context.strokeStyle = "black";
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(120, 50);
        context.quadraticCurveTo(120 - diopters, 150, 120, 250);
        context.lineTo(180, 250);
        context.quadraticCurveTo(180 + diopters, 150, 180, 50);
        context.lineTo(120, 50);
        context.quadraticCurveTo(120 - diopters, 150, 120, 250);
        context.stroke();

        //draw laser
        context.strokeStyle = "green";
        context.beginPath();
        context.moveTo(0, laserHeight);
        context.lineTo(300, laserHeight);
        context.stroke();


    }

    draw();
}