<template>
    <div class="submit-state">
        <div class="submit-state-title">系统消息</div>
        <div class="submit-state-content">
            <div class="state-content-up" flex="main:center">
                <div><img src="../images/icon/success.png" alt=""></div>
                <div class="text">提交成功！</div>
            </div>
            <div class="state-content-down">将在1-3个工作日审核完毕并与您联系！</div>
        </div>
    </div>
</template>

<script>
    import '../less/submit-state.less';
    export default {
        name: 'submit-state',
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
