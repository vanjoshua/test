import { createClient } from "@wix/sdk";
import { site } from "@wix/site";
import { bookings } from "@wix/site-bookings";

let wixClient;

class MyCustomElement extends HTMLElement {
  setColor(color) {
    this.container.style.backgroundColor = color || 'white';
  }

  setTextContent(text) {
    this.textElement.textContent = text || '';
  }

  connectedCallback() {
    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Create a container for the content
    this.container = document.createElement('div');
    this.container.style.padding = '10px';
    this.shadowRoot.appendChild(this.container);

    // Create a container for the text content
    this.textElement = document.createElement('span');
    this.textElement.style.fontSize = '18px';
    this.container.appendChild(this.textElement);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent("init");

    // Handle wixClient initialization as needed (adjust based on your requirements)
    // ...
  }

  static get observedAttributes() {
    return ['color', 'bookingsserviceid'];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      console.log("Color attribute changed");
      this.setColor(newValue);
    } else if (name === 'bookingsserviceid' && oldValue !== newValue) {
      if (wixClient) {
        this.setAvailability(newValue)
      } else { console.log("No client") }
    }
  }

  accessTokenListener(accessTokenGetter) {
    wixClient = createClient({
      host: site.host({ applicationId: "7dea53d2-fbd3-463a-990a-22216a7cfb35" }),
      auth: site.auth(accessTokenGetter),
      modules: { bookings },
    });
    console.log(`createClient`, wixClient)
    this.setAvailability(this.getAttribute('bookingsserviceid'))
  }

  async setAvailability(serviceId) {
    try {
      const availability = await wixClient.bookings.getServiceAvailability(serviceId);
      const slots = availability.slots;
      const firstSlot = slots[0];
      console.log(firstSlot);
      const options = { weekday: "long", day: "numeric", month: "short" };
      const firstSlotDate = firstSlot.startDateTime.toLocaleDateString(
        "en-US",
        options,
      );
      this.setTextContent("Next availability: " + firstSlotDate);
    } catch (error) {
      console.error("Error fetching availability:", error);
      // Handle the error appropriately, e.g., display an error message to the user
      this.setTextContent("Error fetching availability");
    }
  }
}

customElements.define('ce-josh', MyCustomElement);