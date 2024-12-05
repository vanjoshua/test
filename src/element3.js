import { createClient } from "@wix/sdk";
import { site } from "@wix/site";

const myWixClient = createClient({
  auth: site.auth(),
  host: site.host({ applicationId: "32495748-fccb-41d4-8cc5-2852a2566a51" })
});

class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.accessTokenListener = myWixClient.auth.getAccessTokenInjector();
  }

  async setColor(color) {
    this.container.style.backgroundColor = color || 'pink';
    const headers = await myWixClient.auth.getAuthHeaders();
    const authorization = headers.headers["Authorization"];

    const data = JSON.parse(JSON.parse(atob(authorization.split(".")[3])).data);
    const instanceId = data.instance.instanceId;

    console.log("instanceId: ", instanceId)
    console.log("Full headers object: ", headers)
  }

  connectedCallback() {
    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Create a container for the content
    this.container = document.createElement('div');
    this.shadowRoot.appendChild(this.container);

    // Set the initial color and text content
    this.setColor(this.getAttribute('color'));
  }

  static get observedAttributes() {
    return ['color'];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      console.log("Color attribute changed");
      this.setColor(newValue);
    }
  }
}

customElements.define('ce-josh', MyCustomElement);