import { Router } from '@vaadin/router';

class SignUp extends HTMLElement{
  connectedCallback(){
        this.render();

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="petfinder-info-section">
               hola soy registro
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .petfinder-info-section{
                height: 100vh;
                background-color: #CA9227;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('sign-up-page', SignUp);