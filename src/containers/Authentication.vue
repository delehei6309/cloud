<template>
    <div class="authentication">
        <div class="authentication-body">
            <div class="header-p">开通产品标准接入服务，需要客户提交资料并上传相应的凭证，请务必正确填写，我们将尽快联系到您。</div>
            <div class="header-select" flex>
                <div class="select-text">请选择您的所属身份</div>
                <div class="select-btn" flex>
                    <button :class="{'active':true}">企业</button>
                    <button>个人</button>
                </div>
            </div>
            <div class="authentication-content">
                <div class="content-infor">
                    <h6>企业信息</h6>
                    <ul class="common-lists">
                        <li flex v-for="(item,index) in enterpriseInfor" :key="index">
                            <div class="infor-left">{{item.name}}</div>
                            <div class="infor-center"><input type="text" :placeholder="item.placeholder" :model="item.model"></div>
                            <div class="infor-right">！{{item.name}}不能为空</div>
                        </li>
                    </ul>
                </div>
                <div class="content-upload">
                    <h6>上传资质</h6>
                    <div class="upload">
                        <div class="idcard" flex>
                            <div class="upload-text">上传法人身份证</div>
                            <div class="idcard-box upload-img-box"><span class="span-bg"></span><span class="span-percent"></span></div>
                            <div class="upload-error">！请上传法人身份证照,大小不超过2M</div>
                        </div>
                        <div class="qualification">
                            <div flex>
                                <div class="upload-text">
                                    <p>上传法人身份证</p>
                                    <p class="text-last">(三证合一只需上传一张)</p>
                                </div>
                                <div class="qualification-box" flex>
                                    <div class="license imgs">
                                        <div class="upload-img-box"><span class="span-bg"></span><span class="span-percent"></span></div>
                                        <div>营业执照</div>
                                    </div>
                                    <div class="Certificate imgs">
                                        <div class="upload-img-box"><span class="span-bg"></span><span class="span-percent"></span></div>
                                        <div>组织机构代码证</div>
                                    </div>
                                    <div class="tax imgs">
                                        <div class="upload-img-box"><span class="span-bg"></span><span class="span-percent"></span></div>
                                        <div>税务登记证</div>
                                    </div>
                                </div>
                            </div>
                            <div class="upload-error">！请上传法人身份证照,大小不超过2M</div>
                        </div>
                    </div>
                </div>
                <div class="bank-card">
                    <h6>银行卡信息<span>（请确保正确填写银行卡信息，便于结款准确到账）</span></h6>
                    <ul class="common-lists">
                        <li flex>
                            <div class="infor-left">账户类型</div>
                            <div class="infor-center"><input type="text" placeholder="企业账户" ></div>
                            <div class="infor-right">！请选择账户类型</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户银行</div>
                            <div class="infor-center"><input type="text" placeholder="请选择" ></div>
                            <div class="infor-right">！请选择开户银行</div>
                        </li>
                        <li flex>
                            <div class="infor-left">开户地址</div>
                            <div class="infor-center"><input type="text" placeholder="请选择" ></div>
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
                            <div class="infor-center"><input type="text" :placeholder="'请输入'+item.name" :model="item.model"></div>
                            <div class="infor-right">！{{item.name}}不能为空</div>
                        </li>
                    </ul>
                    <div class="upload-photo" >
                        <div flex>
                            <div class="upload-text">上传联系人身份证照</div>
                            <div class="front upload-img-box">
                                <span class="span-bg"></span>
                                <span class="span-percent"></span>
                                <i>正面照</i>
                            </div>
                            <div class="contrary upload-img-box">
                                <span class="span-bg"></span>
                                <span class="span-percent">上传中22%</span>
                                <i>反面照</i>
                            </div>
                        </div>
                        <div class="upload-error">！请上传身份证，大小不超过2M</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-btn" flex="main:center">
            <button>提交</button>
        </div>
    </div>
</template>

<script>
    import '../less/authentication.less';
    export default {
        name: 'authentication',
        data(){
            return {
                loading:'22',
                enterpriseInfor:[
                    {
                        name:'公司全称',
                        placeholder:'请输入公司名称',
                        model:''
                    },
                    {
                        name:'公司法人',
                        placeholder:'请输入公司法人',
                        model:''
                    },
                    {
                        name:'APP名称',
                        placeholder:'请输入APP名称',
                        model:''
                    },
                    {
                        name:'统一社会信用代码',
                        placeholder:'请输入组织机构代码/统一社会信用代码',
                        model:''
                    },
                    {
                        name:'公司联系方式',
                        placeholder:'请输入公司联系方式',
                        model:''
                    },
                    {
                        name:'公司邮箱',
                        placeholder:'请输入公司邮箱',
                        model:''
                    },
                    {
                        name:'公司地址',
                        placeholder:'请输入公司地址',
                        model:''
                    }
                ],
                contacts:[
                    {
                        name:'姓名',
                        model:''
                    },
                    {
                        name:'手机号',
                        model:''
                    },
                    {
                        name:'邮箱',
                        model:''
                    },
                    {
                        name:'身份证号',
                        model:''
                    },
                    {
                        name:'微信／QQ号',
                        model:''
                    }
                ]
            }
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
