export function initMainLogoComponent() {

    const logo = require("url:../img/zoo.png");

    class MainLogo extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "main-logo";
            div.innerHTML = `
                <img class="main-logo-img" src="${logo}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
                .main-logo{
                    width: 100%;
                }

                .main-logo-img{
                    height: 250px;
                    width: 250px;
                }
            `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-main-logo', MainLogo);
};