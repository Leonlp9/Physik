
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