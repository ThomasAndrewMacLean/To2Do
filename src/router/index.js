import Vue from 'vue';
import Router from 'vue-router';
import Todoos from '@/components/Todoos';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Settings from '@/components/Settings';
import Confirm from '@/components/Confirm';
import Admin from '@/components/Admin';
import Home from '@/components/Home';
import {
    api
} from '@/api/api';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },{
            path: '/To2Do',
            name: 'todoosPage',
            component: Todoos
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

                fetch(api + 'admin/isadmin', {
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
                });
            }
        }]
});
