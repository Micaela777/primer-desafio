import { Router } from '@vaadin/router';
import { state } from '../state';

class SignUp extends HTMLElement{
  connectedCallback(){
        this.render();

        const nextButton = this.querySelector(".sign-in")
        nextButton.addEventListener('click', (e) => {
            e.preventDefault()
            Router.go('./sign-in')
        })

        const form = this.querySelector(".sign-up-form")
            form.addEventListener('submit', (e) => {
                e.preventDefault()

                const target = e.target as any
                const targetEmail = target.email.value
                const targetPassword = target.password.value
                const targetConfirmPassword = target.confirmpassword.value

                if(targetPassword == targetConfirmPassword){
                    state.setUserData(targetEmail, targetPassword)
                    state.signUp().then((res) => {
                        console.log(res)
                        state.signIn(targetEmail, targetPassword).then((res) => {
                            console.log(res)
                            Router.go('./user-location')
                        })
                    })
                } else {
                    const errorText = this.querySelector(".error-text") as HTMLElement
                    errorText.style.display = "inherit"
                    setTimeout(() => {
                        errorText.style.display = "none"
                    }, 4000)
                }

            })

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="sign-up-section">
               <div class="first-text-container">
                    <h2 class="sign-up-text">Registro</h2>
                    <h3 class="enter-data">Ingresá los siguientes datos para realizar el registro.</h3>
               </div>
               <form class="sign-up-form">
                    <div class="fieldset-container">
                        <input class="email-input" type="text" name="email" placeholder="Email" required>
                        <input class="password-input" type="text" name="password" placeholder="Contraseña" required>
                        <input class="confirm-password-input" type="text" name="confirmpassword" placeholder="Confirmar contraseña" required>
                    </div>
                    <h2 class="error-text">✗ ¡Las contraseñas no coinciden!</h2>
                    <button class="next-button">Siguiente</button>
                </form> 
                <h3 class="account">¿Ya tienes una cuenta? <span class="sign-in">Iniciar sesión</span></h3>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .sign-up-section{
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

            .sign-up-text{
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-size: 60px;
                font-style: normal;
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
                text-align: center;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .enter-data{
                    font-size: 20px;
                }
            }

            .sign-up-form{
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

            .sign-in{
                text-decoration: underline; 
                color: #FAF7EE;
            }

            .sign-in:hover{
                cursor: pointer;
                color: #ede1d5;
            }

           .account{
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-style: normal;
                margin: 0px;
                color: #FAF7EE;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('sign-up-page', SignUp);