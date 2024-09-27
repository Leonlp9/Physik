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