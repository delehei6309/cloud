<template>
    <div class="cloud-header">
        <div class="header-body" flex="main:justify">
            <div class="header-left" flex>
                <div class="imgs"><img src="../../images/cloud-logo.png" alt="logo"></div>
                <div>开放平台</div>
            </div>
            <div class="header-right" flex>
                <div>
                    <router-link class="header-home" :to="{path:'/home'}">首页</router-link>
                </div>
                <div class="head-username">用户名{{userInfo.loginName | mobileFormat}}</div>
                <div class="quit" @click.stop="loginOut">退出</div>
            </div>
        </div>
    </div>
</template>

<script>
    import './cloud-header.less';
    import Toast from '../Toast';
    import $api from '../../tools/api';
    export default {
        name: 'cloud-header',
        data(){
            return {
                userMobile: '18997296307',
            }
        },
        props:['userInfo'],
        created(){
        },
        computed: {},
        methods: {
            loginOut(){

                $api.postSys('/a/logout').then(res => {
                    if (res.code == 200) {
                        return false;
                    }
                    Toast(res.msg);
                })
            }
        },
        destroyed(){

        }
    }
</script>
