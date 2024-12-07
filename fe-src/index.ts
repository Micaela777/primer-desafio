import "./router";
import "./pages/home";
import "./pages/sign-up";
import "./pages/sign-in";
import "./pages/pet-finder-info";
import "./pages/current-user-location";
import "./pages/lost-pets-nearby";
import "./pages/user-data";
import "./pages/modify-user-data";
import "./pages/change-password";
import "./pages/my-pets-reported";
import "./pages/report-pet";
import "./pages/modify-pet-data";

import { initHeaderComponent } from "./components/header";
import { initHeaderLogoComponent } from "./components/header-logo";
import { initHeaderMenuComponent } from "./components/header-menu";
import { initHeaderMenuCloseComponent } from "./components/header-menu-close";
import { initMainLogoComponent } from "./components/main-logo";
import { initButtonComponent } from "./components/button";
import { initReportLogoComponent } from "./components/report-logo";

(function () {
    initHeaderComponent();
    initHeaderLogoComponent();
    initHeaderMenuComponent();
    initHeaderMenuCloseComponent();
    initMainLogoComponent();
    initButtonComponent();
    initReportLogoComponent();

})();