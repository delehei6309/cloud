<template>
    <div>
        <cloud-header :userInfo="userInfo"></cloud-header>
        <div class="menu-warp" flex="main:justify">
            <div class="menus" flex-box="0">
                <div class="menus-list" v-for="(item,index) in menus" :key="index">
                    <div v-if="index != 0">
                        <div class="menus-parent" @click.stop="item.show = !item.show"
                             :class="[{'div-active':(divActiveIndex == index)},item.class]">{{item.text}}
                        </div>
                        <ul class="menus-ul animate" :style="{'height':item.show?item.child.length*32 + 'px' : 0}">
                            <li v-for="(lis,i) in item.child" :key="i">
                                <router-link class="menu" :to="{path:lis.path}"
                                             active-class="menu-active"
                                             replace>{{lis.text}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <div class="menus-item" :class="item.class">
                            <router-link class="menu" :to="{path:item.path}"
                                         active-class="menu-active"
                                         replace>{{item.text}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <router-view flex-box="1" class="content-view"></router-view>
        </div>
        <cloud-footer></cloud-footer>

    </div>
</template>

<script>
    import CloudHeader from '../components/CloudHeader';
    import CloudFooter from '../components/CloudFooter';
    import '../less/menus.less';
    import $api from '../tools/api';
    import {logout} from '../tools/operation';
    let menus = [
        {
            path: '/menus/authentication?channelUuid=',
            class: 'icon-authentication',
            text: '资质认证',
            show: false,
            child: [],
            allPath: []
        },
        {
            path: '',
            class: 'icon-user',
            text: '用户管理',
            show: true,
            child: [
                {
                    path: '/menus/user-infor?registerMerchantNum=00000',
                    text: '用户信息'
                }
            ],
            allPath: ['/menus/user-infor', '/menus/user-infor-detail']
        },
        {
            path: '',
            text: '产品管理',
            class: 'icon-product',
            show: true,
            child: [
                {
                    path: '/menus/product-management?merchantNum=00000',
                    text: '定期产品管理'
                }
            ],
            allPath: ['/menus/product-management', '/menus/product-detail']
        },
        {
            path: '',
            text: '交易管理',
            class: 'icon-exchange',
            show: true,
            child: [
                {
                    path: '/menus/exchange-management?belongMerchantNum=00000',
                    text: '定期订单管理'
                }
            ],
            allPath: ['/menus/exchange-management']
        },
        {
            path: '',
            text: '数据统计',
            class: 'icon-statistics',
            show: true,
            child: [
                {
                    path: '/menus/data-statistics?merchantNum=00000',
                    text: '整体概况'
                }
            ],
            allPath: ['/menus/data-statistics']
        }
    ]
    export default {
        name: 'menus',
        data(){
            return {
                animateHeight: false,
                userInfo: {},
                menus: []
            }
        },
        components: {
            CloudHeader,
            CloudFooter
        },
        computed: {
            route: function () {
                return this.$route.path;
            },
            divActiveIndex: function () {
                let index;
                this.menus.forEach((item, i) => {
                    item.allPath.forEach((m, n) => {
                        if (m == this.route) {
                            index = i;

                        }
                    })
                })
                return index;
            }
        },
        methods: {
            getMenus(){
                $api.getSys('/a/sys/menu/userMenus')
                    .then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            if (res.data && res.data.menuList) {
                                this.menus = menus;
                                return;
                            }
                            else {
                                this.menus = menus.slice(0, 1);
                            }
                        }
                    })
            },
            getInfo(){
                return $api.getSys('/a/sys/user/current')
                    .then(res => {
                        if (res.code == 1220) {
                            logout()
                        }
                        if (res.code == 200) {
                            this.userInfo = res.data;
                        }
                    })
            }
        },
        created(){
            this.getMenus();
            this.getInfo();

        }
    }
</script>
