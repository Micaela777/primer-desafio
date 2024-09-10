import { Router } from "@vaadin/router";

const router = new Router(document.querySelector('.root'));
router.setRoutes([
    { path: '/', component: 'home-page' },
    { path: '/pet-finder-info', component: 'pet-finder-info-page' },
    { path: '/sign-up', component: 'sign-up-page' },
    { path: '/sign-in', component: 'sign-in-page' },
    
  ]);