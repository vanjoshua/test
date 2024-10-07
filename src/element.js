import { createClient } from "@wix/sdk";
import { site } from "@wix/site";
import { bookings } from "@wix/site-bookings";
import { services } from "@wix/bookings";

const myWixClient = createClient({
  auth: site.auth(),
  host: site.host({ applicationId: "<your_app_id>" }),
  modules: {
    bookings, services
  },
});

class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.accessTokenListener = myWixClient.auth.getAccessTokenInjector();
  }

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
    this.container.style.borderRadius = '10px';
    this.container.style.padding = '10px';
    this.shadowRoot.appendChild(this.container);

    // Create a container for the text content
    this.textElement = document.createElement('h2');

    const root = document.documentElement;
    const font = getComputedStyle(root).getPropertyValue('--wst-font-style-h2');
    console.log(font); // Output: the value of the CSS variable

    this.textElement.style.font = font;

    this.container.appendChild(this.textElement);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
    this.setTextContent("...");

    console.log(`createClient`, wixClient)
    this.setAvailability(this.getAttribute('bookingsserviceid'))
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

  async setAvailability(serviceId) {
    try {
      const myService = await wixClient.services.getService(serviceId);
      console.log("Service object: ", JSON.stringify(myService));

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
      this.setTextContent("Error fetching availability");
    }
  }
}

customElements.define('ce-josh', MyCustomElement);