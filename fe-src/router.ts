import { Router } from "@vaadin/router";

const router = new Router(document.querySelector('.root'));
router.setRoutes([
    { path: '/', component: 'home-page' },
    { path: '/pet-finder-info', component: 'pet-finder-info-page' },
    { path: '/sign-up', component: 'sign-up-page' },
    { path: '/sign-in', component: 'sign-in-page' },
    { path: '/user-location', component: 'current-user-location-page' },
    { path: '/lost-pets', component: 'lost-pets-page' },
    { path: '/user-data', component: 'user-data-page' },
    { path: '/modify-user-data', component: 'modify-user-data-page' },
    { path: '/change-password', component: 'change-password-page' },
    { path: '/my-pets-reported', component: 'my-pets-reported-page' },
    { path: '/report-pet', component: 'report-pet-page' },
    { path: '/update-pet', component: 'update-pet-page' },
  ]);