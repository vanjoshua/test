import { createClient } from "@wix/sdk";
import { site } from "@wix/site";
import { services } from "@wix/site-bookings";

class ColoredBox extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Create a container for the content
    this.container = document.createElement('div');
    this.container.style.padding = '10px';  // Add padding for better visibility
    this.shadowRoot.appendChild(this.container);

    // Create a container for the text content
    this.textElement = document.createElement('span');
    this.container.appendChild(this.textElement);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent("init");
  }

  // Define the observed attributes
  static get observedAttributes() {
    return ['color', 'bookingsServiceId'];
  }

  // Callback when an observed attribute changes
  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      this.setColor(newValue);
    } else if (name === 'bookingsServiceId' && oldValue !== newValue) {

      //  const service = await wixClient.services.
      console.log("Booking ID attribute changed");

      this.setTextContent("Service ID: " + newValue);
    };
  }

  accessTokenListener(accessTokenGetter) {
    const wixClient = createClient({
      host: site.host({ applicationId: "766caf23-967f-4b3f-9999-8ece1efdf29b" }),
      auth: site.auth(accessTokenGetter),
      modules: { services },
    });
    console.log(`createClient`, wixClient)

  }

  // Set the color of the box
  setColor(color) {
    this.container.style.backgroundColor = color || 'gray';
  }

  // Set the text content of the box
  setTextContent(text) {
    this.textElement.textContent = text || '';
  }

}

customElements.define('ce-josh', ColoredBox);
