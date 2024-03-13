class CeJoshElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100px;
                    height: 100px;
                    background-color: red;
                }
            </style>
        `;
    }
}

customElements.define('ce-josh', CeJoshElement);