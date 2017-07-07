<template>
    <div>
        <index-header></index-header>
        <div class="forget-password">
            <div class="form-warp">
                <div class="form-content">
                    <div class="title text-center">忘记密码</div>
                    <div class="form-item" flex>
                        <label class="label" flex-box="0">已注册的手机号</label>
                        <input class="form-input" flex-box="0" placeholder="请输入手机号">
                        <span class="err-info" flex-box="1">！该手机号未注册，请先去注册</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">图形验证码</label>
                        <input class="form-input short-input" flex-box="0" placeholder="请输入图形验证码">
                        <button class="btn-img">4487</button>
                        <span class="err-info" flex-box="1">！验证码输入错误，请重新输入</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">图形验证码</label>
                        <input class="form-input short-input" flex-box="0" placeholder="请输入图形验证码">
                        <button class="btn-primary btn-msg">获取验证码</button>
                        <span class="err-info" flex-box="1">！验证码输入错误，请重新输入</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">设置新密码</label>
                        <input class="form-input" flex-box="0" placeholder="请输入密码">
                        <span class="err-info" flex-box="1">！密码不能为空</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0"></label>
                        <button class="btn-primary btn-submit">找回密码</button>

                    </div>
                </div>
            </div>

        </div>
        <index-footer></index-footer>
    </div>

</template>

<script>
    import IndexHeader from '../components/IndexHeader';
    import IndexFooter from '../components/IndexFooter';
    import '../less/forget-password.less';
    export default {
        components: {
            IndexFooter,
            IndexHeader},
        name: 'forget-password',
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
