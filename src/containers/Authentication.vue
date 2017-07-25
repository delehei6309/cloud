<template>
    <div class="authentication">
        <div class="authentication-body">
            <div class="header-p">开通金融云开放服务，需要客户提交资料并上传相应的凭证，请务必正确填写，我们将尽快联系到您。</div>
            <div class="header-select" flex>
                <div class="select-text">请选择您的所属身份</div>
                <div class="select-btn no-pointer" flex v-if="disabled">
                    <button :class="{'active':channelType == 2}">企业</button>
                    <button :class="{'active':channelType == 1}">个人</button>
                </div>
                <div class="select-btn" flex v-else>
                    <button :class="{'active':channelType == 2}" @click.stop="channelType=2">企业</button>
                    <button :class="{'active':channelType == 1}" @click.stop="channelType=1">个人</button>
                </div>
            </div>
            <div class="authentication-content">
                <div class="content-infor">
                    <h6>企业信息</h6>
                    <ul class="common-lists">
                        <li flex v-for="(item,index) in companyInfor" :key="index" :class="item.dom">
                            <template v-if="index == 3">
                                <div class="infor-left">{{item.name}}</div>
                                <div class="infor-center">
                                    <input type="text" :placeholder="item.placeholder" v-model="item.model" :maxlength="item.maxlength"
                                        :disabled="disabled"
                                        @focus="item.error=false" 
                                        @blur="item.model.length<1 ? item.error=true : ''"
                                        @keyup="item.model = item.model.replace(/\s+/g, '')" 
                                        @afterpaste="item.model = item.model.replace(/\s+/g, '')"
                                        >
                                </div>
                                <div class="infor-right" v-show="item.error">
                                    <span v-if="item.model.length<1">！统一社会信用代码不能为空</span>
                                    <span v-else>！请输入正确的统一社会信用代码</span>
                                </div>
                            </template>
                            <template v-else>
                                <div class="infor-left">{{item.name}}</div>
                                <div class="infor-center">
                                    <input type="text" :placeholder="item.placeholder" v-model="item.model" :maxlength="item.maxlength" 
                                        :disabled="disabled"
                                        @focus="item.error=false" 
                                        @blur="item.model.length<1 ? item.error=true : ''"
                                        >
                                </div>
                                <div class="infor-right" v-show="item.error">
                                    <span v-if="item.model.length<1">！{{item.name}}不能为空</span>
                                    <span v-else>！请输入正确的{{item.name}}</span>
                                </div>
                            </template>
                        </li>
                    </ul>
                </div>
                <div class="content-upload">
                    <h6>上传资质</h6>
                    <div class="upload">
                        <div class="idcard" flex :class="uploadPhotos.legalIdCard.dom">
                            <div class="upload-text">上传法人身份证</div>
                            <div class="idcard-box upload-img-box" :class="{uploading:uploadPhotos.legalIdCard.progress<=0}">
                                <span class="span-bg" 
                                    :style="{height:uploadPhotos.legalIdCard.progress+'%'}" 
                                    v-show="uploadPhotos.legalIdCard.progress>0 && uploadPhotos.legalIdCard.progress<100"></span>
                                <span class="span-percent" 
                                    v-if="uploadPhotos.legalIdCard.progress>0 && uploadPhotos.legalIdCard.progress<100">上传中{{parseInt(uploadPhotos.legalIdCard.progress)}}%</span>
                                <span class="span-percent perent-img" v-if="uploadPhotos.legalIdCard.progress>=100"
                                    @click.stop="viewImg=uploadPhotos.legalIdCard.src;photoShow=true">
                                    <img :src="uploadPhotos.legalIdCard.src">
                                </span>
                                <vue-core-image-upload
                                    class="btn btn-primary"
                                    v-if="!disabled"
                                    :title="uploadPhotos.legalIdCard.fileTitle"
                                    v-show="uploadPhotos.legalIdCard.progress==0 || uploadPhotos.legalIdCard.progress==100"
                                    inputOfFile="file"
                                    :data="data"
                                    :max-file-size="209715200"
                                    :url="`${serverUrl}/channel/file/upload`"
                                    @imageuploaded="imageuploaded"
                                    @imagechanged = "imagechanged(uploadPhotos.legalIdCard.status)" >
                                </vue-core-image-upload>
                            </div>
                            <div class="upload-error" v-show="legalIdCardError && photoError1">！请上传法人身份证照，大小不超过2M</div>
                        </div>
                        <div class="qualification">
                            <div flex>
                                <div class="upload-text">
                                    <p>上传公司资质</p>
                                    <p class="text-last">(三证合一只需上传一张)</p>
                                </div>
                                <div class="qualification-box" flex>
                                    <div class="license imgs" v-for="(item,index) in uploadPhotos.qualification" :key="index" :class="item.dom">
                                        <div class="upload-img-box" :class="{uploading:item.progress<=0}">
                                            <span class="span-bg" :style="{height:item.progress+'%'}" v-show="item.progress>0 && item.progress<100"></span>
                                            <span v-if="item.progress>0 && item.progress<100" class="span-percent">上传中{{parseInt(item.progress)}}%</span>
                                            <span v-if="item.progress>=100" class="span-percent perent-img"
                                                @click.stop="viewImg=item.src;photoShow=true">
                                                <img :src="item.src">
                                            </span>
                                            <vue-core-image-upload
                                                class="btn btn-primary"
                                                v-if="!disabled"
                                                :title="item.fileTitle"
                                                v-show="item.progress==0 || item.progress ==100"
                                                inputOfFile="file"
                                                :data="data"
                                                :max-file-size="209715200"
                                                :url="`${serverUrl}/channel/file/upload`"
                                                @imageuploaded="imageuploaded"
                                                @imagechanged = "imagechanged(item.status)" >
                                            </vue-core-image-upload>
                                        </div>
                                        <div>{{item.text}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="upload-error">
                                <span v-show="licenseError && photoError2">！请上传营业执照证件照，大小不超过2M</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bank-card">
                    <h6>银行卡信息<span>（请确保正确填写银行卡信息，便于结款准确到账）</span></h6>
                    <ul class="common-lists">
                        <li flex :class="bank.type.dom">
                            <div class="infor-left">账户类型</div>
                            <div class="infor-center">
                                <div class="select-box">
                                    <b-form-select class="mb-3"
                                        v-model="bank.type.selected"
                                        @change.native="selectChange(1)" 
                                        :options="bank.type.options"
                                        :disabled="disabled">
                                    </b-form-select>
                                    <div class="select-view">{{bank.type.options[bank.type.selected].text}}</div>
                                </div> 
                            </div>
                            <div class="infor-right" v-show="bank.type.error">！请选择账户类型</div>
                        </li>
                        <li flex :class="bank.address.dom">
                            <div class="infor-left">开户地址</div>
                            <div class="infor-center" flex>
                                <areas @select="select" :disabled="disabled"></areas>
                            </div>
                            <div class="infor-right" v-show="bank.address.error">！请选择开户地址</div>
                        </li>
                        <li flex v-for="(item,index) in bank.lists" :key="index" :class="item.dom">
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
                                    @input="gainBank"
                                    :disabled="disabled"
                                    />
                                <input type="text" 
                                    v-else
                                    :placeholder="'请输入'+item.name" 
                                    v-model="item.model" 
                                    :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    :disabled="disabled"
                                    />
                            </div>
                            <div class="infor-right" v-show="item.error">
                                <span v-if="item.model.length<1">！{{item.name}}不能为空</span>
                                <span v-else>！请输入正确的{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <p class="the-bank">{{theBank}}</p>
                </div>
                <div class="contacts">
                    <h6>联系人信息</h6>
                    <ul class="common-lists">
                        <li flex v-for="(item,index) in contacts" :key="index" :class="item.dom">
                            <div class="infor-left">{{item.name}}</div>
                            <div class="infor-center">
                                <template v-if="index==1">
                                    <input type="text" :placeholder="'请输入'+item.name"  v-model="item.model" :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    @keyup="item.model = item.model.replace(/\D/g,'')" 
                                    @afterpaste="item.model = item.model.replace(/\D/g,'')"
                                    :disabled="disabled"
                                    >
                                </template>
                                <template v-else>
                                    <input type="text" :placeholder="'请输入'+item.name"  v-model="item.model" :maxlength="item.maxlength" 
                                    @focus="item.error=false" 
                                    @blur="item.model.length<1 ? item.error=true : ''"
                                    :disabled="disabled"
                                    >
                                </template>
                                
                            </div>
                            <div class="infor-right" v-show="item.error">
                                <span v-if="item.model.length<1">！{{item.name}}不能为空</span>
                                <span v-else>！请输入正确的{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="upload-photo" >
                        <div flex :class="uploadPhotos.linkIdCard[0].dom">
                            <div class="upload-text">上传联系人身份证照</div>
                            <div class="upload-img-box" :class="{front:index==0,contrary:index==1,uploading:item.progress<=0}" v-for="(item,index) in uploadPhotos.linkIdCard" :key="index">
                                <span class="span-bg" :style="{height:item.progress+'%'}" v-show="item.progress>0 && item.progress<100"></span>
                                <span class="span-percent" v-if="item.progress>0 && item.progress<100">上传中{{parseInt(item.progress)}}%</span>
                                <span class="span-percent perent-img" v-if="item.progress>=100"
                                    @click.stop="viewImg=item.src;photoShow=true">
                                    <img :src="item.src">
                                </span>
                                <i>{{item.text}}</i>
                                <vue-core-image-upload
                                    class="btn btn-primary"
                                    :title="item.fileTitle"
                                    v-if="!disabled"
                                    v-show="item.progress==0 || item.progress ==100"
                                    inputOfFile="file"
                                    :data="data"
                                    :max-file-size="209715200"
                                    :url="`${serverUrl}/channel/file/upload`"
                                    @imageuploaded="imageuploaded"
                                    @imagechanged = "imagechanged(item.status)" >
                                </vue-core-image-upload>
                            </div>
                        </div>
                        <div class="upload-error">
                            <span v-show="linkIdCardError && photoError3">！请上传身份证件照，大小不超过2M</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-btn" flex="main:center" v-if="!disabled">
            <button @click.stop="submit">提交</button>
        </div>
        <div class="photo-box" v-show="photoShow">
            <div class="photo-bg"></div>
            <div class="photo-wrap" flex="main:center cross:center" @click.stop="photoShow=false">
                <img :src="viewImg" alt="">
            </div>
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
                viewImg:'http://10.10.10.5:8090/group1/M00/00/00/CgoKBVjvWlaAflp3AAE_h9VcFx0725_big.png',
                photoShow:false,
                data:{
                    parm:''
                },
                date:null,
                channelType:2,
                theBank:'',
                companyInfor:[
                    {
                        name:'公司全称',
                        placeholder:'请输入公司名称',
                        dom:'dom1',
                        maxlength:30,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司法人',
                        placeholder:'请输入公司法人',
                        dom:'dom2',
                        maxlength:16,
                        error:false,
                        model:''
                    },
                    {
                        name:'APP名称',
                        placeholder:'请输入APP名称',
                        dom:'dom3',
                        maxlength:8,
                        error:false,
                        model:''
                    },
                    {
                        name:'统一社会信用代码',
                        placeholder:'请输入组织机构代码/统一社会信用代码',
                        dom:'dom4',
                        maxlength:18,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司联系方式',
                        placeholder:'请输入公司联系方式',
                        dom:'dom5',
                        maxlength:20,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司邮箱',
                        placeholder:'请输入公司邮箱',
                        dom:'dom6',
                        maxlength:30,
                        error:false,
                        model:''
                    },
                    {
                        name:'公司地址',
                        placeholder:'请输入公司地址',
                        dom:'dom7',
                        maxlength:30,
                        error:false,
                        model:''
                    }
                ],
                bank:{
                    type:{
                        error:false,
                        dom:'bank1',
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
                    address:{
                        province:null,
                        city:null,
                        error:false,
                        dom:'bank2'
                    },
                    lists:[
                        {
                            name:'支行名称',
                            maxlength:30,
                            error:false,
                            dom:'bank-list1',
                            model:''
                        },
                        {
                            name:'开户人姓名',
                            maxlength:30,
                            error:false,
                            dom:'bank-list2',
                            model:''
                        },
                        {
                            name:'银行卡号',
                            maxlength:24,
                            error:false,
                            dom:'bank-list3',
                            model:''
                        }
                    ]
                },
                //联系人信息
                contacts:[
                    {
                        name:'姓名',
                        maxlength:30,
                        error:false,
                        dom:'link-list1',
                        model:''
                    },
                    {
                        name:'手机号',
                        maxlength:11,
                        error:false,
                        dom:'link-list2',
                        model:''
                    },
                    {
                        name:'邮箱',
                        maxlength:30,
                        error:false,
                        dom:'link-list3',
                        model:''
                    },
                    {
                        name:'身份证号',
                        maxlength:18,
                        error:false,
                        dom:'link-list4',
                        model:''
                    },
                    {
                        name:'微信／QQ号',
                        maxlength:30,
                        error:false,
                        dom:'link-list5',
                        model:''
                    }
                ],
                uploadPhotos:{
                    legalIdCard:{
                        status:1,
                        progress:0,
                        loading:false,
                        fileTitle:'请选择上传图片',
                        dom:'img1',
                        src:null
                    },
                    qualification:[
                        {
                            status:2,
                            text:'营业执照证件照',
                            progress:0,
                            loading:false,
                            fileTitle:'请选择上传图片',
                            dom:'img2',
                            src:null 
                        },
                        {
                            status:3,
                            text:'组织机构代码证照',
                            progress:0,
                            loading:false,
                            fileTitle:'请选择上传图片',
                            dom:'img2',
                            src:null 
                        },
                        {
                            status:4,
                            text:'税务登记照',
                            progress:0,
                            loading:false,
                            dom:'img2',
                            fileTitle:'请选择上传图片',
                            src:null 
                        }
                    ],
                    linkIdCard:[
                        {
                            status:5,
                            progress:0,
                            loading:false,
                            text:'正面照',
                            fileTitle:'请选择上传图片',
                            dom:'id-card1',
                            src:null
                        },
                        {
                            status:6,
                            progress:0,
                            loading:false,
                            text:'反面照',
                            fileTitle:'请选择上传图片',
                            dom:'id-card2',
                            src:null
                        }
                    ]
                },
                photoError1:false,
                photoError2:false,
                photoError3:false,
                disabled:false,
                ajaxUrl:'/channel/insert'
            }
        },
        created(){
            let channelUuid = this.$route.query.channelUuid;
            let preview = this.$route.query.preview;
            console.log(channelUuid)
            if(channelUuid){
                if(preview){
                    this.disabled = true;
                }
                this.ajaxUrl = 'channel/update'//保存接口
                $api.get('/channel/'+channelUuid).then(msg=>{
                    if(msg.code == 200){
                        let data = msg.data;
                        this.channelType = data.channelType;
                        this.companyInfor[0].model = data.compFullName;
                        this.companyInfor[1].model = data.compLegalPerson;
                        this.companyInfor[2].model = data.channelAppName;
                        this.companyInfor[3].model = data.compOrganizationCode;
                        this.companyInfor[4].model = data.compContactWay;
                        this.companyInfor[5].model = data.channelEmail;
                        this.companyInfor[6].model = data.compAddress;

                        this.uploadPhotos.legalIdCard.src = data.legalPersonIdImgPath;
                        this.uploadPhotos.legalIdCard.progress = 100;
                        this.uploadPhotos.qualification[0].src = data.businessLicenceImgPath;
                        this.uploadPhotos.qualification[0].progress = 100;
                        this.uploadPhotos.qualification[1].src = data.orgCodeImgPath;
                        this.uploadPhotos.qualification[1].progress = 100;
                        this.uploadPhotos.qualification[2].src = data.taxRegImgPath;
                        this.uploadPhotos.qualification[2].progress = 100;

                        this.bank.type.selected = data.accountType || 1;

                        this.bank.lists[0].model = data.subBranch;
                        this.bank.lists[1].model = data.depositPersonName;
                        this.bank.lists[2].model = data.bankCardNum;

                        this.contacts[0].model = data.linkmanName;
                        this.contacts[1].model = data.linkmanPhone;
                        this.contacts[2].model = data.linkmanEmail;
                        this.contacts[3].model = data.linkmanIdNum;
                        this.contacts[4].model = data.linkmanSocialSignal || '';

                        this.uploadPhotos.linkIdCard[0].src = data.linkmanIdFrontViewPath;
                        this.uploadPhotos.linkIdCard[0].progress = 100;
                        this.uploadPhotos.linkIdCard[1].src = data.linkmanIdBackViewPath;
                        this.uploadPhotos.linkIdCard[1].progress = 100;
                    }
                })
            }
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
            gainBank(){
                let bankCardNum = this.bank.lists[2].model.replace(/\s+/g, "");
                if(bankCardNum.length<6){
                    this.theBank = '';
                }
                if(bankCardNum.length == 6){
                    $api.get('/user/depositBank/'+bankCardNum).then(msg => {//6225880100567339
                        if(msg.code == 200){
                            this.theBank = msg.data.depositBank;
                        }else{
                            Toast(msg.msg);
                        }
                    });
                }
            },
            imageuploading(){
                console.log('000')
            },
            imageuploaded(res){
                if(res.code == 200){
                    let src = res.data.attachmentLink;
                    let name = res.data.attachmentName;
                    let parm = res.data.parm;
                    this.photo(parm).src = src;
                    this.photo(parm).name = name;
                    //this.photo(parm).progress = 100;
                    this.photo(parm).loading = true;
                    console.log(this.photo(parm))
                }
            },
            setProcess(status){
                let height = 0;
                let rate = 1,speed = (1+Math.random());
                let things = () =>{
                    if((height>=50) && (height<=75)){
                        //判断是否上传完成，若完成，则按原计划继续
                        if(this.photo(status).loading){
                            rate = 4*speed;
                            commEvent();
                            return
                        }
                        rate = speed/2;
                    }
                    if((height>75) && (height<=85)){
                        if(this.photo(status).loading){
                            rate = 4*speed;
                            commEvent();
                            return
                        }
                        rate = speed/4;
                    }
                    if((height>85) && (height<=95)){
                        if(this.photo(status).loading){
                            rate = 3*speed;
                            commEvent();
                            return
                        }
                        rate = speed/5;
                    }
                    if((height>95) && (height<100)){
                        if(this.photo(status).loading){
                            rate = 3*speed;
                            commEvent();
                            return
                        }
                        rate = 0;
                    }
                    commEvent();
                }
                let commEvent = () =>{
                    if(height>=100){
                        height = 100;
                        this.photo(status).fileTitle = '重新选择图片上传';
                        this.photo(status).progress = height;
                        return
                    }
                    height += rate;
                    this.photo(status).progress = height;
                    setTimeout(things,20) 
                }  
                things();
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
                this.photo(status).loading = false;
                this.photo(status).progress = 0;
                this.data.parm = status;
                this.setProcess(status);
            },
            submit(){
                /*--------------企业信息--------------*/
                if(this.listCheck(this.companyInfor)){
                    return
                }
                let parmData = {channelType:this.channelType};
                let [fullName,calPerson,appName,institutionCode,contactWay,companyMail,companyAddress] = this.companyInfor;
                parmData.compFullName = fullName.model;
                parmData.compLegalPerson = calPerson.model;
                parmData.channelAppName = appName.model;
                parmData.compOrganizationCode = institutionCode.model;//组织机构代码校验
                parmData.compContactWay = contactWay.model;
                parmData.channelEmail = companyMail.model;
                parmData.compAddress = companyAddress.model;
                if(!valiRealName(parmData.compLegalPerson)){
                    calPerson.error = true;
                    this.setScrollTop(calPerson.dom);
                    return
                }
                if(parmData.compOrganizationCode.length>10){
                    //统一社会信用代码
                    if(!checkSocialCreditCode(parmData.compOrganizationCode)){
                        institutionCode.error = true;
                        this.setScrollTop(institutionCode.dom)
                        return
                    }
                }else{
                    if(!isValidOrgCode(parmData.compOrganizationCode)){
                        institutionCode.error = true;
                        this.setScrollTop(institutionCode.dom)
                        return
                    }
                }
                //邮箱验证
                if(!checkMail(parmData.channelEmail)){
                    companyMail.error = true;
                    this.setScrollTop(companyMail.dom)
                    return 
                }

                /*--------------上传资质----------------*/
                if(this.legalIdCardError){
                    this.photoError1 = true;
                    this.setScrollTop(this.uploadPhotos.legalIdCard.dom)
                    return;
                }

                parmData.legalPersonIdImgPath = this.uploadPhotos.legalIdCard.src;
                //上传资质
                if(this.licenseError){
                    this.photoError2 = true;
                    this.setScrollTop(this.uploadPhotos.qualification[0].dom)
                    return
                }

                parmData.businessLicenceImgPath = this.uploadPhotos.qualification[0].src;
                parmData.orgCodeImgPath = this.uploadPhotos.qualification[1].src;
                parmData.taxRegImgPath = this.uploadPhotos.qualification[2].src;
                /*--------------银行卡信息----------------*/
                parmData.accountType = this.bank.type.selected;//账户类型
                let [branchName,accountName,bankCard] = this.bank.lists
                if(parmData.accountType == 0){
                    this.bank.type.error = true;
                    this.setScrollTop(this.bank.type.dom)
                    return 
                }
                parmData.depositBank = this.theBank;//开户银行

                if(this.bank.address.province == '\u8BF7\u9009\u62E9'){
                    this.bank.address.error = true;
                    this.setScrollTop(this.bank.address.dom)
                    return 
                }
                let bankProvince = this.bank.address.province,bankCity = this.bank.address.city;
                parmData.depositAddress = (bankProvince + '-' + bankCity);//开户地址

                if(this.listCheck(this.bank.lists)){
                    return
                }
                parmData.subBranch = branchName.model;
                parmData.depositPersonName = accountName.model;
                parmData.bankCardNum = bankCard.model.replace(/\s+/g, "");
                if(!valiRealName(parmData.depositPersonName)){
                    accountName.error = true;
                    this.setScrollTop(accountName.dom)
                    return
                }
                if(bankCard.model.length<16){
                    bankCard.error = true;
                    this.setScrollTop(bankCard.dom)
                    return
                }
                /*-----------------------------联系人信息----------------------------------------*/
                console.log(this.contacts)
                if(this.listCheck(this.contacts)){
                    return
                }

                let [concatName,concatNumber,concatMail,concatIdCard,concatTencent] = this.contacts;
                parmData.linkmanName = concatName.model;
                parmData.linkmanPhone = concatNumber.model;
                parmData.linkmanEmail = concatMail.model;
                parmData.linkmanIdNum = concatIdCard.model;
                parmData.linkmanSocialSignal = concatTencent.model;
                if(!valiRealName(concatName.model)){
                    concatName.error = true;
                    this.setScrollTop(concatName.dom);
                    return
                }
                if(!checkPhone(concatNumber.model)){
                    concatNumber.error = true;
                    this.setScrollTop(concatNumber.dom);
                    return
                }
                if(!checkMail(concatMail.model)){
                    concatMail.error = true;
                    this.setScrollTop(concatMail.dom);
                    return
                }
                if(!valiIdCard(concatIdCard.model)){
                    concatIdCard.error = true;
                    this.setScrollTop(concatIdCard.dom);
                    return
                }
                if(!checkTencent(concatTencent.model)){
                    concatTencent.error = true;
                    this.setScrollTop(concatTencent.dom);
                    return
                }
                if(this.linkIdCardError){
                    this.photoError3 = true;
                    this.setScrollTop(this.uploadPhotos.linkIdCard[0].dom)
                    return
                }
                parmData.linkmanIdFrontViewPath = this.uploadPhotos.linkIdCard[0].src;//正
                parmData.linkmanIdBackViewPath = this.uploadPhotos.linkIdCard[1].src;//反
                $api.post(this.ajaxUrl,{data:parmData}).then(msg => {
                    if(msg.code == 200){
                        this.$router.push('./submit-state');
                    }else{
                        Toast(msg.msg);
                    }
                });
            },
            listCheck(arr){
                for(let obj of arr){
                    let model = obj.model.replace(/\s+/g, "");
                    if(model.length < 1){
                        this.setScrollTop(obj.dom);
                        obj.error = true;
                        return true;
                    }
                }
            },
            setScrollTop(dom){
                let top = document.querySelector('.'+dom).offsetTop-100;
                window.scrollTo(0,top)
            },
            selectChange(){
                setTimeout(()=>{
                    this.bank.type.error = !this.bank.type.selected
                })
            },
            bankCardFormat(){
                this.bankCard = this.bankCard.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
            },
            select(re){
                if(this.bank.address.province != null){
                    if(re.pro.name == '\u8BF7\u9009\u62E9'){
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
