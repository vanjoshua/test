class ColoredBox extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Create a container for the text content
    this.textElement = document.createElement('span');
    this.shadowRoot.appendChild(this.textElement);

    // Create a style element to set the background color
    this.styleElement = document.createElement('style');
    this.shadowRoot.appendChild(this.styleElement);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent(this.getAttribute('bookingsServiceId'));
  }

  // Define the observed attributes
  static get observedAttributes() {
    return ['color', 'bookingsServiceId'];
  }

  // Callback when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      this.setColor(newValue);
    } else if (name === 'bookingsServiceId' && oldValue !== newValue) {
      this.setTextContent(newValue);
    }
  }

  // Set the color of the box
  setColor(color) {
    this.styleElement.textContent = `:host { background-color: ${color || 'gray'}; }`;
  }

  // Set the text content of the box
  setTextContent(text) {
    this.textElement.textContent = text || '';
  }
}

customElements.define('ce-josh', ColoredBox);
