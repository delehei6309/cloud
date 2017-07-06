<template>
    <div id="app" class="app" flex="dir:top">
        <div class="header" flex-box="0" flex="main:center">
            <div class="header-body" flex="main:justify">
                <div class="header-left" flex>
                    <div class="imgs"><img src="./images/cloud-logo.png" alt="logo"></div>
                    <div>开放平台</div>
                </div>    
                <div class="header-right" flex>
                    <div>
                        <router-link class="home" :to="{path:'/home'}"  >首页</router-link>
                    </div>
                    <div class="head-username">用户名{{userMobile}}</div>
                    <div class="quit" @click.stop="loginOut">退出</div>
                </div>
            </div>
        </div>
        <div  id="body-warp" flex-box="1">
            <router-view></router-view>
        </div>

        <div class="footer" flex-box="0">
            <div class="footer-top">
                <div class="content" flex>
                    <div class="con-left">
                        <p class="callus"><router-link class="home" :to="{path:'/contact-us'}"  >联系我们</router-link></p>
                        <p><router-link class="home" :to="{path:'/about'}"  >关于我们</router-link></p>
                    </div>
                    <div class="con-center">
                        <div flex>
                            <div class="code">
                                <div class="imgs"><img src="./images/code-img.jpg" alt=""></div>
                                <div class="text">关注公众微信号</div>
                            </div>
                            <div class="code">
                                <div class="imgs"><img src="./images/code-img.jpg" alt=""></div>
                                <div class="text">关注新浪微博</div>
                            </div>
                        </div>
                    </div>
                    <div class="con-right">
                        <p class="callus">客服电话：{{telNumber}}</p>
                        <p>工作日 09:00~18:00</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">Copyright © 2017 all rights reserved 北京中冀汇通天下互联网科技有限公司版权所有</div>
        </div>

    </div>
</template>

<script>
    import './less/app.less';
    import Toast from './components/Toast';
    import {telNumber} from './tools/config';
    export default {
        name: 'app',
        data(){
            return{
                userMobile:'189***6307',
                telNumber,
            }
        },
        methods:{
            loginOut(){
                Toast('退出');
            }
        }
    }
</script>
