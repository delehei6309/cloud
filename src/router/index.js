import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import {setTitle} from '../tools/operation';
import Login from '../containers/Login';
import Menus from '../containers/Menus';
import Home from '../containers/Home';
import Information from '../containers/Information';
import Authentication from '../containers/Authentication';
import UserInfor  from '../containers/UserInfor';
import ProductManagement  from '../containers/ProductManagement';
import UserInforDetail  from '../containers/UserInforDetail';
import ProductDetail  from '../containers/ProductDetail';
import ExchangeManagement  from '../containers/ExchangeManagement';
import ForgetPassword from '../containers/ForgetPassword';
import DataStatistics from '../containers/DataStatistics';
import BillRecord from '../containers/BillRecord';
import BillRecordDetail from '../containers/BillRecordDetail';
const title = '开放平台';
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
        path:'/forget-password',
        component:ForgetPassword,
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
                path:'authentication',
                name:'authentication',
                component:Authentication,
                meta: {
                    title: title
                },
            },
            {
                path:'user-infor',
                name:'user-infor',
                component:UserInfor,
                meta: {
                    title: title
                }
            },
            {
                path:'product-management',
                name:'product-management',
                component:ProductManagement,
                meta: {
                    title: title
                }
            },
            {
                path:'product-detail',
                name:'product-detail',
                component:ProductDetail,
                meta: {
                    title: title
                }
            },
            {
                path:'user-infor-detail',
                name:'user-infor-detail',
                component:UserInforDetail,
                meta: {
                    title: title
                }
            },
            {
                path:'product-detail',
                name:'product-detail',
                component:ProductDetail,
                meta: {
                    title: title
                }
            },
            {
                path:'exchange-management',
                name:'exchange-management',
                component:ExchangeManagement,
                meta: {
                    title: title
                }
            },
            {
                path:'data-statistics',
                name:'data-statistics',
                component:DataStatistics,
                meta: {
                    title: title
                }
            },
            {
                path:'/home',
                component:Home,
                meta: {
                    title: title,
                },
            },
            {
                path:'/information',
                component:Information,
                meta: {
                    title: title,
                },
            },
            {
                path:'bill-record',
                name:'bill-record',
                component:BillRecord,
                meta: {
                    title: title,
                },
            },
            {
                path:'bill-record-detail',
                name:'bill-record-detail',
                component:BillRecordDetail,
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
    redirect: '/menus/authentication'
});
export default new Router({
    mode: 'history',
    routes
})