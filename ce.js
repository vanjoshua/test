class ColoredBox extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow root
      this.attachShadow({ mode: 'open' });
  
      // Set the initial color
      this.setColor(this.getAttribute('color'));
    }
  
    // Define the observed attributes
    static get observedAttributes() {
      return ['color'];
    }
  
    // Callback when an observed attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'color' && oldValue !== newValue) {
        this.setColor(newValue);
      }
    }
  
    // Set the color of the box
    setColor(color) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            width: 100px;
            height: 100px;
            background-color: ${color || 'gray'};
          }
        </style>
      `;
    }
  }
  
  // Define the custom element
  customElements.define('ce-josh', ColoredBox);