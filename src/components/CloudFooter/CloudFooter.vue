<template>
    <div class="cloud-footer">
        <div class="footer-top">
            <div class="content" flex>
                <div class="con-left">
                    <p class="callus"><router-link class="home" :to="{path:'/contact-us'}"  >联系我们</router-link></p>
                    <p><router-link class="home" :to="{path:'/about'}"  >关于我们</router-link></p>
                </div>
                <div class="con-center">
                    <div flex>
                        <div class="code">
                            <div class="imgs"><img src="../../images/code-img.jpg" alt=""></div>
                            <div class="text">关注公众微信号</div>
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
</template>

<script>
    import './cloud-footer.less';
    import {telNumber} from '../../tools/config';
    export default {
        name: 'cloud-footer',
        data(){
            return {
                telNumber
            }
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
