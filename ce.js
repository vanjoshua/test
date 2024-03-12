// To debug this code, open wixDefaultCustomElement.js in Developer Tools.

const IMAGE_URL = 'https://wix.to/vUBXBKU';
const H2_TEXT = 'This is a Custom Element';
const H3_1_TEXT = 'View its code by clicking the Settings button and pasting the Server URL into a new browser tab.';
const H3_2_TEXT = 'Explore this code and use it as a reference to create your own element.';
const DEBUG_TEXT = 'Loading the code for Custom Element \'wix-default-custom-element\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';


const createImageContainer = (number) => {
    const imageContainer = document.createElement('div');
    imageContainer.id = 'wdce-image-container';
    let cards = '';
    for(let i = 0; i < number; i++) {
        cards += `<div class="card">CARD ${i + 1}</div>`;
    }
    imageContainer.innerHTML = `<div class="cards">` + cards + `</div>`;
    return imageContainer;
};

const createStyle = () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
html { font-size: 22px; }
body { padding: 1rem; }

.card {
  background-color: dodgerblue;
  color: white;
  padding: 1rem;
  height: 2rem;
}

.cards {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
    `;
    return styleElement;
};

class WixDefaultCustomElement extends HTMLElement {
    constructor() {
        super();
        console.log(DEBUG_TEXT);
    }

    connectedCallback() {
        this.appendChild(createStyle());
        this.appendChild(createImageContainer(this.getAttribute('number')));
    }
}
customElements.define('ce-josh', WixDefaultCustomElement);
