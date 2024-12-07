import { Router } from '@vaadin/router';
import { state } from '../state';

class MyPetsReported extends HTMLElement{
  connectedCallback(){
        this.render(); 
    };

    render(){

        state.getUser().then((res) => {
            const id = res.id
            const cs = state.getState()
            cs.userId = id
        })
        
        this.innerHTML = `
            <custom-header></custom-header>
            <h2 class="title">Mis mascotas reportadas:</h2> 
            `
            state.getAllPets().then((res) => {
                if(res.length > 0){
                    res.forEach(pet => {
                        this.innerHTML += `
                            <div class="pet-card-section">
                                <div class="pet-card-container">
                                    <img src="${pet.pictureURL}" class="pet-image">
                                    <div class="info-container">
                                        <div class="pet-text-container">
                                            <h2 class="pet-name">${pet.name}</h2>
                                            <h4 class="pet-location">${pet.location}</h4>
                                        </div>
                                        <button class="edit-button">Editar ✎</button>
                                    </div>
                                </div>
                            </div>
                        `

                        const editButton = this.querySelector(".edit-button")
                        editButton.addEventListener('click', (e) => {
                        e.preventDefault()
                        Router.go('./update-pet')
                    })
                    });
                            
                } else {
                    this.innerHTML += `
                        <div class="no-pets-reported-section">
                            <h2 class="no-reports-title">Aún no reportaste mascotas perdidas.</h2>
                            <custom-report-logo></custom-report-logo>
                            <button class="publish-report">Publicar reporte</button>
                        </div>
                    `

                    const button = this.querySelector(".publish-report")
                    button.addEventListener('click', (e) => {
                        e.preventDefault()
                        Router.go('./report-pet')
                    })
                }
    
            })

        const style = document.createElement("style");
        style.innerHTML = `
            .title{
                margin: 0px;
                padding-top: 55px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-size: 40px;
                font-style: normal;
                text-align: center;
                color: #FAF7EE;
                background-color: #CA9227;
            }
            @media (min-width: 760px){
                .title{
                    font-size: 50px;
                }
            }

            .pet-card-section{
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 20px;
                background-color: #CA9227;
            }

            .pet-card-container{
                width: 100%;
                max-width: 700px;
                display: flex;
                flex-direction: column;
                padding: 20px 15px;
                margin: 0px 30px;
                align-items: center;
                border-radius: 20px;    
                overflow: auto;
                background-color: #26302E
            }

            .pet-image{
                width: 300px;
                border-radius: 20px;
            }

            .info-container{
                width: 100%;
                justify-content: space-around;
                margin-top: 18px;
                display: flex;
                flex direction: row;
                gap: 100px;
            }

            .pet-name{
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 400;
                font-size: 35px;
                font-style: normal;
                color: #ffffff;
            }

            .pet-location{
                font-family: "Roboto", system-ui;
                font-weight: 400;
                font-size: 20px;
                margin: 0px;
                color: #ffffff;
            }

            .edit-button{
                font-size: 17px;
                height: 50px;
                border: none;
                border-radius: 7px;
                background-color: #6b8fd1;
                padding: 10px;
                color: #ffffff;
            }
            .edit-button:hover{
                cursor: pointer;
                background-color: #4f71b0;
            }

            .no-pets-reported-section{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                height: 100vh;
                background-color: #CA9227;
            }

            .no-reports-title{
                max-width: 250px;
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-size: 20px;
                font-style: normal;
                color: #ffffff;
                text-align: center;
            }
            @media (min-width: 760px){
                .no-reports-title{
                    max-width: none;
                    font-size: 30px;
                }
            }

            .publish-report{
                border: none;
                border-radius: 50px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }

            .publish-report:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }
        `;

        this.appendChild(style)

    };
};
customElements.define('my-pets-reported-page', MyPetsReported);