export function initButtonComponent() {

    class Button extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const button = document.createElement('button');
            button.className = "button";
            button.textContent = this.textContent;

            const style = document.createElement('style');

            style.innerHTML = `
            .button{
                width: 100%;
                border: none;
                border-radius: 50px;
                padding: 9px 55px;
                font-size: 19px;
                font-family: "Poppins", sans-serif;
                font-weight: 500;
                font-style: normal;
                background-color: #FAF7EE;
            }

            .button:hover{
                cursor: pointer;
                background-color: #ede1d5;
            }
            
          `;

            shadow.appendChild(button);
            shadow.appendChild(style);

        };
    };
    customElements.define('custom-button', Button);
};