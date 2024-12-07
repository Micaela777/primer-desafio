import { Router } from '@vaadin/router';
import { state } from '../state';

class SignIn extends HTMLElement{
  connectedCallback(){
        this.render();

        const form = this.querySelector(".sign-in-form")
            form.addEventListener('submit', (e) => {
                e.preventDefault()

                const target = e.target as any
                const targetEmail = target.email.value
                const targetPassword = target.password.value

                state.signIn(targetEmail, targetPassword).then((res) => {
                    state.getUser().then((res) => {
                        const id = res.id
                        const cs = state.getState()
                        cs.userId = id
                        state.setUserData(targetEmail, targetPassword)
                    })

                    if(res.message == "confirmed"){
                        console.log("habemus usuario")
                        Router.go('./lost-pets')
                    } else if(res.message == "null"){
                        const errorText = this.querySelector(".error-text") as HTMLElement
                        errorText.style.display = "inherit"

                        setTimeout(() => {
                        errorText.style.display = "none"
                        }, 4000)
                        
                    }
                })
            })

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="sign-in-section">
                <div class="first-text-container">
                    <h2 class="sign-in-text">Iniciar Sesión</h2>
                    <h3 class="enter-data">Ingresá los siguientes datos para iniciar sesión.</h3>
               </div>
               <form class="sign-in-form">
                    <div class="fieldset-container">
                        <input class="email-input" type="text" name="email" placeholder="Email" required>
                        <input class="password-input" type="text" name="password" placeholder="Contraseña" required>
                    </div>
                    <h2 class="error-text">✗ Email o contraseña incorrectos.</h2>
                    <h3 class="forgotten-password">Olvidé mi contraseña</h3>
                    <button class="next-button">Acceder</button>
                </form> 
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .sign-in-section{
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 35px;
                gap: 55px;
                background-color: #CA9227;
            }

            .first-text-container{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }

            .sign-in-text{
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-size: 60px;
                font-style: normal;
                text-align: center;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .sign-up-text{
                    font-size: 70px;
                }
            }
            
            .enter-data{
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-style: normal;
                padding: 0px 15px 0px 15px;
                text-align: center;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .enter-data{
                    font-size: 20px;
                }
            }

            .sign-in-form{
                width: 100%;
                max-width: 350px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .fieldset-container{
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .email-input,
            .password-input,
            .confirm-password-input{
                padding: 18px 20px;
                border: none;
                border-radius: 20px;
                font-size: 16px;
            }
            @media (min-width: 760px){
                .email-input,
                .password-input,
                .confirm-password-input{
                    font-size: 18px;
                }
            }

            .error-text{
                display: none;
                margin: 10px;
                text-align: center;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-size: 20px;
                font-style: normal;
                color: #b01919;
            }

            .forgotten-password{
                margin: 0;
                padding: 12px 0px 26px 0px;
                text-decoration: underline;
                text-align: center;
                font-size: 15px;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-style: normal;
                color: #FAF7EE;
            }

            .forgotten-password:hover{
                cursor: pointer;
                color: #ede1d5;
            }

            .next-button{
                border: none;
                border-radius: 50px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }

            .next-button:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('sign-in-page', SignIn);