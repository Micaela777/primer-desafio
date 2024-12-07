import { Router } from '@vaadin/router';
import { state } from '../state';
import Dropzone from "dropzone";
import { initMap, initSearchForm } from '../../lib/mapbox';
import mapboxgl from 'mapbox-gl'

class UpdatePetData extends HTMLElement{
  connectedCallback(){
        this.render();

        let pictureFile

        const myDropzone = new Dropzone(".pet-picture-container", {
            url: "/falsa",
            autoProcessQueue: false,
            thumbnailWidth: 250,
            thumbnailHeight: 250,
          });

        myDropzone.on("thumbnail", function (file) {
            pictureFile = file.dataURL
            file.previewElement.querySelector(".dz-details").remove()
            file.previewElement.querySelector(".dz-progress").remove()
            file.previewElement.querySelector(".dz-error-message").remove()
            file.previewElement.querySelector(".dz-success-mark").remove()
            file.previewElement.querySelector(".dz-error-mark").remove()
        });

        const clickable = this.querySelector(".pet-picture-container") 
        clickable.addEventListener('click', (e) => {
            e.preventDefault()
            const pictureText = this.querySelector(".text") as HTMLElement
            pictureText.style.display = "none"
        })

        const addCharacteristics = this.querySelector(".edit-characteristics-form")
        addCharacteristics.addEventListener("submit", (e) => {
            e.preventDefault()
            const target = e.target as any
            const targetName = target.pet.value
            
            state.uploadPetName(targetName)
                
            if(pictureFile == undefined){
                const errorText = this.querySelector(".error-text") as HTMLElement
                    errorText.style.display = "inherit"
                    setTimeout(() => {
                        errorText.style.display = "none"
                    }, 4000)
            } else {
                state.uploadPetPhoto(pictureFile)
            }
        })

        initMap().then((map) => {
            
            const mapForm = this.querySelector(".map-form")
            mapForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const target = e.target as any
                const targetLocation = target.location.value

                initSearchForm(targetLocation, function (results) {

                    state.uploadPetLocation(targetLocation)

                    const firstResult = results[0];
                    const marker = new mapboxgl.Marker().setLngLat(firstResult.geometry.coordinates).addTo(map);
                    const [lng, lat] = firstResult.geometry.coordinates;
                
                    if (typeof lng === 'number' && typeof lat === 'number') {
                      map.setCenter([lng, lat]); 
                      map.setZoom(13);

                      state.uploadPetLngLat(lng, lat)
                    } else {
                      console.error("Las coordenadas no son válidas:");
                    }
                })
            })
        })  

        const sendForm = this.querySelector('.edit-report-pet-button')
        sendForm.addEventListener('click', (e) => {
            e.preventDefault()
            const cs = state.getState()
            const name = cs.petName
            const location = cs.petLocation
            const lng = cs.petLng
            const lat = cs.petLat

            if(!name || !pictureFile || !location || !lat || !lng){
                const missingDataText = this.querySelector(".missing-data-error-text") as HTMLElement
                missingDataText.style.display = "inherit"
                setTimeout(() => {
                    missingDataText.style.display = "none"
                }, 4000)
            } else {
                state.editReport(name, pictureFile, location, lng, lat).then((data) => {
                    console.log(data)
                })
                Router.go('./lost-pets')
            }
        })
    };

    render(){
        this.innerHTML = `
            <custom-header></custom-header>
            <div class="update-pet-section">
                <h2 class="edit-report-pet-title">Editar reporte de mascota</h2>
                <div class="edit-report-pet-container">
                    <form class="edit-characteristics-form">
                        <input class="pet-name-input" type="text" name="pet" placeholder="Nombre" required> 
                        <div class="pet-picture-container">
                            <h2 class="text">Arrastra tu foto aquí</h2>
                        </div>
                        <h2 class="error-text">Por favor, para continuar agrega una foto.</h2>
                        <button class="add-characteristics">Modificar foto</button>
                    </form>    
                    <form class="map-form">
                        <div id='map' class="mapbox"></div>
                        <h3 class="map-text">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</h3>
                        <input class="location-input" type="text" name="location" placeholder="Ubicación" required> 
                        <button class="map-search-button">Modificar</button>
                    </form>
                    <h2 class="missing-data-error-text">Algunos datos del formulario están incompletos.</h2>
                    <button class="edit-report-pet-button">Guardar</button>
                    <button class="found-button">Reportar como encontrado</button>
                    <button class="cancel-button">Eliminar reporte</button>
                </div>    
            </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
            .update-pet-section{
                padding: 20px 0px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #CA9227;
            }

            .edit-report-pet-title{
                margin: 0px;
                padding: 70px 0px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-size: 40px;
                font-style: normal;
                text-align: center;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .edit-report-pet-title{
                    font-size: 60px;
                }
            }

            .edit-report-pet-container{
                margin-bottom: 20px;
                width: 100%;
                max-width: 320px;
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 30px;
            }
            @media (min-width: 760px){
                .edit-report-pet-container{
                    width: 100%;
                    max-width: none;
                }
            }

            .edit-characteristics-form{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .pet-name-input{
                width: 100%;
                max-width: 350px;
                margin-bottom: 10px;
                padding: 18px 20px;
                border: none;
                border-radius: 20px;
                font-size: 16px;
            }

            .pet-picture-container{
                width: 100%;
                max-width: 650px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 350px;
                border-radius: 10px;
                padding: 20px;
                background-color: #FAF7EE;
            }

            .text{
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-size: 20px;
                font-style: normal;
                color: #b0a9a0;
            }

            .error-text,
            .missing-data-error-text{
                display: none;
                margin: 10px;
                text-align: center;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-size: 20px;
                font-style: normal;
                color: #b01919;
            }

            .add-characteristics{
                width: 100%;
                max-width: 350px;
                border: none;
                border-radius: 50px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }
            .add-characteristics:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }

            .map-form{
                display: flex;
                margin-bottom: 25px;
                align-items: center;
                flex-direction: column;
                gap: 30px;
            }

            .mapbox{
                height: 400px;
                width: 100%;
                max-width: 650px;
                margin-top: 20px;
                border-radius: 10px;
                
            }

            .map-text{
                margin: 0px;
                font-family: "Roboto", system-ui;
                font-weight: 300;
                font-size: 15px;
                font-style: normal;
                text-align: center;
                color: #FAF7EE;
            }
            @media (min-width: 760px){
                .map-text{
                    font-size: 20px;
                    width: 100%;
                    max-width: 600px;
                }
            }

            .location-input{
                width: 100%;
                max-width: 350px;
                padding: 18px 20px;
                border: none;
                border-radius: 20px;
                font-size: 16px;
            }

            .map-search-button{
                width: 100%;
                max-width: 200px;
                border: none;
                border-radius: 50px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }
            .map-search-button:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }

            .edit-report-pet-button{
                width: 100%;
                max-width: 350px;
                border: none;
                border-radius: 50px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }

            .cancel-button{
                width: 100%;
                max-width: 350px;
                border: none;
                border-radius: 50px;
                margin-bottom: 20px;
                padding: 12px 55px;
                font-size: 19px;
                font-family: "Roboto", system-ui;
                font-weight: 500;
                font-style: normal;
                color: #FAF7EE;
                background-color: #2b2827;
            }

            .edit-report-pet-button:hover{
                cursor: pointer;
                background-color: #f0e6dd;
            }

            .cancel-button:hover{
                cursor: pointer;
                background-color: #383433;
            }
        `;

        this.appendChild(style)
    };
};
customElements.define('update-pet-page', UpdatePetData);