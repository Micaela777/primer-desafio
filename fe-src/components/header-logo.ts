export function initHeaderLogoComponent() {

    const logo = require("url:../img/paw.png");

    class HeaderLogo extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "header-logo";
            div.innerHTML = `
                <img class="logo-img" src="${logo}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
                .header-logo{
                    width: 100%;
                }

                .logo-img{
                    height: 50px;
                    width: 50px;
                }

                .logo-img:hover{
                    cursor: pointer;
                }
               
            `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-header-logo', HeaderLogo);
};