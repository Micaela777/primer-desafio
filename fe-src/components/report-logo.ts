export function initReportLogoComponent() {

    const logo = require("url:../img/reporte.png");

    class ReportLogo extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "report-logo";
            div.innerHTML = `
                <img class="report-logo-img" src="${logo}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
                .report-logo{
                    width: 100%;
                }

                .report-logo-img{
                    height: 300px;
                    width: 300px;
                }
                @media (min-width: 760px){
                .report-logo-img{
                    height: 400px;
                    width: 400px;
                }
            }
            `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-report-logo', ReportLogo);
};