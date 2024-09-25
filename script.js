/**
 * Erstellt eine Animation für die Elektronenbewegung in einem Leiter
 * @param canvas Canvas, in dem die Animation erstellt werden soll
 * @param x X-Koordinate
 * @param y Y-Koordinate
 * @param radius Radius
 * @param color Farbe
 * @param text Text
 * @param transparent true, wenn das Element transparent sein soll, sonst false
 */
function drawParticle(canvas, x, y, radius, color, text, transparent) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (transparent) {
        ctx.fillStyle = color;
    } else {
        //set alpha to 1
        const rgb = color.match(/\d+/g);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    }
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.font = `${radius}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
}

/**
 * Zeichnet ein Neutron
 * @param canvas Canvas, in dem das Neutron gezeichnet
 * @param x X-Koordinate
 * @param y Y-Koordinate
 * @param radius Radius
 * @param text Ob ein + oder - angezeigt werden soll
 * @param transparent true, wenn das Neutron transparent sein soll, sonst false
 */
function drawNeutron(canvas, x, y, radius, text = true, transparent = true) {
    drawParticle(canvas, x, y, radius, "rgba(0, 255, 0, 0.5)", text ? "n" : "", transparent);
}

/**
 * Zeichnet ein Elektron
 * @param canvas Canvas, in dem das Elektron gezeichnet werden soll
 * @param x X-Koordinate
 * @param y Y-Koordinate
 * @param radius Radius
 * @param text Ob ein + oder - angezeigt werden soll
 * @param transparent true, wenn das Elektron transparent sein soll, sonst false
 */
function drawElectron(canvas, x, y, radius, text = true, transparent = true) {
    drawParticle(canvas, x, y, radius, "rgba(0, 0, 255, 0.5)", text ? "-" : "", transparent);
}

/**
 * Zeichnet ein Proton
 * @param canvas Canvas, in dem das Proton gezeichnet werden soll
 * @param x X-Koordinate
 * @param y Y-Koordinate
 * @param radius Radius
 * @param text Ob ein + oder - angezeigt werden soll
 * @param transparent true, wenn das Proton transparent sein soll, sonst false
 */
function drawProton(canvas, x, y, radius, text = true, transparent = true) {
    drawParticle(canvas, x, y, radius, "rgba(255, 0, 0, 0.5)", text ? "+" : "", transparent);
}

/**
 * Zeichnet ein Atom mit einer Schale und einem Kern
 * @param canvas Canvas, in dem das Atom gezeichnet werden soll
 * @param x X-Koordinate
 * @param y Y-Koordinate
 * @param radius Radius der Schale
 */
function drawAtomShellWithNucleus(canvas, x, y, radius) {
    const ctx = canvas.getContext("2d");

    //draw shell filled yellow
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255,183,0,0.5)";
    ctx.fill();
    ctx.stroke();

    //draw nucleus
    drawProton(canvas, x, y, radius / 3, false);
}

/**
 * Zeichnet ein Element
 * @param canvas Canvas, in dem das Element gezeichnet werden soll
 * @param x X-Koordinate
 * @param y Y-Koordinate
 * @param width Breite
 * @param height Höhe
 * @param color Farbe
 * @param text Text
 */
function drawElement(canvas, x, y, width, height, color, text) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + width / 2, y + height / 2);
}

/**
 * Erstellt einen Button
 * @param parent Element, in dem der Button erstellt werden soll
 * @param text Text des Buttons
 * @param onClick Funktion, die aufgerufen wird, wenn der Button geklickt wird
 */
function createButton(parent, text, onClick) {
    const button = document.createElement("button");
    button.innerText = text;
    button.onclick = onClick;
    button.classList.add("button");
    parent.appendChild(button);
}

/**
 * Erstellt einen Slider
 * @param parent Element, in dem der Slider erstellt werden soll
 * @param min Mindestwert
 * @param max Maximalwert
 * @param value Startwert
 * @param step Schrittweite
 * @param onChange Funktion, die aufgerufen wird, wenn sich der Wert ändert
 */
function createSlider(parent, min, max, value, step, onChange) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.step = step;
    slider.oninput = onChange;
    parent.appendChild(slider);
}

/**
 * Erstellt eine Animation für die Radiallinie
 * @param elementId
 */
function createRadialLine(elementId){
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    animation.appendChild(canvas);

    function frame(event) {
        //clear canvas
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const rect = canvas.getBoundingClientRect();
        let x;
        let y;
        if (!event) {
            x = 200;
            y = 200;
        }else {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }

        //draw line from center in direction to mouse and to the edge of the canvas
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);

        ctx.lineWidth = 2;

        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;
        const angle = Math.atan2(dy, dx);
        const x2 = canvas.width / 2 + Math.cos(angle) * 500;
        const y2 = canvas.height / 2 + Math.sin(angle) * 500;
        ctx.lineTo(x2, y2);
        ctx.stroke();


        drawElectron(canvas, canvas.width / 2, canvas.height / 2, 30);
        drawElectron(canvas, x, y, 15);
    }

    canvas.addEventListener("mousemove", function(event) {
        frame(event);
    });

    frame();
}

/**
 * Erstellt eine Animation für den Elektronenfluss in einem Leiter
 * @param elementId
 */
function createElectronFlow(elementId){
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    animation.appendChild(canvas);

    let interval = null;
    createButton(animation, "Start", function() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            this.innerText = "Start";
        } else {
            interval = setInterval(frame, 1000 / 60);
            this.innerText = "Stop";
        }
    });

    let atoms = [];
    let electrons = [];

    function createAtom(x, y, radius) {
        atoms.push({ x, y, radius });
    }

    function createElectron(x, y, radius) {
        electrons.push({ x, y, radius });
    }

    const atomSpacing = 100;
    const rowSpacing = 50;
    const offset = 50;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 4; col++) {
            const x = col * atomSpacing + (row % 2 === 0 ? 0 : offset);
            const y = row * rowSpacing;
            createAtom(x, y, 20);
        }
    }

    //random electrons
    for (let i = 0; i < 20; i++) {
        createElectron(Math.random() * canvas.width, Math.random() * canvas.height, 5);
    }

    function frame() {
        //clear canvas
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //draw atoms
        atoms.forEach(atom => {
            drawAtomShellWithNucleus(canvas, atom.x, atom.y, atom.radius);
        });

        //draw electrons
        electrons.forEach(electron => {
            drawElectron(canvas, electron.x, electron.y, electron.radius);
        });

        //move electrons
        electrons.forEach(electron => {
            electron.x += 1;
            if (electron.x > canvas.width + electron.radius) {
                electron.x = -electron.radius;
                electron.y = Math.random() * canvas.height;
            }
        });

        drawElement(canvas, 0, 0, 25, 200, "rgba(0, 0, 255, 0.5)", "-");
        drawElement(canvas, 275, 0, 25, 200, "rgba(255, 0, 0, 0.5)", "+");
    }

    frame();

}

/**
 * Erstellt eine Animation für die Feldlinien eines Magnetfeldes
 * @param elementId Id des Elements, in dem die Animation erstellt werden soll
 * @param type 0 für ein Magnetfeld um ein bewegtes Element, 1 für ein Magnetfeld um zwei bewegte Elemente
 */
function createMagneticField(elementId, type){
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    animation.appendChild(canvas);

    //2 elemente die man beide bewegen kann
    //bei beiden wird rund rum ein magnetfeld angezeigt und zu dem bewegten element wird ein strom angezeigt

    let movingElement = null;
    let elements = [];

    function createElement(x, y, radius, color, text) {
        elements.push({ x, y, radius, color, text });
    }

    createElement(100, 150, 20, "rgba(0, 0, 255, 0.5)", "-");
    if (type === 0){
        createElement(250, 150, 20, "rgba(255, 0, 0, 0.5)", "+");
    }else {
        createElement(250, 155, 20, "rgba(0, 0, 255, 0.5)", "-");
    }

    //add moving event listener
    canvas.addEventListener("mousedown", function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        movingElement = elements.find(element => {
            const dx = element.x - x;
            const dy = element.y - y;
            canvas.style.cursor = "move";
            return dx * dx + dy * dy < element.radius * element.radius;
        });
    });

    canvas.addEventListener("mousemove", function(event) {
        if (movingElement) {
            const rect = canvas.getBoundingClientRect();
            movingElement.x = event.clientX - rect.left;
            movingElement.y = event.clientY - rect.top;
        }

        //wenn maus über einem element ist, dann cursor ändern zu pointer
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const element = elements.find(element => {
            const dx = element.x - x;
            const dy = element.y - y;
            return dx * dx + dy * dy < element.radius * element.radius;
        });

        if (!movingElement) {
            if (element) {
                canvas.style.cursor = "pointer";
            } else {
                canvas.style.cursor = "default";
            }
        }

        frame();
    });

    canvas.addEventListener("mouseup", function() {
        movingElement = null;
        canvas.style.cursor = "default";
    });

    function frame() {
        //clear canvas
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //draw elements
        elements.forEach(element => {
            if (element.text === "+") {
                drawProton(canvas, element.x, element.y, element.radius);
            }
            if (element.text === "-") {
                drawElectron(canvas, element.x, element.y, element.radius);
            }
        });

        let otherElement = elements[1];
        let element = elements[0];
        const numLines = 16;

        let feldlinien = [];

        function createFeldlinie(angezogenVonElemente, abgestossenVonElemente, x, y, dx, dy, speed) {
            feldlinien.push({
                angezogenVonElemente: angezogenVonElemente,
                abgestossenVonElemente: abgestossenVonElemente,
                x: x,
                y: y,
                dx: dx,
                dy: dy,
                speed: speed
            });
        }

        // Draw field lines around the element
        for (let i = 0; i < numLines; i++) {
            const angle = i / numLines * Math.PI * 2;
            const dx = Math.cos(angle);
            const dy = Math.sin(angle);

            if (type === 0){
                createFeldlinie([element], [otherElement], element.x + dx * element.radius, element.y + dy * element.radius, dx, dy, 0.5);
            }else {
                createFeldlinie([element, otherElement], [], element.x + dx * element.radius, element.y + dy * element.radius, dx, dy, 0.5);
                createFeldlinie([otherElement, element], [], otherElement.x + dx * otherElement.radius, otherElement.y + dy * otherElement.radius, dx, dy, 0.5);
            }
        }

        feldlinien.forEach(feldlinie => {
            for (let i = 0; i < 4000; i++) {
                // Consider attraction forces and update the field line position
                let totalDx = 0;
                let totalDy = 0;

                // Calculate forces from attracted elements
                feldlinie.angezogenVonElemente.forEach(attractingElement => {
                    const dx = feldlinie.x - attractingElement.x;
                    const dy = feldlinie.y - attractingElement.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const force = 10 / (distance * distance);
                    totalDx += dx * force;
                    totalDy += dy * force;
                });

                // Calculate forces from repelling elements
                feldlinie.abgestossenVonElemente.forEach(repellingElement => {
                    const dx = feldlinie.x - repellingElement.x;
                    const dy = feldlinie.y - repellingElement.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const force = 10 / (distance * distance);
                    totalDx -= dx * force; // Repulsion
                    totalDy -= dy * force;
                });

                // Update direction with total forces
                feldlinie.dx += totalDx;
                feldlinie.dy += totalDy;

                // Normalize direction
                const length = Math.sqrt(feldlinie.dx * feldlinie.dx + feldlinie.dy * feldlinie.dy);
                if (length === 0) break; // Prevent division by zero
                feldlinie.dx /= length;
                feldlinie.dy /= length;

                // Update position
                feldlinie.x += feldlinie.dx * feldlinie.speed;
                feldlinie.y += feldlinie.dy * feldlinie.speed;

                // Draw the line
                ctx.beginPath();
                ctx.moveTo(feldlinie.x, feldlinie.y);

                //wenn line to in einem element ist, dann zeichne sie nicht
                if (elements.find(element => {
                    const dx = element.x - feldlinie.x;
                    const dy = element.y - feldlinie.y;
                    return dx * dx + dy * dy < element.radius * element.radius;
                })) {
                    continue;
                }

                ctx.lineTo(feldlinie.x - feldlinie.dx * 5, feldlinie.y - feldlinie.dy * 5);
                ctx.stroke();
            }
        });


    }

    frame();

}

/**
 * Erstellt eine Animation für die elektrische Polarisation
 * @param elementId Id des Elements, in dem die Animation erstellt werden soll
 * @param gleichnamig true, wenn die Elemente gleichnamig sind, sonst false
 */
function createElectricPolarization(elementId, gleichnamig) {
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    animation.appendChild(canvas);

    createSlider(animation, 0, 70, 0, 5, function () {
        frame(this.value);
    });

    frame(0);

    function frame(value) {

        value = Math.floor(value);

        //clear canvas
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //erstelle ein kreis, der immer weiter oval wird
        const width = 30 + value;
        const height = 30;
        const x = canvas.width / (gleichnamig ? 2.5 : 1.5) + (gleichnamig ? value : -value);
        const y = canvas.height / 2;
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fill(); // Fill the ellipse
        ctx.stroke();

        drawProton(canvas, canvas.width / (gleichnamig ? 2.5 : 1.5), canvas.height / 2, 10);

        let amount = (value) / 15;
        amount = Math.ceil(amount);

        for (let i = 0; i < amount; i++) {
            drawElement(canvas, 0, canvas.height / amount * i, 25, canvas.height / amount, (gleichnamig ? "rgba(0, 0, 255, 0.5)" : "rgba(255, 0, 0, 0.5)"), (gleichnamig ? "-" : "+"));
        }

    }
}

/**
 * Erstellt eine Animation für die Elektronenbewegung in einem Atom
 * @param elementId Id des Elements, in dem die Animation erstellt werden soll
 */
function createValenceElectrons(elementId) {
    const element = document.getElementById(elementId);
    const animation = document.createElement("div");
    animation.classList.add("animation");
    element.appendChild(animation);

    const canvas = document.createElement("canvas");
    canvas.width = 350;
    canvas.height = 350;
    animation.appendChild(canvas);

    let interval = null;
    createButton(animation, "Start", function() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            this.innerText = "Start";
        } else {
            interval = setInterval(frame, 1000 / 60);
            this.innerText = "Stop";
        }
    });

    let electrons = [];
    let nucleus = [];

    function createElectron(x, y) {
        electrons.push({ x, y, radius: 5, dx: Math.random() * 2 - 1, dy: Math.random() * 2 - 1 });
    }

    function createNucleus(x, y) {
        nucleus.push({ x, y, radius: 10 });
    }

    let elementRadius = 75;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 7; i++) {
        createElectron(centerX + Math.random() * elementRadius - elementRadius / 2, centerY + Math.random() * elementRadius - elementRadius / 2);
    }


    createNucleus(centerX, centerY);
    createNucleus(centerX + 46, centerY);
    createNucleus(centerX - 46, centerY);
    createNucleus(centerX + 23, centerY + 35);
    createNucleus(centerX - 23, centerY + 35);
    createNucleus(centerX + 23, centerY - 35);
    createNucleus(centerX - 23, centerY - 35);


    let mouseX = -100;
    let mouseY = -100;

    canvas.addEventListener("mousemove", function(event) {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    //mouse leave canvas
    canvas.addEventListener("mouseleave", function() {
        mouseX = -100;
        mouseY = -100;
    });

    function frame() {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the element circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, elementRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(129,129,129,0.5)";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();

        // Draw electrons and update their positions
        electrons.forEach(electron => {
            drawElectron(canvas, electron.x, electron.y, electron.radius);

            const dx = mouseX - electron.x;
            const dy = mouseY - electron.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If the mouse is within a certain range, move the electron towards the mouse
            const range = 125;
            if (distance < range) {
                const angle = Math.atan2(dy, dx);
                electron.dx = Math.cos(angle) * 1.5;
                electron.dy = Math.sin(angle) * 1.5;
            }

            electron.x += electron.dx;
            electron.y += electron.dy;

            // Check if the electron is outside the element radius
            const ex = electron.x - centerX;
            const ey = electron.y - centerY;
            const edistance = Math.sqrt(ex * ex + ey * ey);

            if (edistance + electron.radius > elementRadius) {
                // Reflect the electron's direction
                const angle = Math.atan2(ey, ex);
                electron.dx = -Math.cos(angle);
                electron.dy = -Math.sin(angle);

                // Move the electron back inside the element radius
                electron.x = centerX + (elementRadius - electron.radius) * Math.cos(angle);
                electron.y = centerY + (elementRadius - electron.radius) * Math.sin(angle);
            }

            // Check for collisions with other electrons
            electrons.forEach(otherElectron => {
                if (electron !== otherElectron) {
                    const dx = electron.x - otherElectron.x;
                    const dy = electron.y - otherElectron.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Apply a repulsive force even at a distance
                    const repulsionRange = 50;
                    if (distance < repulsionRange) {
                        const angle = Math.atan2(dy, dx);
                        const force = (repulsionRange - distance) / repulsionRange * 0.05;
                        electron.dx += Math.cos(angle) * force;
                        electron.dy += Math.sin(angle) * force;
                        otherElectron.dx -= Math.cos(angle) * force;
                        otherElectron.dy -= Math.sin(angle) * force;
                    }

                    if (distance < electron.radius + otherElectron.radius) {
                        // Reflect the electron's direction
                        const angle = Math.atan2(dy, dx);
                        electron.dx = Math.cos(angle);
                        electron.dy = Math.sin(angle);
                        otherElectron.dx = -Math.cos(angle);
                        otherElectron.dy = -Math.sin(angle);

                        // Move the electrons apart
                        const overlap = electron.radius + otherElectron.radius - distance;
                        electron.x += Math.cos(angle) * overlap / 2;
                        electron.y += Math.sin(angle) * overlap / 2;
                        otherElectron.x -= Math.cos(angle) * overlap / 2;
                        otherElectron.y -= Math.sin(angle) * overlap / 2;
                    }
                }
            });

            // Check for collisions with the nucleus
            nucleus.forEach(nucleus => {
                const dx = electron.x - nucleus.x;
                const dy = electron.y - nucleus.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < electron.radius + nucleus.radius) {
                    // Reflect the electron's direction
                    const angle = Math.atan2(dy, dx);
                    electron.dx = Math.cos(angle);
                    electron.dy = Math.sin(angle);

                    // Move the electron back outside the nucleus radius
                    electron.x = nucleus.x + (nucleus.radius + electron.radius) * Math.cos(angle);
                    electron.y = nucleus.y + (nucleus.radius + electron.radius) * Math.sin(angle);
                }
            });
        });

        // Draw the nucleus
        nucleus.forEach(nucleus => {
            drawAtomShellWithNucleus(canvas, nucleus.x, nucleus.y, nucleus.radius);
        });

        drawProton(canvas, mouseX, mouseY, 10);
    }

    for (let i = 0; i < 10; i++) {
        frame()
    }
}