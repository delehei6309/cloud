<template>
    <div>
        <index-header></index-header>
        <div class="login">
            <div class="form-warp">
                <div class="tabs" flex="box:mean">
                    <div class="tab" :class="{'active':tab==1}"
                         @click.stop="tab=1; errInfo = '';" flex-box="1">
                        登录
                    </div>
                    <div class="tab" :class="{'active':tab==2}"
                         @click.stop="tab=2;errInfo = '';"
                         flex-box="1">
                        免费注册
                    </div>
                </div>
                <div class="form-content" v-show="tab==1">
                    <div class="form-item" flex>
                        <label class="label" for="phone" flex-box="0" flex="cross:center">
                            <img src="../images/login/phone.png">
                        </label>
                        <input flex-box="1" v-model.trim="username" maxlength="11"
                               id="phone" class="form-input" placeholder="手机号"/>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" for="password" flex-box="0" flex="cross:center">
                            <img src="../images/login/password.png">
                        </label>
                        <input flex-box="1" v-model.trim="password"
                               type="hidden" name="password" class="form-input" placeholder="密码"/>
                        <input flex-box="1" v-model.trim="password" maxlength="20"
                               type="password" name="password" id="password" class="form-input"
                               placeholder="密码"/>
                    </div>
                    <div class="text-hint" flex="main:justify">
                        <span class="err-info">{{errInfo}}</span>

                    </div>
                    <div class="text-hint" flex="main:justify">
                        <span class="err-info"></span>
                        <router-link :to="{path:'forget-password'}">忘记密码</router-link>
                    </div>
                    <div class="btn-warp">
                        <button class="btn-primary btn-submit" @click.stop="login">{{loginText}}</button>
                    </div>
                </div>


                <div class="form-content" v-show="tab==2">
                    <div class="form-item" flex>
                        <label class="label" for="re-phone" flex-box="0" flex="cross:center">
                            <img src="../images/login/phone.png">
                        </label>
                        <input flex-box="1" id="re-phone" v-model.trim="username" maxlength="11"
                               class="form-input" placeholder="手机号"/>
                    </div>
                    <div flex v-show="imageCaptcha">
                        <div class="form-item short-item" flex flex-box="0">
                            <label class="label" for="img-code" flex-box="0" flex="cross:center">
                                <img src="../images/login/img-code.png">
                            </label>
                            <input flex-box="1" v-model.trim="inputCode" maxlength="4"
                                   id="img-code" class="form-input" placeholder="图形验证码"/>
                        </div>
                        <div class="code-item" flex-box="1">
                            <button class="btn-img-code" @click.stop="getCode">{{imageCaptcha}}</button>
                        </div>
                    </div>
                    <div flex>
                        <div class="form-item short-item" flex flex-box="0">
                            <label class="label" for="msg-code" flex-box="0" flex="cross:center">
                                <img src="../images/login/msg-code.png">
                            </label>
                            <input flex-box="1" id="msg-code" v-model.trim="numberCaptcha" maxlength="6"
                                   class="form-input" placeholder="验证码"/>
                        </div>
                        <div class="code-item" flex-box="1">
                            <button v-if="verifyTimeLeft<1" class="btn-primary btn-get-code" @click.stop="getVerify">{{verifyText}}</button>
                            <button v-else="verifyTimeLeft<1" class="btn-default btn-text" disabled>{{verifyTimeLeft}}
                            </button>
                        </div>
                    </div>


                    <div class="form-item" flex>
                        <label class="label" for="re-password" flex-box="0" flex="cross:center">
                            <img src="../images/login/password.png">
                        </label>
                        <input flex-box="1" type="hidden" v-model.trim="password"
                               name="re-password" class="form-input" placeholder="密码"/>
                        <input flex-box="1" type="password" v-model.trim="password"
                               name="re-password" maxlength="20"
                               id="re-password" class="form-input" placeholder="请设置6~20位数字与字母组合密码"/>
                    </div>
                    <div class="text-hint" flex="main:justify">
                        <span class="err-info">{{errInfo}}</span>
                    </div>

                    <div class="btn-warp">
                        <button class="btn-primary btn-submit" @click.stop="register">注册</button>
                    </div>
                </div>

                <div class="login-footer">
                    北京中冀汇通天下互联网科技有限公司提供服务
                </div>
            </div>
        </div>
        <index-footer></index-footer>

    </div>
</template>

