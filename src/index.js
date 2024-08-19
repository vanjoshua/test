import { createClient } from "@wix/sdk";
import { site } from "@wix/site";
import { bookings } from "@wix/site-bookings";


let wixClient;

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
    return ['color', 'bookingsserviceid'];
  }

  // Callback when an observed attribute changes
  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      console.log("Color attribute changed");
      this.setColor(newValue);
    } else if (name === 'bookingsserviceid' && oldValue !== newValue) {
      if (wixClient) {
        const availability = await wixClient.bookings.getServiceAvailability(bookingsserviceid);
        let slots = availability.slots;
        let firstSlot = slots[0];

        //  const service = await wixClient.services.
        console.log(firstSlot);

        this.setTextContent("Fist slot: " + JSON.stringify(firstSlot));
      };
    } else { console.log("No client") }
  }

  accessTokenListener(accessTokenGetter) {
    wixClient = createClient({
      host: site.host({ applicationId: "7dea53d2-fbd3-463a-990a-22216a7cfb35" }),
      auth: site.auth(accessTokenGetter),
      modules: { bookings },
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
