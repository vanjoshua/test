class ColoredBox extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent(this.getAttribute('serviceId'));
  }

  // Define the observed attributes
  static get observedAttributes() {
    return ['color', 'serviceId'];
  }

  // Callback when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      this.setColor(newValue);
    } else if (name === 'serviceId' && oldValue !== newValue) {
      this.setTextContent(newValue);
    }
  }

  // Set the color of the box
  setColor(color) {
    this.shadowRoot.style.backgroundColor = color || 'gray';
  }

  // Set the text content of the box
  setTextContent(text) {
    const textElement = document.createElement('span');
    textElement.textContent = text || '';
    this.shadowRoot.appendChild(textElement);
  }
}

customElements.define('ce-josh', ColoredBox);
