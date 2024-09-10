export function initHeaderMenuCloseComponent() {

    const x = require("url:../img/x.png");

    class HeaderMenuClose extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "header-menu-close";
            div.innerHTML = `
                <img class="menu-close-img" src="${x}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
                .header-menu-close{
                    width: 100%;
                }

                .menu-close-img{
                    height: 50px;
                    width: 50px;
                }

                .menu-close-img:hover{
                    cursor: pointer;
                }
            `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-menu-close', HeaderMenuClose);
};