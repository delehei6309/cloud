<template>
    <div class="authentication">
        <div class="authentication-body">
            <div class="header-p">开通产品标准接入服务，需要客户提交资料并上传相应的凭证，请务必正确填写，我们将尽快联系到您。</div>
            <div class="header-select" flex>
                <div class="select-text">请选择您的所属身份</div>
                <div class="select-btn" flex>
                    <button :class="{'active':channelType == 2}" @click.stop="channelType=2">企业</button>
                    <button :class="{'active':channelType == 1}" @click.stop="channelType=1">个人</button>
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
                            <div class="idcard-box upload-img-box" :class="{uploading:uploadPhotos.legalIdCard.progress<=0}">
                                <span class="span-bg" :style="{height:uploadPhotos.legalIdCard.progress+'%'}"></span>
                                <span class="span-percent" 
                                    v-if="uploadPhotos.legalIdCard.progress>0 && uploadPhotos.legalIdCard.progress<100">上传中{{uploadPhotos.legalIdCard.progress}}%</span>
                                <span class="span-percent" v-if="uploadPhotos.legalIdCard.progress>=100"><img :src="uploadPhotos.legalIdCard.src"></span>
                                <vue-core-image-upload
                                    class="btn btn-primary"
                                    inputOfFile="file"
                                    :data="data"
                                    :max-file-size="209715200"
                                    :url="`${serverUrl}/channel/file/upload`"
                                    @imageuploaded="imageuploaded"
                                    @imageuploading = "imageuploading(uploadPhotos.legalIdCard.status)"
                                    @imagechanged = "imagechanged(uploadPhotos.legalIdCard.status)" >
                                </vue-core-image-upload>
                            </div>
                            <div class="upload-error" v-show="legalIdCardError">！请上传法人身份证照，大小不超过2M</div>
                        </div>
                        <div class="qualification">
                            <div flex>
                                <div class="upload-text">
                                    <p>上传公司资质</p>
                                    <p class="text-last">(三证合一只需上传一张)</p>
                                </div>
                                <div class="qualification-box" flex>
                                    <div class="license imgs" v-for="(item,index) in uploadPhotos.qualification" :key="index">
                                        <div class="upload-img-box" :class="{uploading:item.progress<=0}">
                                            <span class="span-bg" :style="{height:item.progress+'%'}"></span>
                                            <span v-if="item.progress>0 && item.progress<100" class="span-percent">上传中{{item.progress}}%</span>
                                            <span v-if="item.progress>=100" class="span-percent"><img :src="item.src"></span>
                                            <vue-core-image-upload
                                                class="btn btn-primary"
                                                inputOfFile="file"
                                                :data="data"
                                                :max-file-size="209715200"
                                                :url="`${serverUrl}/channel/file/upload`"
                                                @imageuploaded="imageuploaded"
                                                @imageuploading = "imageuploading(item.status)"
                                                @imagechanged = "imagechanged(item.status)" >
                                            </vue-core-image-upload>
                                        </div>
                                        <div>{{item.text}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="upload-error" v-show="licenseError">！请上传营业执照证件照，大小不超过2M</div>
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
                            <div class="upload-img-box" :class="{front:index==0,contrary:index==1,uploading:item.progress<=0}" v-for="(item,index) in uploadPhotos.linkIdCard" :key="index">
                                <span class="span-bg" :style="{height:item.progress+'%'}"></span>
                                <span class="span-percent" v-if="item.progress>0 && item.progress<100">上传中{{item.progress}}%</span>
                                <span class="span-percent" v-if="item.progress>=100"><img :src="item.src"></span>
                                <i>{{item.text}}</i>
                                <!-- <vue-file-upload
                                    :autoUpload = "true"
                                    :url="`${serverUrl}/channel/file/upload`"
                                    ref="vueFileUploader"
                                    v-bind:filters = "filters"
                                    v-bind:events = "cbEvents"
                                    v-bind:request-options = "reqopts"
                                    v-on:onAdd = "onAddItem">
                                </vue-file-upload> -->
                                <vue-core-image-upload
                                    class="btn btn-primary"
                                    inputOfFile="file"
                                    :data="data"
                                    :max-file-size="209715200"
                                    :url="`${serverUrl}/channel/file/upload`"
                                    @imageuploaded="imageuploaded"
                                    @imageuploading = "imageuploading(item.status)"
                                    @imagechanged = "imagechanged(item.status)" >
                                </vue-core-image-upload>
                            </div>
                        </div>
                        <div class="upload-error" v-show="linkIdCardError">！请上传身份证，大小不超过2M</div>
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
    import VueCoreImageUpload from 'vue-core-image-upload';
    import '../less/authentication.less';
    import {checkPhone,valiIdCard,isValidOrgCode,checkSocialCreditCode,checkMail,valiRealName,checkTencent} from '../tools/fun';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    import Areas from '../components/Areas';
    export default {
        name: 'authentication',
        data(){
            return {
                data:{
                    parm:'000'
                },
                imgsrc:null,
                date:null,
                channelType:2,
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
                        city:null,
                        error:false
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
                    ]
                },
                uploadPhotos:{
                    legalIdCard:{
                        status:1,
                        progress:0,
                        name:'',
                        src:null
                    },
                    qualification:[
                        {
                            status:2,
                            text:'营业执照证件照',
                            progress:0,
                            name:'',
                            src:null 
                        },
                        {
                            status:3,
                            text:'组织机构代码证照',
                            progress:0,
                            name:'',
                            src:null 
                        },
                        {
                            status:4,
                            text:'税务登记照',
                            progress:0,
                            name:'',
                            src:null 
                        }
                    ],
                    linkIdCard:[
                        {
                            status:5,
                            progress:0,
                            text:'正面照',
                            name:'',
                            src:null
                        },
                        {
                            status:6,
                            progress:0,
                            text:'反面照',
                            name:'',
                            src:null
                        }
                    ]
                },
                uploadStatus:0
            }
        },
        created(){
            console.log(this.serverUrl)
        },
        computed: {
            licenseError:function(){
                return (this.uploadPhotos.qualification[0].progress<100) && (this.uploadPhotos.qualification[1].progress<100) && (this.uploadPhotos.qualification[2].progress<100)
            },
            linkIdCardError:function(){
                return (this.uploadPhotos.linkIdCard[0].progress < 100) || (this.uploadPhotos.linkIdCard[1].progress < 100)
            },
            legalIdCardError:function(){
                return (this.uploadPhotos.legalIdCard.progress < 100)
            },
            serverUrl:function(){
                return $api.serverUrl;
            }
        },
        components: { Areas,VueCoreImageUpload},
        methods: {
            imageuploading(){
                console.log('000')
            },
            imageuploaded(res){
                console.log(res)
                if(res.code == 200){
                    let src = res.data.attachmentLink;
                    let name = res.data.attachmentName;
                    let parm = res.data.parm;
                    /*if(parm == 1){
                        this.uploadPhotos.legalIdCard.src = src;
                    }else if(parm > 4){
                        this.uploadPhotos.linkIdCard[parm-5].src = src;
                        this.uploadPhotos.linkIdCard[parm-5].progress = 100;
                    }else if((parm > 1) && (parm <= 4)){
                        this.uploadPhotos.qualification[parm-2].src = src;
                        this.uploadPhotos.qualification[parm-2].progress = 100;
                    }*/
                    this.photo(parm).src = src;
                    this.photo(parm).name = name;
                    this.photo(parm).progress = 100;
                }
            },
            setProcess(height){
                let things = () =>{
                    if(height>=100){
                        height = 100
                    }else{
                        height++;
                        setTimeout(()=>{
                            things();
                        }) 
                    }
                }
            },
            photo(parm){
                let obj = {};
                if(parm == 1){
                    obj = this.uploadPhotos.legalIdCard;
                }else if(parm > 4){
                    obj = this.uploadPhotos.linkIdCard[parm-5];
                }else if((parm > 1) && (parm <= 4)){
                    obj = this.uploadPhotos.qualification[parm-2];
                }
                return obj;
            },
            imagechanged(status){
                this.data.parm = status;
            },
            submit(){
                /*--------------企业信息--------------*/
                if(this.listCheck(this.companyInfor)){
                    return
                }
                let [fullName,calPerson,appName,institutionCode,contactWay,companyMail,companyAddress] = this.companyInfor;
                let compFullName = fullName.model,
                    compLegalPerson = calPerson.model,
                    channelAppName = appName.model,
                    compOrganizationCode = institutionCode.model.replace(/\s+/g, ""),//组织机构代码校验
                    compContactWay = contactWay.model,
                    channelEmail = companyMail.model,
                    compAddress = companyAddress.model;
                if(compOrganizationCode.length>10){
                    //统一社会信用代码
                    if(!checkSocialCreditCode(compOrganizationCode)){
                        Toast('统一社会信用代码输入有误')
                        return
                    }
                }else{
                    if(!isValidOrgCode(compOrganizationCode)){
                        Toast('组织机构代码码输入有误')
                        return
                    }
                }
                //邮箱验证
                if(!checkMail(channelEmail)){
                    Toast('公司邮箱输入有误');
                    return 
                }

                /*--------------上传资质----------------*/
                if(this.legalIdCardError){
                    Toast('请上传法人身份证照！')
                    return;
                }

                let legalPersonIdImgPath = this.uploadPhotos.legalIdCard.src;
                //上传资质
                if(this.licenseError){
                    Toast('请上传营业执照证件照')
                    return
                }

                let businessLicenceImgPath = this.uploadPhotos.qualification[0].src;
                let orgCodeImgPath = this.uploadPhotos.qualification[1].src;
                let taxRegImgPath = this.uploadPhotos.qualification[2].src;
                /*--------------银行卡信息----------------*/
                let accountType = this.bank.type.selected;
                let [branchName,accountName,bankCard] = this.bank.lists
                if(accountType == 0){
                    this.bank.type.error = true;
                    Toast('请选择账户类型');
                    return 
                }
                let bankIndex = this.bank.bankName.selected;
                if(bankIndex == 0){
                    this.bank.bankName.error = true;
                    Toast('请选择开户银行');
                    return 
                }
                let depositBank = this.bank.bankName.options[bankIndex].text;//开户银行
                if((this.bank.address.province.selected == 0) || (this.bank.address.city.selected == 0)){
                    this.bank.address.error = true;
                    Toast('请选择开户地址');
                    return 
                }
                let bankProvince = this.bank.address.province,bankCity = this.bank.address.city;
                let depositAddress = (bankProvince + '-' + bankCity);//开户地址
                if(this.listCheck(this.bank.lists)){
                    return
                }
                let subBranch = this.bank.lists[0].name;
                if(!valiRealName(accountName)){
                    Toast('开户人姓名输入有误');
                    return
                }
                /*-----------------------------联系人信息----------------------------------------*/
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
                if(this.linkIdCardError){
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
                if(this.bank.address.province != null){
                    if(re.pro.name == '请选择'){
                        this.bank.address.error = true;
                    }else{
                        this.bank.address.error = false;
                    }
                }
                this.bank.address.province = re.pro.name;
                this.bank.address.city = re.city.name;
                    
                
            }
        },
        destroyed(){

        }
    }
</script>
