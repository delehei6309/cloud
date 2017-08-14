<template>
    <div>
        <index-header></index-header>
        <div class="forget-password">
            <div class="form-warp">
                <div class="form-content">
                    <div class="title text-center">忘记密码</div>
                    <div class="form-item" flex>
                        <label class="label" flex-box="0">已注册的手机号</label>
                        <input class="form-input" v-model.trim="username" maxlength="11"
                               flex-box="0" placeholder="请输入手机号">
                        <span v-show="errNumber" class="err-info" flex-box="1">{{errNumber}}</span>
                    </div>

                    <div class="form-item" flex v-show="imageCaptcha">
                        <label class="label" flex-box="0">图形验证码</label>
                        <input class="form-input short-input" v-model="inputCode" maxlength="4"
                               flex-box="0" placeholder="请输入图形验证码">
                        <button class="btn-img" @click.stop="getImageCode">{{imageCaptcha}}</button>
                        <span class="err-info" flex-box="1" v-show="errImage">{{errImage}}</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">短信验证码</label>
                        <input class="form-input short-input" v-model.trim="numberCaptcha" maxlength="6"
                               flex-box="0" placeholder="请输入短信验证码">
                        <button v-if="verifyTimeLeft<1" class="btn-primary btn-msg" @click.stop="getVerify">{{verifyText}}</button>
                        <button v-else="verifyTimeLeft<1" class="btn-default btn-text" disabled>{{verifyTimeLeft}}
                        </button>
                        <span class="err-info" flex-box="1" v-show="errCode">{{errCode}}</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0">设置新密码</label>
                        <input class="form-input" type="password" flex-box="0" maxlength="20"
                               v-model.trim="password" placeholder="请输入密码">
                        <span v-show="errPass" class="err-info" flex-box="1">{{errPass}}</span>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" flex-box="0"></label>
                        <button class="btn-primary btn-submit" @click.stop="resetPassword">重置密码</button>

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
    import Toast from '../components/Toast';
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
                errPass: '',
                uuid: ''
            }
        },
        created(){
            this.getImageCode();
        },
        computed: {},
        methods: {
            checkUserName(){
                if (!this.username) {
                    this.setInfo('errNumber', '手机号不能为空');
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
                this.setInfo('errPass', '请设置6~20位数字和字母组合密码');
                return false;
            },
            getImageCode(){
                $api.postSys('/a/sys/user/captcha/resetpwd', {
                    getType: 'img',
                    uuid: this.uuid
                }).then(res => {
                    if (res.code == 200) {
                        this.imageCaptcha = res.data.imageCaptcha;
                        this.uuid = res.data.uuid;
                    }
                });
            },
            getVerify(){
                if (!this.checkUserName()) {
                    return false;
                }
                if (!this.inputCode) {
                    this.setInfo('errImage', '请输入图片验证码');
                    return false
                }

                let data = {
                    cellPhoneNumber: this.username,
                    getType: 'num',
                    uuid: this.uuid
                }
                data.imgCaptcha = this.inputCode;
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.postSys('/a/sys/user/captcha/resetpwd', data)
                    .then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.setInfo();
                            this.$router.replace('/login');

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
                            this.setInfo('errNumber', '该手机号未注册,请先去注册');
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
                if (key) {
                    this[key] = value;
                }

            },
            resetPassword(){
                if (!this.checkUserName()) {
                    return false;
                }
                if (!this.inputCode) {
                    this.setInfo('errImage', '请输入图片验证码');
                    return false
                }
                if (!this.numberCaptcha) {
                    this.setInfo('errCode', '请输入短信验证码');
                    return false;
                }
                if (!this.checkPassword()) {
                    return false;
                }
                let data = {
                    cellPhoneNumber: this.username,
                    numCaptcha: this.numberCaptcha,
                    uuid: this.uuid,
                    password: this.password
                };
                $api.postSys('/a/sys/user/pwd/reset', data)
                    .then(res => {
                        if (res.code == 200) {
                            Toast('重置密码成功')
                            return false;
                        }
                        if (res.code == 1234) {
                            this.setInfo('errCode', '该手机号未注册，请先去注册');
                            return false;
                        }
                        if (res.code == 1235) {
                            this.setInfo('errCode', '验证码错误或失效');
                            return false;
                        }
                    });
            },
            login(){

                let {username, password} = this;
                $api.postSys('/a/login', {username, password})
                    .then(res => {
                        if (res.code == 200) {
                            this.$router.push('/home');
                        }
                    })
            }
        },
        destroyed(){

        }
    }
</script>
