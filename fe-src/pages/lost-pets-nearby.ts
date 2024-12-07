import { Router } from '@vaadin/router';

class LostPets extends HTMLElement{
  connectedCallback(){
        this.render();

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="lost-pets-section">
               <h2 class="title">Mascotas perdidas cerca:</h2>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .lost-pets-section{
                display: flex;
                align-items: flex-start;
                justify-content: center;
                height: 100vh;
                background-color: #CA9227;
            }

            .title{
                margin: 70px 0px ;
                font-family: "Luckiest Guy", cursive;
                font-weight: 400;
                font-style: normal;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .title{
                    font-size: 35px;
                }
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('lost-pets-page', LostPets);