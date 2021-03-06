
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';

window.Vue.use(VueRouter);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('login', require('./components/Login.vue'));
Vue.component('register', require('./components/Register.vue'));
Vue.component('left-sidebar', require('./components/Sidebar.vue'));
Vue.component('dashboard', require('./components/Dashboard.vue'));
Vue.component('task', require('./components/Task.vue'));
Vue.component('profile', require('./components/profile.vue'));

import Example from './components/ExampleComponent.vue';
const routes = [
    {
        path: '/',
        components: {
            Example: Example
        }
    }
]

const app = new Vue({
    el: '#app'
});
