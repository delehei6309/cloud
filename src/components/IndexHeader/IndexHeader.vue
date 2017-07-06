<template>
    <div class="index-header">
        <div class="top">
            <div class="sub-info">
                <span class="text">热线电话：010-83272990</span>
                <router-link class="top-link" :to="{path:'/login'}">登录</router-link>
                <router-link class="top-link" :to="{path:'/login',query:{tab:'register'}}">注册</router-link>
                <router-link class="top-link" :to="{path:'/login'}">开放平台</router-link>
            </div>
        </div>
        <div class="middle">
            <div class="middle-content" flex="main:justify cross:center">
                <div flex-box="0" flex>
                    <img flex-box="0" class="logo" src="../../images/cloud-logo.png"/>
                    <div flex-box="1">
                        <span>开放金融云K-tech</span>
                        <span>国内领先的智能大数据提供商</span>
                    </div>
                </div>
                <div flex-box="1">
                    <router-link class="middle-link" :to="{}">首页</router-link>
                    <router-link class="middle-link" :to="{}">标准产品接入</router-link>
                    <router-link class="middle-link" :to="{}">场景产品合作</router-link>
                    <router-link class="middle-link" :to="{}">智能画像大数据服务</router-link>
                    <router-link class="middle-link" :to="{}">关于我们</router-link>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import './index-header.less';
    export default {
        name: 'index-header',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
