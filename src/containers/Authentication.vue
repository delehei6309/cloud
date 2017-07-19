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
                        <li flex v-for="(item,index) in companyInfor" :key="index">
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
                            <div class="idcard-box upload-img-box" :class="{uploading:aptitude.legalPersonIdcard.loaded<=0}">
                                <span class="span-bg" :style="{height:aptitude.legalPersonIdcard.loaded+'%'}"></span>
                                <span class="span-percent" 
                                    v-if="aptitude.legalPersonIdcard.loaded>0 && aptitude.legalPersonIdcard.loaded<100">上传中{{aptitude.legalPersonIdcard.loaded}}%</span>
                                <span class="span-percent" v-if="aptitude.legalPersonIdcard.loaded>=100"><img :src="aptitude.legalPersonIdcard.src"></span>
                                <b-form-file v-model="aptitude.legalPersonIdcard.file" :disabled="aptitude.legalPersonIdcard.loaded>0 && aptitude.legalPersonIdcard.loaded<100" class="form-file" accept="image/*"></b-form-file>
                            </div>
                            <div class="upload-error" v-if="aptitude.legalPersonIdcard.loaded<100">！请上传法人身份证照，大小不超过2M</div>
                        </div>
                        <div class="qualification">
                            <div flex>
                                <div class="upload-text">
                                    <p>上传公司资质</p>
                                    <p class="text-last">(三证合一只需上传一张)</p>
                                </div>
                                <div class="qualification-box" flex>
                                    <div class="license imgs" v-for="(item,index) in aptitude.other" :key="index">
                                        <div class="upload-img-box" :class="{uploading:item.loaded<=0}">
                                            <span class="span-bg" :style="{height:item.loaded+'%'}"></span>
                                            <span v-if="item.loaded>0 && item.loaded<100" class="span-percent">上传中{{item.loaded}}%</span>
                                            <span v-if="item.loaded>=100" class="span-percent"><img :src="item.src"></span>
                                            <b-form-file v-model="item.file" class="form-file" :disabled="item.loaded>0 && item.loaded<100" accept="image/*"></b-form-file>
                                        </div>
                                        <div>{{item.text}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="upload-error" 
                                v-if="licenseError">！请上传营业执照证件照，大小不超过2M</div>
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
                                    <b-form-select v-model="bank.type.selected" @change.native="selectChange(1)" :options="bank.type.options" class="mb-3">
                                    </b-form-select>
                                    <div class="select-view">{{bank.type.options[bank.type.selected].text}}</div>
                                </div> 
                            </div>
                            <div class="infor-right" v-show="bank.type.error">！请选择账户类型</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户银行</div>
                            <div class="infor-center">
                                <div class="select-box">
                                    <b-form-select v-model="bank.bankName.selected" @change.native="selectChange(2)" :options="bank.bankName.options" class="mb-3">
                                    </b-form-select>
                                    <div class="select-view">{{bank.bankName.options[bank.bankName.selected].text}}</div>
                                </div> 
                            </div>
                            <div class="infor-right" v-show="bank.bankName.error">！请选择开户银行</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户地址</div>
                            <div class="infor-center" flex>
                                <areas @select="select"></areas>
                            </div>
                            
                            <div class="infor-right" v-show="bank.address.error">！请选择开户地址</div>
                        </li>
                        <li flex v-for="(item,index) in bank.lists" :key="index">
                            <div class="infor-left">{{item.name}}</div>
                            <div class="infor-center">
                                <input type="text" 
                                    v-if="index==2"
                                    :placeholder="'请输入'+item.name" 
                                    v-model="item.model" 
                                    :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    @keyup="item.model = item.model.replace(/\D/g,'').replace(/....(?!$)/g, '$& ')" 
                                    @afterpaste="item.model = item.model.replace(/\D/g,'').replace(/....(?!$)/g, '$& ')"
                                    />
                                <input type="text" 
                                    v-else
                                    :placeholder="'请输入'+item.name" 
                                    v-model="item.model" 
                                    :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    />
                            </div>
                            <div class="infor-right" v-show="item.error">！{{item.name}}不能为空</div>
                        </li>
                    </ul>
                </div>
                <div class="contacts">
                    <h6>联系人信息</h6>
                    <ul class="common-lists">
                        <li flex v-for="(item,index) in contacts.inputs" :key="index">
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
                            <div class="upload-img-box" :class="{front:index==0,contrary:index==1,uploading:item.loaded<=0}" v-for="(item,index) in contacts.files" :key="index">
                                <span class="span-bg" :style="{height:item.loaded+'%'}"></span>
                                <span class="span-percent" v-if="item.loaded>0 && item.loaded<100">上传中{{item.loaded}}%</span>
                                <span class="span-percent" v-if="item.loaded>=100"><img :src="item.src" ></span>
                                <i>{{item.text}}</i>
                                <b-form-file v-model="item.file" class="form-file" :disabled="item.loaded>0 && item.loaded<100" accept="image/*" @change.native="uploadFile(item.file)"></b-form-file>
                            </div>
                        </div>
                        <div class="upload-error"
                            v-if="contacts.files[0].loaded<100 || contacts.files[1].loaded<100">！请上传身份证，大小不超过2M</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-btn" flex="main:center">
            <button @click.stop="submit">提交</button>
        </div>
        <!-- <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
    </div>
</template>

<script>
    /*import {Upload} from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'*/
    import '../less/authentication.less';
    import {checkPhone,valiIdCard,isValidOrgCode,checkSocialCreditCode,checkMail,valiRealName,checkTencent} from '../tools/fun';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    import Areas from '../components/Areas';
    export default {
        name: 'authentication',
        data(){
            return {
                date:null,
                tab:1,
                companyInfor:[
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
                                text:'中国银行',
                                value:1
                            },
                            {
                                text:'中国工商银行',
                                value:2
                            },
                            {
                                text:'中国农业银行',
                                value:3
                            },
                            {
                                text:'中国建设银行',
                                value:4
                            },
                            {
                                text:'中国交通银行',
                                value:5
                            },
                            {
                                text:'民生银行',
                                value:6
                            },
                            {
                                text:'光大银行',
                                value:7
                            },
                            {
                                text:'广发银行',
                                value:8
                            },
                            {
                                text:'兴业银行',
                                value:9
                            },
                            {
                                text:'平安银行',
                                value:10
                            },
                            {
                                text:'浦发银行',
                                value:11
                            },
                            {
                                text:'上海银行',
                                value:12
                            },
                            {
                                text:'邮储银行',
                                value:13
                            },
                            {
                                text:'中信银行',
                                value:14
                            },
                            {
                                text:'招商银行',
                                value:15
                            },
                            {
                                text:'华夏银行',
                                value:16
                            }
                        ]
                    },
                    address:{
                        province:null,
                        city:null
                    },
                    lists:[
                        {
                            name:'支行名称',
                            maxlength:30,
                            error:false,
                            model:''
                        },
                        {
                            name:'开户人姓名',
                            maxlength:30,
                            error:false,
                            model:''
                        },
                        {
                            name:'银行卡号',
                            maxlength:24,
                            error:false,
                            model:''
                        }
                    ]
                },
                //资质
                aptitude:{
                    legalPersonIdcard:{//法人身份证
                        file:null,
                        text:'法人身份证',
                        loaded:0,
                        src:null
                    },
                    other:[
                        {
                            file:null,
                            text:'营业执照',
                            loaded:0,
                            src:null
                        },
                        {
                            file:null,
                            text:'组织机构代码证',
                            loaded:10,
                            src:null
                        },
                        {
                            file:null,
                            text:'税务登记证',
                            loaded:0,
                            src:null
                        }
                    ]
                },
                //联系人信息
                contacts:{
                    inputs:[
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
                    files:[
                        {
                            text:'正面照',
                            file:null,
                            loaded:0
                        },
                        {
                            text:'反面照',
                            file:null,
                            loaded:0
                        }
                    ]
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created(){
            console.log(Areas)
        },
        computed: {
            licenseError:function(){
                return (this.aptitude.other[0].loaded<100) && (this.aptitude.other[1].loaded<100) && (this.aptitude.other[2].loaded<100)
            }
        },
        components: { Areas},
        methods: {
            uploadFile(str){
                let parm = null;
                console.log(str)
                $api.get('/channel/file/upload',{file:str}).then(msg => {
                    if(msg.code == 200){
                        console.log(msg)
                    }else{
                        Toast(msg.msg);
                    }
                });
            },
            submit(){
                //企业信息
                if(this.listCheck(this.companyInfor)){
                    return
                }
                let [fullName,calPerson,appName,institutionCode,contactWay,companyMail,companyAddress] = this.companyInfor;

                //组织机构代码校验
                let orgCode = institutionCode.model.replace(/\s+/g, "");
                if(orgCode.length>10){
                    //统一社会信用代码
                    if(!checkSocialCreditCode(orgCode)){
                        Toast('统一社会信用代码输入有误')
                        return
                    }
                }else{
                    if(!isValidOrgCode(orgCode)){
                        Toast('组织机构代码码输入有误')
                        return
                    }
                }
                //邮箱验证
                let comMail = companyMail.model;
                if(!checkMail(comMail)){
                    Toast('公司邮箱输入有误');
                    return 
                }


                if(this.aptitude.legalPersonIdcard.loaded<100){
                    Toast('请上传法人身份证照！')
                    return
                }

                //上传资质
                if(this.licenseError){
                    Toast('请上传营业执照证件照')
                    return
                }
                //银行卡信息
                let [branchName,accountName,bankCard] = this.bank.lists
                if(this.bank.type.selected == 0){
                    this.bank.type.error = true;
                    Toast('请选择账户类型');
                    return 
                }
                if(this.bank.bankName.selected == 0){
                    this.bank.bankName.error = true;
                    Toast('请选择开户银行');
                    return 
                }
                if((this.bank.address.province.selected == 0) || (this.bank.address.city.selected == 0)){
                    this.bank.address.error = true;
                    Toast('请选择开户地址');
                    return 
                }
                if(this.listCheck(this.bank.lists)){
                    return
                }
                if(!valiRealName(accountName)){
                    Toast('开户人姓名输入有误');
                    return
                }
                //联系人信息
                if(this.listCheck(this.contacts.inputs)){
                    return
                }

                let [concatName,concatNumber,concatMail,concatIdCard,concatTencent] = this.contacts.inputs;
                if(!valiRealName(concatName.model)){
                    Toast('姓名输入有误');
                    return
                }
                if(!checkPhone(concatNumber.model)){
                    Toast('手机号输入有误');
                    return
                }
                if(!checkMail(concatMail.model)){
                    Toast('邮箱地址输入有误');
                    return
                }
                if(!valiIdCard(concatIdCard.model)){
                    Toast('身份证号输入有误');
                    return
                }
                if(!checkTencent(concatTencent.model)){
                    Toast('微信/QQ号输入有误');
                    return
                }
                if((this.contacts.files[0].loaded < 100) || (this.contacts.files[1].loaded < 100)){
                    Toast('请上传身份证！');
                    return
                }
            },
            listCheck(arr){
                for(let obj of arr){
                    let model = obj.model.replace(/\s+/g, "");
                    if(model.length < 1){
                        obj.error = true;
                        Toast(obj.name+'不能为空！');
                        return true;
                    }
                }
            },
            selectChange(status){
                if(status == 1){
                    setTimeout(()=>{
                        this.bank.type.error = !this.bank.type.selected
                    })
                }else if(status == 2){
                    setTimeout(()=>{
                        this.bank.bankName.error = !this.bank.bankName.selected
                    })
                }else if(status == 3){
                    setTimeout(()=>{
                        this.bank.address.error = !this.bank.address.province.selected || !this.bank.address.city.selected
                    })
                }
            },
            bankCardFormat(){
                this.bankCard = this.bankCard.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
            },
            select(re){
                this.bank.address.province = re.pro.name;
                this.bank.address.city = re.city.name;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
              },
              handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
              }
        },
        destroyed(){

        }
    }
</script>
