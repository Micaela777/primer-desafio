import { Router } from '@vaadin/router';

class SignIn extends HTMLElement{
  connectedCallback(){
        this.render();

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="sign-in-section">
               hola soy inicio de sesion
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .sign-in-section{
                height: 100vh;
                background-color: #CA9227;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('sign-in-page', SignIn);