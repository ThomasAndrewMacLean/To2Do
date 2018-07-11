import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Settings from '@/components/Settings';
import Confirm from '@/components/Confirm';
import Admin from '@/components/Admin';
import {
    api
} from '@/api/api';
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
    }, {
        path: '/Confirm',
        name: 'Confirm',
        component: Confirm
    }, {
        path: '/Settings',
        name: 'Settings',
        component: Settings
    }, {
        path: '/Admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: (to, from, next) => {
            this.auth = 'Bearer ' + localStorage.getItem('token');
            if (localStorage.getItem('googleToken')) {
                this.auth = 'Google ' + localStorage.getItem('googleToken');
            }

            fetch(api + 'isadmin', {
                headers: {
                    'Authorization': this.auth
                },
                method: 'GET'
            }).then(x => x.json().then(y => {
                if (y.admin) {
                    next();
                } else {
                    next(false);
                }

            })).catch(err => {
                console.log(err);
            });
        }
    }]
});
