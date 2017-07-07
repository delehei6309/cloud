<template>
    <div class="authentication">
        <div class="authentication-body">
            <div class="header-p">开通产品标准接入服务，需要客户提交资料并上传相应的凭证，请务必正确填写，我们将尽快联系到您。</div>
            <div class="header-select" flex>
                <div class="select-text">请选择您的所属身份</div>
                <div class="select-btn" flex>
                    <button :class="{'active':tab == 1}" @click.stop="tab=1">企业</button>
                    <button :class="{'active':tab == 2}" @click.stop="tab=2">个人</button>
                </div>
            </div>
            <div class="authentication-content">
                <div class="content-infor">
                    <h6>企业信息</h6>
                    <ul class="common-lists">
                        <li flex v-for="(item,index) in enterpriseInfor" :key="index">
                            <div class="infor-left">{{item.name}}</div>
                            <div class="infor-center">
                                <input type="text" :placeholder="item.placeholder" v-model="item.model" :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    >
                            </div>
                            <div class="infor-right" v-show="item.error">！{{item.name}}不能为空</div>
                        </li>
                    </ul>
                </div>
                <div class="content-upload">
                    <h6>上传资质</h6>
                    <div class="upload">
                        <div class="idcard" flex>
                            <div class="upload-text">上传法人身份证</div>
                            <div class="idcard-box upload-img-box">
                                <span class="span-bg"></span><span class="span-percent"></span>
                                <b-form-file v-model="aptitude.legalPersonIdcard" class="form-file" accept="image/*"></b-form-file>
                            </div>
                            <div class="upload-error">！请上传法人身份证照，大小不超过2M</div>
                        </div>
                        <div class="qualification">
                            <div flex>
                                <div class="upload-text">
                                    <p>上传法人身份证</p>
                                    <p class="text-last">(三证合一只需上传一张)</p>
                                </div>
                                <div class="qualification-box" flex>
                                    <div class="license imgs">
                                        <div class="upload-img-box">
                                            <span class="span-bg"></span><span class="span-percent"></span>
                                            <b-form-file v-model="aptitude.license" class="form-file" accept="image/*"></b-form-file>
                                        </div>
                                        <div>营业执照</div>
                                    </div>
                                    <div class="certificate imgs">
                                        <div class="upload-img-box">
                                            <span class="span-bg"></span><span class="span-percent"></span>
                                            <b-form-file v-model="aptitude.certificate" class="form-file" accept="image/*"></b-form-file>
                                        </div>
                                        <div>组织机构代码证</div>
                                    </div>
                                    <div class="tax imgs">
                                        <div class="upload-img-box">
                                            <span class="span-bg"></span><span class="span-percent"></span>
                                            <b-form-file v-model="aptitude.tax" class="form-file" accept="image/*"></b-form-file>
                                        </div>
                                        <div>税务登记证</div>
                                    </div>
                                </div>
                            </div>
                            <div class="upload-error">！请上传营业执照证件照，大小不超过2M</div>
                        </div>
                    </div>
                </div>
                <div class="bank-card">
                    <h6>银行卡信息<span>（请确保正确填写银行卡信息，便于结款准确到账）</span></h6>
                    <ul class="common-lists">
                        <li flex>
                            <div class="infor-left">账户类型</div>
                            <div class="infor-center">
                                <div class="select-box">
                                    <b-form-select v-model="bank.type.selected" :options="bank.type.options" class="mb-3">
                                    </b-form-select>
                                </div> 
                            </div>
                            <div class="infor-right" v-show="">！请选择账户类型</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户银行</div>
                            <div class="infor-center">
                                <div class="select-box">
                                    <b-form-select v-model="bank.bankName.selected" :options="bank.bankName.options" class="mb-3">
                                    </b-form-select>
                                </div> 
                            </div>
                            <div class="infor-right">！请选择开户银行</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户地址</div>
                            <div class="infor-center" flex>
                                <div class="select-box selected-address selected-province">
                                    <b-form-select v-model="bank.address.province.selected" :options="bank.address.province.options" class="mb-3">
                                    </b-form-select>
                                </div> 
                                <div class="select-box selected-address">
                                    <b-form-select v-model="bank.address.city.selected" :options="bank.address.city.options" class="mb-3">
                                    </b-form-select>
                                </div> 
                            </div>
                            <div class="infor-right">！请选择开户地址</div>
                        </li>
                        <li flex>
                            <div class="infor-left">支行名称</div>
                            <div class="infor-center"><input type="text" placeholder="请输入所在支行" ></div>
                            <div class="infor-right">！支行名称不能为空</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户人姓名</div>
                            <div class="infor-center"><input type="text" placeholder="请输入开户人姓名" ></div>
                            <div class="infor-right">！开户人姓名不能为空</div>
                        </li>
                        <li flex>
                            <div class="infor-left">银行卡号</div>
                            <div class="infor-center"><input type="text" placeholder="请输入银行卡号" ></div>
                            <div class="infor-right">！银行卡号不能为空</div>
                        </li>
                    </ul>
                </div>
                <div class="contacts">
                    <h6>联系人信息</h6>
                    <ul class="common-lists">
                        <li flex v-for="(item,index) in contacts" :key="index">
                            <div class="infor-left">{{item.name}}</div>
                            <div class="infor-center">
                                <input type="text" :placeholder="'请输入'+item.name"  v-model="item.model" :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    >
                            </div>
                            <div class="infor-right" v-show="item.error">！{{item.name}}不能为空</div>
                        </li>
                    </ul>
                    <div class="upload-photo" >
                        <div flex>
                            <div class="upload-text">上传联系人身份证照</div>
                            <div class="front upload-img-box">
                                <span class="span-bg"></span>
                                <span class="span-percent"></span>
                                <i>正面照</i>
                                <b-form-file v-model="aptitude.license" class="form-file" accept="image/*"></b-form-file>
                            </div>
                            <div class="contrary upload-img-box">
                                <span class="span-bg"></span>
                                <span class="span-percent">上传中22%</span>
                                <i>反面照</i>
                                <b-form-file v-model="aptitude.license" class="form-file" accept="image/*"></b-form-file>
                            </div>
                        </div>
                        <div class="upload-error">！请上传身份证，大小不超过2M</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-btn" flex="main:center">
            <button @click.stop="submit">提交</button>
        </div>
    </div>
