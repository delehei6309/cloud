<template>
    <div class="index-footer">
        <div class="footer-content" flex>
            <div class="footer-left" flex-box="1">
                <div class="main-title">深圳买单</div>
                <div class="sub-title">国内首家专业智能云服务</div>
                <div class="copy-info">
                    Copyright © 2017 all rights reserved 深证买单互联网金融服务有限公司<br>粤ICP备17086866号-1

                </div>

            </div>
            <div class="footer-right" flex-box="0" flex="dir:top">
                <div class="item" flex-box="0" flex>
                    <img style="width: 24px;margin-right: 10px" src="../../images/index-footer/weixin.png"/>
                    <span style="font-size: 16px">金疙瘩微信公众号</span>

                </div>
                <div flex-box="0" class="qr-image" flex="main:center cross:center">
                    <img src="../../images/index-footer/qr-code.png"/>
                </div>
                <div class="sao">扫码关注</div>
                <!--<div flex-box="1" class="items" flex="cross:center">
                    <div>
                        <div class="item">
                            <img src="../../images/index-footer/kingold.png"/>
                            <span>金疙瘩</span>

                        </div>
                        <div class="item">
                            <img src="../../images/index-footer/weixin.png"/>
                            <span>金疙瘩微信公众号</span>

                        </div>
                        <div class="item">
                            <img src="../../images/index-footer/weibo.png"/>
                            <span>金疙瘩微博</span>

                        </div>
                    </div>

                </div>-->
            </div>
        </div>

    </div>
</template>

<script>
    import './index-footer.less';
    export default {
        name: 'index-footer',
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
