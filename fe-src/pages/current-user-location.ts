import { Router } from '@vaadin/router';
import { state } from '../state';
import { initMap } from '../../lib/mapbox';

class CurrentUserLocation extends HTMLElement{
  connectedCallback(){
        this.render();

        const locationButton = this.querySelector(".user-location-button")
        locationButton.addEventListener('click', (e) => {
            e.preventDefault()
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude; 
                    const lng = position.coords.longitude

                    console.log("la lng es", lng, "la latitud es", lat)
                    Router.go('./lost-pets')
                })
            } else {
                console.log("por alguna razón no se lee")
            }
        })
    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="current-user-location-section">
               <custom-main-logo></custom-main-logo>
               <h3 class=info-text>A continuación, necesitaremos que nos brindes tu ubicación actual.</h3>
               <custom-button class="user-location-button">Dar mi ubicación</custom-button>
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .current-user-location-section{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                gap: 25px;
                background-color: #CA9227;
            }

            .info-text{
                max-width: 300px;
                text-align: center;
                margin: 0;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-style: normal;
                font-size: 18px;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .info-text{
                    max-width: 600px;
                    font-size: 23px;
                }
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('current-user-location-page', CurrentUserLocation);