import "./router";
import "./pages/home";
import "./pages/sign-up";
import "./pages/sign-in";
import "./pages/pet-finder-info";

import { initHeaderComponent } from "./components/header";
import { initHeaderLogoComponent } from "./components/header-logo";
import { initHeaderMenuComponent } from "./components/header-menu";
import { initHeaderMenuCloseComponent } from "./components/header-menu-close";
import { initMainLogoComponent } from "./components/main-logo";
import { initButtonComponent } from "./components/button";

(function () {

    initHeaderComponent();
    initHeaderLogoComponent();
    initHeaderMenuComponent();
    initHeaderMenuCloseComponent();
    initMainLogoComponent();
    initButtonComponent();

})();