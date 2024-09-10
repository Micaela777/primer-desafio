export function initHeaderMenuComponent() {

    const menu = require("url:../img/menu.png");

    class HeaderMenu extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "header-menu";
            div.innerHTML = `
                <img class="menu-img" src="${menu}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
                .header-menu{
                    width: 100%;
                }

                .menu-img{
                    height: 50px;
                    width: 50px;
                }

                .menu-img:hover{
                    cursor: pointer;
                }
            `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-header-menu', HeaderMenu);
};