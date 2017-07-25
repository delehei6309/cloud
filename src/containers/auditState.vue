<template>
    <div class="submit-state audit-state" v-if="state=='sucess'">
        <div class="submit-state-title">系统消息</div>
        <div class="submit-state-content">
            <div class="state-content-up" flex="main:center">
                <div><img src="../images/icon/error.png" alt=""></div>
                <div class="text">资质审核未通过</div>
            </div>
            <div class="state-content-down error-color">{{text}}</div>
            <div class="audit-state-btn"><button>修改资质</button></div>
        </div>
    </div>
</template>

<script>
    import '../less/submit-state.less';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    export default {
        name: 'submit-state',
        data(){
            return {
                text:'您提交的证件照片不清晰，与原公司名称对不上！',
                channelUuid:'da9effa3d9cf4620a19d3679dc43d171',
                state:'sucess'
            }
        },
        created(){
            $api.get('/channel/cred/'+this.channelUuid).then(msg => {
                if(msg.code == 200){
                    msg.data.auditingResult = 0;
                    if(msg.data.auditingResult == 1){
                        this.state = 'sucess';
                        console.log('通过');
                    }else{
                        this.$router.push('./authentication?channelUuid='+this.channelUuid);
                    }
                }else{
                   // Toast(msg.msg);
                }
            });
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
