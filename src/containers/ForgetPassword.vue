<template>
    <div>
        <index-header></index-header>
        <div class="forget-password">
            <div class="form-warp">
                <div class="form-content">
                    <div class="title text-center">忘记密码</div>
                    <div class="form-item" flex>
                        <label class="label" flex-box="0">已注册的手机号</label>
                        <input class="form-input" v-model.trim="username"
                               flex-box="0" placeholder="请输入手机号">
                        <span v-show="errNumber" class="err-info" flex-box="1">{{errNumber}}</span>
                    </div>

                    <div class="form-item" flex v-show="imageCaptcha">
                        <label class="label" flex-box="0">图形验证码</label>
                        <input class="form-input short-input" flex-box="0" placeholder="请输入图形验证码">
                        <button class="btn-img">{{imageCaptcha}}</button>
                        <span class="err-info" flex-box="1" v-show="errImage">{{errImage}}</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">图形验证码</label>
                        <input class="form-input short-input" v-model.trim="numberCaptcha"
                               flex-box="0" placeholder="请输入图形验证码">
                        <button v-if="verifyTimeLeft<1" class="btn-primary btn-msg" @click.stop="getVerify">{{verifyText}}</button>
                        <button v-else="verifyTimeLeft<1" class="btn-default btn-text">{{verifyTimeLeft}}</button>
                        <span class="err-info" flex-box="1" v-show="errCode">{{errCode}}</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">设置新密码</label>
                        <input class="form-input" flex-box="0" v-model.trim="password" placeholder="请输入密码">
                        <span v-show="errPass" class="err-info" flex-box="1">{{errPass}}</span>
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
    import $api from '../tools/api';
    export default {
        components: {
            IndexFooter,
            IndexHeader
        },
        name: 'forget-password',
        data(){
            return {
                username: '',
                verifyText: '获取验证码',
                imageCaptcha: '',
                inputCode: '',
                verifyTimeLeft: 0,
                timer: null,
                numberCaptcha: '',
                password: '',
                errImage: '',
                errCode: '',
                errNumber: '',
                errPass: ''
            }
        },
        created(){
        },
        computed: {},
        methods: {
            checkUserName(){
                if (!this.username) {
                    this.setInfo('errNumber', '请输入手机号');
                    return false;
                }
                let reg = /^1[3578]\d{9}/;
                if (reg.test(this.username)) {
                    return true;
                }
                this.errInfo = '请输入正确的手机号';
                this.setInfo('errNumber', '请输入正确的手机号');

                return false;
            },
            checkPassword(){
                if (!this.password) {
                    this.setInfo('errPass', '请输入登录密码');
                    return false;
                }
                let reg = /(?=.*[0-9])(?=.*[A-Za-z])^[0-9A-Za-z]{6,20}$/;
                if (reg.test(this.password)) {
                    return true;
                }
                this.setInfo('errPass', '密码为（6~20位数字和字母');
                return false;
            },
            getVerify(){
                if (!this.checkUserName()) {
                    return false;
                }

                let data = {
                    cellPhoneNumber: this.username,
                    getType: 'num'
                }
                if (this.imageCaptcha && !this.inputCode) {
                    this.setInfo('errImage', '请输入图片验证码');
                    return false;
                }
                else {
                    data.imgCaptcha = this.inputCode;
                }
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.postSys('/a/sys/user/captcha/resetpwd', data)
                    .then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            return false;
                        }
                        this.clearTimeCount();
                        if (res.code == 1210) {

                            this.setInfo('errCode', '获取短信验证码失败');
                            return false;
                        }
                        if (res.code == 1211) {

                            this.setInfo('errImage', '请输入图片验证码');
                            this.imageCaptcha = res.data.imageCaptcha;
                            return false;
                        }
                        if (res.code == 1212) {
                            if (this.imageCaptcha) {
                                this.setInfo('errImage', '图片验证码错误');
                            } else {
                                this.errInfo = '请输入图片验证码';
                                this.setInfo('errImage', '请输入图片验证码');
                            }
                            this.imageCaptcha = res.data.imageCaptcha;
                            return false;
                        }
                        if (res.code == 1215) {
                            this.errInfo = '手机号不正确';
                            this.setInfo('errNumber', '手机号不正确');
                            return false;
                        }
                        if (res.code == 1223 || res.code == 1216) {
                            this.setInfo('errNumber', '该手机号未注册');
                            return false;
                        }
                        this.setInfo('errCode', res.msg);
                    })
            },
            timeCount(){
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount(){
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            setInfo(key, value){
                this.errImage = '';
                this.errCode = '';
                this.errNumber = '';
                this.errPass = '';
                this[key] = value;
            }
        },
        destroyed(){

        }
    }
</script>
