import Vue from 'vue';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import {setTitle} from '../tools/operation';
import Login from '../containers/Login';
import Menus from '../containers/Menus';
import Home from '../containers/Home';
import Withdraw from '../containers/Withdraw';
const title = '平台';
let routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/login',
        component:Login,
        meta: {
            title: title,
        },
    },
    {
        path:'/menus',
        name:'menus',
        component:Menus,
        meta: {
            title: title
        },
        children:[
            {
                path:'/home',
                component:Home,
                meta: {
                    title: title,
                },
            },
            {
                path:'withdraw',
                name:'withdraw',
                component:Withdraw,
                meta: {
                    title: title,
                },
            }
        ]
    }
];
routes.map(route => {
    route.beforeEnter = (to, from, next)=>{
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        next();
    };
});
routes.push({
    path: '*',
    redirect: '/menus/Home'
});
export default new Router({
    mode: 'history',
    routes
})