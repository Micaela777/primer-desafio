import { Router } from '@vaadin/router';
import { state } from '../state';

class ModifyUserData extends HTMLElement{
  connectedCallback(){
        this.render();

        const form = this.querySelector(".modify-data-form")
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const target = e.target as any
            const targetName = target.name.value
            const targetLocation = target.location.value

            const cs = state.getState()
            const userId = cs.userId

            state.updateUserData(userId, targetName, targetLocation).then((res) => {
                console.log(res)

                cs.fullName = targetName
                cs.userLocation = targetLocation

                console.log(targetLocation)
            })

            Router.go('./lost-pets')

        })

    };

    render(){

        const cs = state.getState()

        const name = cs.fullName
        const location = cs.userLocation


        this.innerHTML = `
            <custom-header></custom-header>
            <div class="modify-user-data-section">
               <h2 class="title">Datos personales</h2>
               <form class="modify-data-form">
                   <div class="input-container">
                       <label class="name-container">
                           <span class="name-text">Nombre</span>
                           <input class="name-input" type="text" name="name" placeholder=${name} required>
                       </label>
                       <label class="location-container">
                           <span class="location-text">Localidad</span>
                           <input class="location-input" type="text" name="location" placeholder=${location} required>
                       </label>
                   </div>
                   <button class="save-button">Guardar</button>
               </form>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .modify-user-data-section{
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

            .modify-data-form{
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 250px;
            }
            @media (min-width: 760px){
                .modify-data-form{
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

            .name-container,
            .location-container{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 7px;
            }

            .name-text,
            .location-text{
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                font-size: 20px;
            }
            @media (min-width: 760px){
                .name-text,
                .location-text{
                    font-size: 23px;
                }
            }

            .name-input,
            .location-input{
                width: 100%;
                max-width: 320px;
                padding: 18px 20px;
                border: none;
                border-radius: 20px;
                font-size: 16px;
            }
            @media (min-width: 760px){
                .name-input,
                .location-input{
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
customElements.define('modify-user-data-page', ModifyUserData);