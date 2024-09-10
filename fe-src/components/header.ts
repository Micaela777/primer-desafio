import { Router } from '@vaadin/router';

export function initHeaderComponent() {

    class Header extends HTMLElement{
        connectedCallback(){
              this.render();

              const homeButton = this.querySelector('.home-button')
              homeButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  Router.go('./');
        });

          };
      
          render(){
              this.innerHTML = `
                  <div class="header-comp">
                      <custom-header-logo class="home-button"></custom-header-logo>
                      <custom-header-menu class="menu-button"></custom-header-menu>
                      <div class="menu-container">
                          <custom-menu-close></custom-menu-close>
                          <h2 class="my-data">Mis datos</h2>
                          <h2 class="reported-pets">Mascotas reportadas</h2>
                          <h2 class="report-pet">Reportar mascota</h2>
                          <h3 class="email">medimica@gmail.com</h3>
                          <h3 class="log-out">CERRAR SESIÓN</h3>
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

                  .menu-container{
                      height: 100%;
                      width: 100%;
                      position: absolute;
                      top: 0;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      background-color: #FAF7EE;
                  }

                  .my-data, 
                  .reported-pets,
                  .report-pet{
                      font-family: "Poppins", sans-serif;
                      font-weight: 500;
                      font-style: normal;
                  }

                  .email,
                  .log-out{
                      font-family: "Poppins", sans-serif;
                      font-weight: 300;
                      font-style: normal;
                  }
              `;
      
              this.appendChild(style)
          };
      };
      customElements.define('custom-header', Header);
}