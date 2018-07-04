import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/Login',
        name: 'Login',
        component: Login
    }, {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp
    }]
});
