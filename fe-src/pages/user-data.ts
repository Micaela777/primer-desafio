import { Router } from '@vaadin/router';
import { state } from '../state';

class UserData extends HTMLElement{
  connectedCallback(){
        this.render();

        const modifyData = this.querySelector(".modify-personal-data-button")
        modifyData.addEventListener("click", (e) => {
            e.preventDefault()
            Router.go('./modify-user-data')
        })

        const changePassword = this.querySelector(".change-password-button")
        changePassword.addEventListener("click", (e) => {
            e.preventDefault()
            Router.go('./change-password')
        })
    };

    render(){

        const cs = state.getState();
        const email = cs.email

        this.innerHTML = `
            <custom-header></custom-header>
            <div class="user-data-section">
               <h2 class="title">Mis datos</h2>
               <div class="buttons-container">
                   <button class="modify-personal-data-button">Modificar datos personales</button>
                   <button class="change-password-button">Modificar contraseña</button>
               </div>
               <div class="info-text-container">
                   <h2 class="user-email">${email}</h2>
                   <h2 class="log-out">CERRAR SESIÓN</h2>
               </div>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .user-data-section{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 100vh;
                background-color: #CA9227;
            }

            .title{
                margin: 50px 0px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-size: 50px;
                font-style: normal;
                color: #FAF7EE;
            }

            .buttons-container{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 25px;
            }

            .modify-personal-data-button,
            .change-password-button{
                width: 100%;
                max-width: 320px;
                border: none;
                border-radius: 50px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }
            .modify-personal-data-button:hover,
            .change-password-button:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }

            @media (min-width: 760px){
                .modify-personal-data-button,
                .change-password-button{
                    max-width: 350px;
                }
            }

            .info-text-container{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 25px;
            }

            .user-email{
                margin: 0px;
                font-family: "Poppins", sans-serif;
                font-weight: 300;
                font-style: normal;
            }

            .log-out{
                font-size: 18px;
            }

            .log-out:hover{
                cursor: pointer;
                color: #22365c;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('user-data-page', UserData);