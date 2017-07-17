<template>
    <div>
        <index-header></index-header>
        <div class="login">
            <div class="form-warp">
                <div class="tabs" flex="box:mean">
                    <div class="tab" :class="{'active':tab==1}"
                         @click.stop="tab=1" flex-box="1">
                        登录
                    </div>
                    <div class="tab" :class="{'active':tab==2}"
                         @click.stop="tab=2"
                         flex-box="1">
                        免费注册
                    </div>
                </div>
                <div class="form-content" v-show="tab==1">
                    <div class="form-item" flex>
                        <label class="label" for="phone" flex-box="0" flex="cross:center">
                            <img src="../images/login/phone.png">
                        </label>
                        <input flex-box="1" v-model.trim="username"
                               id="phone" class="form-input" placeholder="手机号"/>
                    </div>

                    <div class="form-item" flex>
                        <label class="label" for="password" flex-box="0" flex="cross:center">
                            <img src="../images/login/password.png">
                        </label>
                        <input flex-box="1" v-model.trim="password"
                               type="hidden" name="password" class="form-input" placeholder="密码"/>
                        <input flex-box="1" v-model.trim="password"
                               type="password" name="password" id="password" class="form-input"
                               placeholder="密码"/>
                    </div>
                    <div class="text-hint" flex="main:justify">
                        <span class="err-info">{{errInfo}}</span>
                        <router-link :to="{path:'forget-password'}">忘记密码</router-link>
                    </div>

                    <div class="btn-warp">
                        <button class="btn-primary btn-submit" @click.stop="login">登录</button>
                    </div>
                </div>


                <div class="form-content" v-show="tab==2">
                    <div class="form-item" flex>
                        <label class="label" for="re-phone" flex-box="0" flex="cross:center">
                            <img src="../images/login/phone.png">
                        </label>
                        <input flex-box="1" id="re-phone" class="form-input" placeholder="手机号"/>
                    </div>
                    <div flex>
                        <div class="form-item short-item" flex flex-box="0">
                            <label class="label" for="msg-code" flex-box="0" flex="cross:center">
                                <img src="../images/login/msg-code.png">
                            </label>
                            <input flex-box="1" id="msg-code" class="form-input" placeholder="验证码"/>
                        </div>
                        <div class="code-item" flex-box="1">
                            <button class="btn-primary btn-get-code">获取验证码</button>
                        </div>
                    </div>

                    <div flex>
                        <div class="form-item short-item" flex flex-box="0">
                            <label class="label" for="img-code" flex-box="0" flex="cross:center">
                                <img src="../images/login/img-code.png">
                            </label>
                            <input flex-box="1" id="img-code" class="form-input" placeholder="图形验证码"/>
                        </div>
                        <div class="code-item" flex-box="1">
                            <button class="btn-img-code">bnh4</button>
                        </div>
                    </div>
                    <div class="form-item" flex>
                        <label class="label" for="re-password" flex-box="0" flex="cross:center">
                            <img src="../images/login/password.png">
                        </label>
                        <input flex-box="1" type="hidden" name="re-password" class="form-input" placeholder="密码"/>
                        <input flex-box="1" type="password" name="re-password"
                               id="re-password" class="form-input" placeholder="请设置6~20位数字与字母组合密码"/>
                    </div>
                    <div class="text-hint" flex="main:justify">
                        <span class="err-info">手机号不能为空</span>
                    </div>

                    <div class="btn-warp">
                        <button class="btn-primary btn-submit">注册</button>
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
                errInfo: ''
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
        computed: {

        },
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
                this.errInfo = '密码为（6~20位数字和字母）';
                return false;
            },
            login(){
                if (!this.checkUserName() || !this.checkPassword()) {
                    return false;
                }
               let {username,password} =this;
                $api.postSys('/a/login',{username,password})
                    .then(res => {
                        if (res.code == 200) {
                            this.$router.push('/home');
                        } else {
                            this.errInfo = res.msg;
                        }
                    })
            }
        },
        watch: {
            $route () {
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
