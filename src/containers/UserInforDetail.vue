<template>
    <div class="user-infor-detail">
        <div class="title1">用户信息详情</div>
        <div class="user-info">
        <h2>用户信息</h2>
        <div class="content" flex="dir:left main:justify box:mean">
            <ul class="left"  flex-box="1">
                <li flex="box:mean">
                    <span class="title" flex-box="1">用户ID</span>
                    <span class="info" flex-box="1">{{userData.userId}}</span>
                </li>
                <li flex="box:mean">
                    <span class="title" flex-box="1">手机号</span>
                    <span class="info" flex-box="1">{{userData.investorMobile}}</span>
                </li>
                <li flex="box:mean">
                    <span class="title" flex-box="1">用户昵称</span>
                    <span class="info" flex-box="1">{{userData.userName}}</span>
                </li>
            </ul>
            <ul class="right" flex-box="1">
                <!-- <li flex="box:mean">
                    <span class="title" flex-box="1">渠道</span>
                    <span class="info" flex-box="2">大众点评</span>
                </li> -->
                <li flex="box:mean">
                    <span class="title" flex-box="1">终端设备</span>
                    <span class="info" flex-box="2">{{userData.userOginDeviceType}}</span>
                </li>
                <li flex="box:mean">
                    <span class="title" flex-box="1">注册时间</span>
                    <span class="info" flex-box="2">{{userData.registerTime | timeFormat}}</span>
                </li>
            </ul>
        </div>

    </div>
        <div class=" user-info authentication">
            <h2>实名认证</h2>
            <div class="content" flex=" box:mean">
                <ul flex-box="1" >
                   <li >
                    <span class="title">姓名</span>
                    </li>
                    <li >
                        <span class="title">身份证号</span>
                    </li>
                    <li >
                        <span class="title">认证时间</span>
                    </li>
                </ul>
                <ul flex-box="1" >
                    <li>
                        <span class="info" >{{userData.investorRealName}}</span>
                    </li>
                    <li>
                        <span class="info" >{{userData.investorIdCardNo}}</span>
                    </li>
                    <li>
                        <span class="info" >2017-04-04 12:12:12</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="user-info bankcar">
            <h2>银行卡</h2>
            <table>
                <tr>
                    <th>银行卡号</th>
                    <th>开户行</th>
                    <th>绑定时间</th>
                    <th>使用状态</th>
                </tr>
                <tr>
                    <td>6220********3141</td>
                    <td>招商银行</td>
                    <td>2015-04-30 12:12:12</td>
                    <td>使用中</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor-detail.less';
    import $api from '../tools/api';
    export default {
        name: 'user-infor-detail',
        data(){
            return {
                id:'131181199103081929',
                userData:{

                }
            }
        },
        created(){
            $api.get('/user/investor/'+this.$route.query.userUuid).then(msg => {
                if(msg.code == 200){
                    this.userData = msg.data
                }else{
                    console.log(msg)
                    //Toast(msg.msg);
                }
            });
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
