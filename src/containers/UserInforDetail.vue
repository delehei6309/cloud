<template>
    <div class="user-infor-detail">
        <div class="title1">用户信息详情</div>
        <div class="user-info">
        <h2>用户信息</h2>
        <div class="content" flex="dir:left main:justify box:mean">
            <ul class="left">
                <li>
                    <span class="title">用户ID：</span>
                    <span class="info">{{userData.userId || '--'}}</span>
                </li>
                <li>
                    <span class="title">手机号：</span>
                    <span class="info">{{userData.investorMobile || '--'}}</span>
                </li>
            </ul>
            <ul class="right">
                <!-- <li flex="box:mean">
                    <span class="title" flex-box="1">渠道</span>
                    <span class="info" flex-box="2">大众点评</span>
                </li> -->
                <li>
                    <span class="title">终端设备：</span>
                    <span class="info">{{userData.registerDeviceType || '--'}}</span>
                </li>
                <li>
                    <span class="title">注册时间：</span>
                    <span class="info">{{userData.registerTime | timeFormat}}</span>
                </li>
            </ul>
        </div>

    </div>
        <div class="user-info authentication only-user">
            <h2>实名认证</h2>
            <div class="content">
                <ul class="left">
                    <template v-if="userData.userVerifyStatus < 1">
                        <li class="auth-ul"><span class="title">未实名</span></li>
                    </template>
                    <template v-else>
                        <li class="auth-ul">
                            <span class="title">姓名：</span>
                            <span class="info">{{userData.investorRealName || '--'}}</span>
                        </li>
                        <li class="auth-ul">
                            <span class="title">身份证号：</span>
                            <span class="info">{{userData.investorIdCardNo || '--'}}</span>
                        </li>
                        <li class="auth-ul">
                            <span class="title">认证时间：</span>
                            <span class="info">{{userData.openAccountTime | timeFormat}}</span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="user-info authentication only-user bankcar">
            <h2>银行卡</h2>
            <div class="content">
                <ul class="left">
                    <template v-if="userData.userVerifyStatus <= 2">
                        <li class="auth-ul"><span class="title">未绑卡</span></li>
                    </template>
                    <template v-else>
                        <li class="auth-ul">
                            <span class="title">银行卡号：</span>
                            <span class="info">{{userData.bankUserCardNo || '--'}}</span>
                        </li>
                        <li class="auth-ul">
                            <span class="title">开户行：</span>
                            <span class="info">{{userData.depositBank || '--'}}</span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor-detail.less';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    export default {
        name: 'user-infor-detail',
        data(){
            return {
                id:'131181199103081929',
                userData:{

                },
                openAccountTime:null
            }
        },
        created(){
            $api.get('/user/investor/'+this.$route.query.userUuid).then(msg => {
                if(msg.code == 200){
                    this.userData = msg.data
                }else{
                    Toast(msg.msg);
                }
            });
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
