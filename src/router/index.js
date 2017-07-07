import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import {setTitle} from '../tools/operation';
import Login from '../containers/Login';
import Menus from '../containers/Menus';
import Home from '../containers/Home';
import Authentication from '../containers/Authentication';
import UserInfor  from '../containers/UserInfor';
import ProductManagement  from '../containers/ProductManagement';
import ProductDetail  from '../containers/ProductDetail';
import UserInforDetail  from '../containers/UserInforDetail';
import ForgetPassword from '../containers/ForgetPassword'
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
        path:'/login',
        component:Login,
        meta: {
            title: '登录',
        },
    },
    {
        path:'/forget-password',
        component:ForgetPassword,
        meta: {
            title: '忘记密码',
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
            },
            {
                path:'product-detail',
                name:'product-detail',
                component:ProductDetail,
                meta: {
                    title: '定期产品详情'
                }
            },  
            {
                path:'user-infor-detail',
                name:'user-infor-detail',
                component:UserInforDetail,
                meta: {
                    title: '用户信息详情'
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
