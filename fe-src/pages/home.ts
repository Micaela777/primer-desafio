import { Router } from '@vaadin/router';

class Home extends HTMLElement{
  connectedCallback(){
        this.render();

        const petFinderInfoButton = this.querySelector('.informative-text')
        petFinderInfoButton.addEventListener('click', (e) => {
            e.preventDefault();
            Router.go('./pet-finder-info');
        });

        const signUpButton = this.querySelector('.sign-up-button')
        signUpButton.addEventListener('click', (e) => {
            e.preventDefault();
            Router.go('./sign-up');
        });

        const signInButton = this.querySelector('.sign-in-button')
        signInButton.addEventListener('click', (e) => {
            e.preventDefault();
            Router.go('./sign-in');
        });

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="home-section">
                <custom-main-logo></custom-main-logo>
                <h1 class="title">Pet finder App</h1>
                <h3 class="sub-title">Encontrá y reportá mascotas perdidas cerca de tu ubicación.</h3>
                <div class="button-container">
                    <custom-button class="sign-up-button">Registrarse</custom-button>
                    <custom-button class="sign-in-button">Iniciar Sesión</custom-button>
                </div>
                <h3 class="informative-text">¿Cómo funciona Pet Finder App?</h3>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .home-section{
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                padding: 40px 0px;
                background-color: #CA9227;
            }

            .title{
                margin: 0;
                font-family: "Luckiest Guy", cursive;
                font-weight: 400;
                font-style: normal;
                color: #FAF7EE;
            }

            .sub-title{
                max-width: 300px;
                text-align: center;
                margin: 0;
                font-family: "Poppins", sans-serif;
                font-weight: 300;
                font-style: normal;
                color: #FAF7EE;
            }

            .button-container{
                max-width: 245px;
                display: flex;
                flex-direction: column;
                padding-top: 15px;
                gap: 17px;
            }
            @media (min-width: 760px){
                .button-container{
                     max-width: 600px;
                    flex-direction: row;
                }
            }    

            .informative-text{
                margin: 0;
                padding-top: 14px;
                text-decoration: underline;
                font-size: 15px;
                font-family: "Poppins", sans-serif;
                font-weight: 300;
                font-style: normal;
                color: #FAF7EE;
            }

            .informative-text:hover{
                cursor: pointer;
                color: #ede1d5;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('home-page', Home);