</template>

<script>
    import '../less/authentication.less';
    export default {
        name: 'authentication',
        data(){
            return {
                tab:1,
                file:null,
                loading:'22',
                enterpriseInfor:[
                    {
                        name:'公司全称',
                        placeholder:'请输入公司名称',
                        maxlength:30,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司法人',
                        placeholder:'请输入公司法人',
                        maxlength:16,
                        error:false,
                        model:''
                    },
                    {
                        name:'APP名称',
                        placeholder:'请输入APP名称',
                        maxlength:8,
                        error:false,
                        model:''
                    },
                    {
                        name:'统一社会信用代码',
                        placeholder:'请输入组织机构代码/统一社会信用代码',
                        maxlength:18,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司联系方式',
                        placeholder:'请输入公司联系方式',
                        maxlength:20,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司邮箱',
                        placeholder:'请输入公司邮箱',
                        maxlength:30,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司地址',
                        placeholder:'请输入公司地址',
                        maxlength:30,
                        error:false,
                        model:''
                    }
                ],
                BankInfor:{
                    
                },
                contacts:[
                    {
                        name:'姓名',
                        maxlength:30,
                        error:false,
                        model:''
                    },
                    {
                        name:'手机号',
                        maxlength:11,
                        error:false,
                        model:''
                    },
                    {
                        name:'邮箱',
                        maxlength:30,
                        error:false,
                        model:''
                    },
                    {
                        name:'身份证号',
                        maxlength:18,
                        error:false,
                        model:''
                    },
                    {
                        name:'微信／QQ号',
                        maxlength:30,
                        error:false,
                        model:''
                    }
                ],
                bank:{
                    type:{
                        error:false,
                        selected:0,
                        options:[
                            {
                                text:'请选择',
                                value:0
                            },
                            {
                                text:'企业账户',
                                value:1
                            },
                            {
                                text:'个人账户',
                                value:2
                            }
                        ]
                    },
                    bankName:{
                        error:false,
                        selected:0,
                        options:[
                            {
                                text:'请选择',
                                value:0
                            },
                            {
                                text:'中国工商银行',
                                value:1
                            },
                            {
                                text:'中国农业银行',
                                value:2
                            },
                            {
                                text:'中国建设银行',
                                value:3
                            }
                        ]
                    },
                    address:{
                        province:{
                            selected:0,
                            options:[
                                {
                                    text:'北京',
                                    value:0
                                },
                                {
                                    text:'石家庄',
                                    value:1
                                }
                            ]
                        },
                        city:{
                            selected:0,
                            options:[
                                {
                                    text:'海淀区',
                                    value:0
                                },
                                {
                                    text:'朝阳区',
                                    value:1
                                }
                            ]
                        }
                    }
                },
                //资质
                aptitude:{
                    legalPersonIdcard:null,//法人身份证
                    license:null,//营业执照
                    certificate:null,//组织机构代码证
                    tax:null,//税务登记证
                }
            }
        },
        created(){
        },
        computed: {},
        methods: {
            submit(){
                console.log('eee')
                /*this.enterpriseInfor.map(el=>{
                    if(el.model.length<1){
                        el.error = true;
                    }
                })*/
            },
            blur(i){
                let that = this.enterpriseInfor[i];
                console.log(that.model.length)
                if(that.model.length<1){
                    that.error = true;
                }
            }
        },
        destroyed(){

        }
    }
</script>
