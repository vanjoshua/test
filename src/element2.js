import { createClient } from "@wix/sdk";
import { site } from "@wix/site";
import { products } from "@wix/stores";

const myWixClient = createClient({
  auth: site.auth(),
  host: site.host({ applicationId: "7dea53d2-fbd3-463a-990a-22216a7cfb35" }),
  modules: {
    products
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

    this.getProduct(this.getAttribute('product-id'))
  }

  static get observedAttributes() {
    return ['color', 'product-id'];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      console.log("Color attribute changed");
      this.setColor(newValue);
    } else if (name === 'product-id' && oldValue !== newValue) {
      if (myWixClient) {
        this.getProduct(newValue)
      } else { console.log("No client") }
    }
  }

  async getProduct(productId) {
    console.log("Client: ", myWixClient);
    try {
      console.log("original: ", productId);
      productId = productId.replace(/^"(.*)"$/, '$1');
      // Now `productId` should be clean without extra quotes
      console.log("clean: ", productId);

      const product = await myWixClient.products.getProduct(productId);

      this.setTextContent(JSON.stringify(product));
    } catch (error) {
      console.error("Error getting product:", error);
      this.setTextContent("Error getting product: " + productId);
    }
  }
}

customElements.define('ce-josh', MyCustomElement);