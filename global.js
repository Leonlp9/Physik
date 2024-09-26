
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

function createCheckbox(parent, text, onChange) {
    const container = document.createElement("div");
    container.classList.add("checkbox-container");

    const label = document.createElement("label");
    label.innerText = text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onchange = function () {
        onChange();
        label.classList.toggle("checked");
    }

    label.appendChild(checkbox);
    container.appendChild(label);
    parent.appendChild(container);
}

function createCalculator(title, containerId, formula, formulaText, inputs) {
    const container = document.getElementById(containerId);
    const details = document.createElement('details');
    const form = document.createElement('form');
    form.className = 'calculator';

    const summary = document.createElement('summary');
    summary.innerHTML = `<i class="fas fa-calculator"></i> ${title}`;
    details.appendChild(summary);

    //formular
    const formular = document.createElement('div');
    formular.innerHTML = `\\(${formulaText}\\) <br><br>`;
    details.appendChild(formular);

    inputs.forEach(input => {
        const label = document.createElement('label');
        label.textContent = `${input.label}: `;
        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = input.id + containerId;
        inputField.value = input.defaultValue || '';
        label.appendChild(inputField);
        details.appendChild(label);
        details.appendChild(document.createElement('br'));
    });

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Calculate';
    button.onclick = calculateResult;
    details.appendChild(button);

    const resultContainer = document.createElement('div');
    resultContainer.id = 'result' + containerId;
    resultContainer.className = 'result';
    resultContainer.innerHTML = 'Result: ';
    details.appendChild(resultContainer);

    form.onsubmit = (event) => {
        event.preventDefault();
        calculateResult();
    };

    form.appendChild(details);
    container.appendChild(form);

    function calculateResult() {
        const values = inputs.reduce((acc, input) => {
            acc[input.id] = parseFloat(document.getElementById(input.id + containerId).value) || 0;
            return acc;
        }, {});
        const result = formula(values);
        const substitutedFormula = formulaText;
        const resultContainer = document.getElementById('result' + containerId);
        resultContainer.innerHTML = `Result: \\(${substitutedFormula} = ${result}\\)`;
        MathJax.typesetPromise([resultContainer]);
    }
}

function setHeaderContent(){
    const header = document.querySelector("header");
    header.innerHTML = `<div class="container">
        <nav class="navbar">
          <h1>Physik</h1>
          <ul>
          </ul>
        </nav>
      </div>`;
}

function setFooterContent(){
    const footer = document.querySelector("footer");
    footer.innerHTML = `<p>2024 Leon Rabe. Schülerprojekt</p>
      <p>
        <a href="https://leonlp9.github.io/PrivatLinkTree/">Kontakt</a> |
        <a href="https://github.com/Leonlp9/Physik" target="_blank">Github Repository</a>
      </p>`;
}