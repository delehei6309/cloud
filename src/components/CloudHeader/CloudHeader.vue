<template>
    <div class="cloud-header">
        <div class="header-body" flex="main:justify">
            <div class="header-left" flex>
                <div class="imgs"><img src="../../images/cloud-logo.png" alt="logo"></div>
                <div>开放平台</div>
            </div>
            <div class="header-right" flex>
                <div>
                    <router-link class="header-home" :to="{path:'/home?merchantNum='}"  >首页</router-link>
                </div>
                <div class="head-username">用户名{{userMobile | mobileFormat}}</div>
                <div class="quit" @click.stop="loginOut">退出</div>
            </div>
        </div>
    </div>
</template>

<script>
    import './cloud-header.less';
    import Toast from '../Toast';
    export default {
        name: 'cloud-header',
        data(){
            return {
                userMobile:'18997296307',
            }
        },
        created(){
        },
        computed: {},
        methods: {
            loginOut(){
                Toast('退出');
            }
        },
        destroyed(){

        }
    }
</script>
