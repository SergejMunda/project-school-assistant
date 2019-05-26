import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import Registration from './views/Registration.vue';
import Events from './views/Events.vue';
import Food from './views/Restaurants.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: Dashboard,
        },
        {
            path: '/register',
            name: 'register',
            component: Registration,
        },
        {
            path: '/events',
            name: 'events',
            component: Events,
        },
        {
            path: '/food',
            name: 'food',
            component: Food,
        },

    ],
});