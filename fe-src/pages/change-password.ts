import { Router } from '@vaadin/router';
import { state } from '../state';

class ChangePassword extends HTMLElement{
  connectedCallback(){
        this.render();

        const form = this.querySelector(".change-password-form")
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const target = e.target as any
            const targetPassword = target.password.value
            const targetConfirmPassword = target.confirm.value

            const cs = state.getState()
            const userId = cs.userId

            state.updatePassword(userId, targetPassword).then((res) => {
                console.log(res)

                cs.password = targetPassword

                console.log(targetPassword)
            })

            Router.go('./lost-pets')

        })
        
    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="change-password-section">
               <h2 class="title">Contraseña</h2>
               <form class="change-password-form">
                   <div class="input-container">
                       <label class="password-container">
                           <span class="password-text">Contraseña</span>
                           <input class="password-input" type="text" name="password" placeholder="●●●●●●●●" required>
                       </label>
                       <label class="confirm-password-container">
                           <span class="confirm-password-text">Confirmar contraseña</span>
                           <input class="confirm-password-input" type="text" name="confirm" placeholder="●●●●●●●●" required>
                       </label>
                   </div>
                   <button class="save-button">Guardar</button>
               </form>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .change-password-section{
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-around;
                height: 100vh;
                background-color: #CA9227;
            }

            .title{
                margin: 50px 0px ;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-size: 40px;
                font-style: normal;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .title{
                    font-size: 50px;
                }
            }

            .change-password-form{
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 250px;
            }
            @media (min-width: 760px){
                .change-password-form{
                    gap: 200px;
                }
            }

            .input-container{
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 20px;
            }

            .password-container,
            .confirm-password-container{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 7px;
            }

            .password-text,
            .confirm-password-text{
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                font-size: 20px;
            }
            @media (min-width: 760px){
                .password-text,
                .confirm-password-text{
                    font-size: 23px;
                }
            }

            .password-input,
            .confirm-password-input{
                width: 100%;
                max-width: 320px;
                padding: 18px 20px;
                border: none;
                border-radius: 20px;
                font-size: 16px;
            }
            @media (min-width: 760px){
                .password-input,
                .confirm-password-input{
                    max-width: 350px;
                    font-size: 18px;
                }
            }

            .save-button{
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

            .save-button:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('change-password-page', ChangePassword);