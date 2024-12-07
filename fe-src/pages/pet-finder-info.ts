import { Router } from '@vaadin/router';

class PetFinderInfo extends HTMLElement{
  connectedCallback(){
        this.render();

    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="petfinder-info-section">
               <div class="info-container">
                   <h2 class="text">Pet Finder App es una WebApp para mascotas perdidas que permite a los dueños 
                   reportar la desaparición de su mascota llenando un formulario con su nombre, foto 
                   y ubicación. Cuando alguien ve una mascota que coincide con la información, puede 
                   reportar el avistamiento indicando lugar y detalles. La webapp envía notificaciones automáticas al 
                   dueño cuando se registra un avistamiento cercano, permitiéndoles seguir la posible 
                   ubicación de su mascota.</h2>
               </div>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .petfinder-info-section{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: #CA9227;
            }

            .info-container{
                max-width: 420px;
                margin: 20px;
                padding: 40px;
                border-radius: 15px;
                background-color: #FAF7EE;
            }
            @media (min-width: 769px){
                .info-container{
                    max-width: 890px;
                    padding: 70px;
                }
            }

            .text{
                margin: 0;
                font-family: "Roboto", system-ui;
                font-weight: 400;
                font-size: 19px;
                font-style: normal;
            }
            @media (min-width: 769px){
                .text{
                    font-size: 22px;
                }
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('pet-finder-info-page', PetFinderInfo);