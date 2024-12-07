import { Router } from '@vaadin/router';
import { state } from '../state';

export function initHeaderComponent() {

    class Header extends HTMLElement{
        connectedCallback(){
              this.render();

              const menuContainer = this.querySelector('.menu-container') as HTMLElement

              const menuCloseButton= this.querySelector('.menu-close-button')
              menuCloseButton.addEventListener('click', (e) => {
                e.preventDefault()
                menuContainer.style.display = "none"
              })

              const homeButton = this.querySelector('.home-button')
              homeButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  Router.go('./');
              });

              const menuButton = this.querySelector('.menu-button')
              menuButton.addEventListener( 'click', (e) => {
                e.preventDefault()
                menuContainer.style.display = "flex"
                menuContainer.style.flexDirection = "column"
                menuContainer.style.alignItems = "center"
                menuContainer.style.justifyContent = "center"
              })

              const userDataDesktop = this.querySelector('.my-data-desktop')
              userDataDesktop.addEventListener('click', (e) => {
                e.preventDefault()
                Router.go('./user-data')
              })

              const reportedPetsDesktop = this.querySelector('.reported-pets-desktop')
              reportedPetsDesktop.addEventListener('click', (e) => {
                e.preventDefault()
                Router.go('./my-pets-reported')
              })

              const reportPetMovileDesktop = this.querySelector('.report-pet-desktop')
              reportPetMovileDesktop.addEventListener('click', (e) => {
                e.preventDefault()
                Router.go('./report-pet')
              })

              const userData = this.querySelector('.my-data')
              userData.addEventListener('click', (e) => {
                e.preventDefault()
                Router.go('./user-data')
              })

              const reportedPets = this.querySelector('.reported-pets')
              reportedPets.addEventListener('click', (e) => {
                e.preventDefault()
                Router.go('./my-pets-reported')
              })

              const reportPetMovile = this.querySelector('.report-pet')
              reportPetMovile.addEventListener('click', (e) => {
                e.preventDefault()
                Router.go('./report-pet')
              })
          };
      
          render(){
            
            const cs = state.getState();
            const userEmail = cs.email;

              this.innerHTML = `
                  <div class="header-comp">
                      <custom-header-logo class="home-button"></custom-header-logo>
                      <custom-header-menu class="menu-button"></custom-header-menu>
                      <div class ="menu-options">
                          <h3 class="my-data-desktop">Mis datos</h3>
                          <h3 class="reported-pets-desktop">Mascotas</h3>
                          <h3 class="report-pet-desktop">Reportar</h3>
                      </div>
                      <div class="menu-container">
                          <custom-menu-close class="menu-close-button"></custom-menu-close>
                          <div class="text-container">
                              <h2 class="my-data">Mis datos</h2>
                              <h2 class="reported-pets">Mascotas reportadas</h2>
                              <h2 class="report-pet">Reportar mascota</h2>
                              <div class="secondary-text">
                                  <h3 class="email">${userEmail}</h3>
                                  <h3 class="log-out">CERRAR SESIÓN</h3>
                              </div>
                          </div>
                      </div>
                  </div>
              `
      
              const style = document.createElement("style");
              style.innerHTML = `
                  .header-comp{
                      display: flex;
                      justify-content: space-between;
                      padding: 11px 25px;
                      background-color: #FAF7EE;
                  }

                  @media (min-width: 769px){
                      .menu-button{
                          display: none;
                      }
                  }

                  .menu-options{
                      display: none;
                  }
                  @media (min-width: 769px){
                      .menu-options{
                          display: flex;
                          flex-direction: row;
                          align-items: center;
                          padding-right: 20px;
                          gap: 40px
                      }
                  }

                  .my-data-desktop,
                  .reported-pets-desktop,
                  .report-pet-desktop{
                      margin: 0;
                      font-family: "Roboto", system-ui;
                      font-weight: 400;
                      font-style: normal;
                  }

                  .my-data-desktop:hover,
                  .reported-pets-desktop:hover,
                  .report-pet-desktop:hover{
                      cursor: pointer;
                      color: #4d4343;
                  }

                  .menu-container{
                      display: none;
                      height: 90%;
                      width: 90%;
                      right: 0;
                      position: absolute;
                      border-radius: 20px;
                      background-color: #FAF7EE;
                  }

                  .menu-close-button{
                      position: absolute;
                      right: 35px;
                      top: 20px;
                  }

                  .text-container{
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      gap: 70px;
                  }

                  .my-data, 
                  .reported-pets,
                  .report-pet{
                      margin: 0px;
                      font-family: "Poppins", sans-serif;
                      font-weight: 500;
                      font-style: normal;
                  }

                  .secondary-text{
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      gap: 30px;
                  }

                  .email{
                      margin: 0px;
                      font-family: "Poppins", sans-serif;
                      font-weight: 300;
                      font-style: normal;
                  }

                  .log-out{
                      margin: 0px;
                      font-family: "Poppins", sans-serif;
                      font-weight: 300;
                      font-style: normal;
                      text-decoration: underline;
                      color: #2f6a91;
                  }
              `;
      
              this.appendChild(style)
          };
      };
      customElements.define('custom-header', Header);
}