<script>
    import IndexHeader from '../components/IndexHeader';
    import IndexFooter from '../components/IndexFooter';
    import $api from '../tools/api';
    import '../less/login.less';
    export default {
        name: 'login',
        data(){
            return {
                tab: 1,
                username: '',
                password: '',
                errInfo: '',
                cellPhoneNumber: '',
                inputCode: '',
                imageCaptcha: '',
                verifyTimeLeft: 0,
                verifyText: '获取验证码',
                loginText: '登录',
                timer: null,
                numberCaptcha: ''
            }
        },
        created(){
            if (this.$route.query.tab == 'register') {
                this.tab = 2;
            }
        },
        components: {
            IndexHeader,
            IndexFooter
        },
        computed: {},
        methods: {
            checkUserName(){
                if (!this.username) {
                    this.errInfo = '请输入手机号';
                    return false;
                }
                let reg = /^1[3578]\d{9}/;
                if (reg.test(this.username)) {
                    return true;
                }
                this.errInfo = '请输入正确的手机号';
                return false;
            },
            checkPassword(){
                if (!this.password) {
                    this.errInfo = '请输入登录密码';
                    return false;
                }
                let reg = /(?=.*[0-9])(?=.*[A-Za-z])^[0-9A-Za-z]{6,20}$/;
                if (reg.test(this.password)) {
                    return true;
                }
                this.errInfo = '请输入6~20位数字和字母组合密码';
                return false;
            },
            getCode(){
                if (!this.checkUserName()) {
                    return false;
                }
                let data = {
                    cellPhoneNumber: this.username,
                    getType: 'img'
                }
                $api.postSys('/a/sys/user/captcha/register', data)
                    .then(res => {
                        if (res.code == 200) {
                            this.errInfo = '';
                            this.imageCaptcha = res.data.imageCaptcha;
                        }
                    })

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
                    this.errInfo = '请输入图片验证码';
                    return false;
                }
                else {
                    data.imgCaptcha = this.inputCode;
                }
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.postSys('/a/sys/user/captcha/register', data)
                    .then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.errInfo = '';
                            return false;
                        }
                        this.clearTimeCount();
                        if (res.code == 1210) {
                            this.errInfo = '获取短信验证码失败';
                            return false;
                        }
                        if (res.code == 1211) {
                            this.errInfo = '请输入图片验证码';
                            this.imageCaptcha = res.data.imageCaptcha;
                            return false;
                        }
                        if (res.code == 1212) {
                            if (this.imageCaptcha) {
                                this.errInfo = '图片验证码错误';
                            } else {
                                this.errInfo = '请输入图片验证码';
                            }
                            this.imageCaptcha = res.data.imageCaptcha;
                            return false;
                        }
                        if (res.code == 1215) {
                            this.errInfo = '手机号不正确';
                            return false;
                        }
                        if (res.code == 1216) {
                            this.errInfo = '该手机号已注册，可直接登录';
                            return false;
                        }
                        this.errInfo = res.msg;
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
            login(){
                if (!this.checkUserName() || !this.checkPassword()) {
                    return false;
                }
                let {username, password} = this;
                this.loginText = '登录中...'
                $api.postSys('/a/login', {username, password})
                    .then(res => {
                        this.loginText = '登录'
                        if (res.code == 200 || res.code == 1221) {
                            this.$store.dispatch('getUserInfo').then(res => {
                                if (res.code == 200) {
                                    if (res.data.merchantNumStatus && res.data.merchantNumStatus == 1) {
                                        this.$router.push('/home');

                                    } else {
                                        this.$router.push('/menus/authentication');
                                    }
                                }
                            });
                        } else {
                            this.errInfo = res.msg;
                        }
                    })
            },
            register(){
                if (!this.checkUserName()) {
                    return false;
                }
                if (!this.numberCaptcha) {
                    this.errInfo = '请输入短信验证码'
                    return false;
                }
                if (!this.checkPassword()) {
                    return false;
                }
                let cellPhoneNumber = this.username;
                let numCaptcha = this.numberCaptcha;
                let password = this.password;
                $api.postSys('/a/sys/user/register/create', {cellPhoneNumber, numCaptcha, password})
                    .then(res => {
                        if (res.code == 200) {
                            this.errInfo = '';
                            this.numberCaptcha = '';
                            this.password = '';
                            this.tab = 1;
                            return false;
                        }
                        if (res.code == 1201) {
                            this.errInfo = '请输入正确的手机号';
                            return false;

                        }
                        if (res.code == 1203) {
                            this.errInfo = '请输入6~20位数字和字母组合密码';
                            return false;
                        }
                        if (res.code == 1204) {
                            this.errInfo = '该手机号已注册，可直接登录';
                            return false;
                        }
                        this.errInfo = res.msg;
                    });
            }
        },
        watch: {
            $route () {
                this.errInfo = '';
                if (this.$route.query.tab == 'register') {
                    this.tab = 2;
                } else {
                    this.tab = 1;
                }
            }
        },
        destroyed(){

        }
    }
</script>
