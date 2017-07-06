import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import {setTitle} from '../tools/operation';

/*import Login from '../containers/Login';*/
import Menus from '../containers/Menus';
import Home from '../containers/Home';
import Authentication from '../containers/Authentication';
import UserManagement  from '../containers/UserManagement';
import UserInfor  from '../containers/UserInfor';
import ProductManagement  from '../containers/ProductManagement';
let routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta: {
            title: '首页',
        },
    },
    {
        path:'/menus',
        name:'menus',
        component:Menus,
        meta: {
            title: '菜单'

        },
        children:[
            {
                path:'authentication',
                name:'authentication',
                component:Authentication,
                meta: {
                    title: '资质认证'
                },
            },
            {
                path:'user-management',
                name:'user-management',
                component:UserManagement,
                meta: {
                    title: '用户管理'
                }
            }
            ,
            {
                path:'user-infor',
                name:'user-infor',
                component:UserInfor,
                meta: {
                    title: '用户信息'
                }
            },
            {
                path:'product-management',
                name:'product-management',
                component:ProductManagement,
                meta: {
                    title: '产品管理'
                }
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
    redirect: '/menus/authentication'
});
export default new Router({
    mode: 'history',
    routes
})
