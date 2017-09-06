<template>
    <div class="user-infor exchange-manage">
        <div flex="dir:top" class="user-infor-box">
            <div flex-box="0">
                <!--页面抬头-->
                <div class="title">定期订单管理</div>
                <!--查询条件-->
                <div class="inquire">
                    <div flex="main:justify">
                        <div>
                            <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
                            <b-form-input type="text" v-model="inputVal"></b-form-input>
                            <span>状态</span>
                            <b-form-select v-model="selectedProductStatus" :options="optionsProductStatus" size="sm"></b-form-select>
                        </div>
                        <div class="input-wrap" flex>
                            <div class="date-text">创建时间：</div>
                            <div class="input-date"><datepicker language="ch" v-model="dateStart"></datepicker></div>
                            <div class="date-text">到</div>
                            <div class="input-date"><datepicker language="ch" v-model="dateEnd"></datepicker></div>
                        </div>
                        <b-btn class="btn" @click.native="query">查询</b-btn>
                    </div>
                </div>
            </div>
            <div flex="dir:top" flex-box="1">
                <!--显示列表-->
                <div class="table-wrap" flex-box="1">
                    <b-table :items="items" :fields="fields" bordered >
                        <template slot="productPeriod" scope="item">
                            <template>{{item.value}}</template><template v-if="item.item.productPeriodType == 'D'">天</template><template v-if="item.item.productPeriodType == 'W'">周</template><template v-if="item.item.productPeriodType == 'M'">月</template><template v-if="item.item.productPeriodType == 'Y'">天</template>
                        </template>
                        <template slot="createTime" scope="item">
                            {{item.value | timeFormat}}
                        </template>
                        <template slot="payedTime" scope="item">
                            {{item.value | timeFormat}}
                        </template>
                        <template slot="productAnnualInterestRate" scope="item">
                            {{item.value | translatePate}}
                        </template>
                        <template slot="orderAmount" scope="item">
                            {{item.value | currencyFormat}}
                        </template>
                        <!-- <template slot="marketingAmount" scope="item">
                            {{item.value | currencyFormat}}
                        </template> -->
                        <template slot="paidAmount" scope="item">
                            {{item.value | currencyFormat}}
                        </template>
                        <template slot="expectedProfitAmount" scope="item">
                            {{item.value | currencyFormat}}
                        </template>
                        <template slot="transactionChannel" scope="item">
                            <template v-if="item.value == 1">app(IOS)</template>
                            <template v-if="item.value == 2">app(安卓)</template>
                            <template v-if="item.value == 3">微信</template>
                            <template v-if="item.value == 0">其他</template>
                        </template>
                        <template slot="organization" scope="item">
                            {{item.value || '--'}}
                        </template>
                        <template slot="orderStatus" scope="item">
                            <template v-if="item.value == 1">待支付</template>
                            <template v-if="item.value == 2">已支付</template>
                            <template v-if="item.value == 3">计息中</template>
                            <template v-if="item.value == 4">已到期</template>
                            <template v-if="item.value == 5">已到期兑付</template>
                            <template v-if="item.value == 9">已撤消</template>
                        </template>
                        <template slot="subcontractFilepath" scope="item">
                            <template v-if="(item.item.orderStatus == 3) || (item.item.orderStatus == 4) || (item.item.orderStatus == 5)"><a class="look-over" @click.stop="lookOver(item.value)">查看协议</a></template>
                        </template>
                    </b-table>
                </div>

                <!--分页-->
                <div class="justify-content-center paging" flex-box="0" flex="main:center">
                    <div>
                        <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count"  :per-page="perPage" v-model="currentPage" @change="change"></b-pagination>
                        <div class="total"><span>共{{ Math.ceil(count / perPage) }}页</span><span>共{{ count }}条</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="look-over-box" v-show="lookOverShow">
            <div class="look-over-shadow"></div>
            <div class="look-over-wrap" flex="dir:top">
                <span class="span-close" @click.stop="lookOverShow = false">×</span>
                <h6>查看协议</h6>
                <div class="content" flex="dir:top  box:mean" flex-box="1">
                    <div flex="dir:top main:center"><a :href="agreementSrc" target="_blank">《认购协议》</a></div>
                    <!-- <div flex="dir:top main:center"><a href="">《转让协议》</a></div> -->
                </div>
                <div class="box-bottom"><b-btn class="btn" @click.stop="lookOverShow = false">关闭</b-btn></div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less';
    import datepicker from 'vue-date';
    import Toast from '../components/Toast';
    import $api from '../tools/api';
    export default {
        name: 'user-infor',
        data(){
            return {
                count:0,
                lookOverShow:false,
                agreementSrc:'',
                dateStart:null,
                dateEnd:null,
                selectedBase: 1,
                selectedProductStatus: null,
                //selectedIsRecommend: 'all',
                //belongMerchantNum:this.$route.query.belongMerchantNum,
                inputVal: '',
                optionsBase: [
                    {
                        text: '产品名称',
                        value: 1
                    },{
                        text: '订单编号',
                        value: 2
                    }
                ],
                optionsProductStatus: [
                    {
                        text: '全部',
                        value: null,
                    },{
                        text: '待支付',
                        value: 1,
                    },{
                        text: '已支付',
                        value: 2,
                    },{
                        text: '计息中',
                        value: 3,
                    },{
                        text: '已到期',
                        value: 4,
                    },{
                        text: '已到期兑付',
                        value: 5,
                    },{
                        text: '已撤消',
                        value: 9,
                    }
                ],
                items: [],
                fields: {
                    orderBillCode: { label: '订单号' },
                    userPhone: { label: '用户名' },
                    productAbbrName: { label: '产品名称' },
                    productPeriod: { label: '投资期限' },
                    productAnnualInterestRate: { label: '加息前年化收益率' },
                    orderAmount: { label: '投资金额（元）' },
                    //marketingAmount: { label: '红包金额（元）' },
                    paidAmount: { label: '支付金额（元）' },
                    expectedProfitAmount: { label: '预计到期收益（元）' },
                    createTime: { label: '创建时间' },
                    payedTime: { label: '支付时间' },
                    transactionChannel: { label: '下单渠道' },
                    organization: { label: '所属机构' },
                    orderStatus: { label: '状态' },
                    subcontractFilepath: { label: '操作' },
                },
                currentPage: 1,
                perPage: 10,
                canClick:true,
                fileName:''
            }
        },
        components: { datepicker },
        created(){
            this.get();
        },
        computed: {
            orderBillCode:function(){
                if(this.selectedBase == 2){
                    return this.inputVal;
                }
                return null
            },
            productAbbrName:function(){
                if(this.selectedBase == 1){
                    return this.inputVal;
                }
                return null
            }
        },
        methods: {
            lookOver(fileName){
                if(!this.canClick){
                    return false;
                }
                this.canClick = false;
                $api.post('/trade/getAccessFileUrl',{
                    fileName:fileName
                }).then(msg => {
                    if(msg.code == 200){
                        this.canClick = true;
                        this.agreementSrc = msg.data;
                    }else{
                        Toast(msg.msg);
                        this.canClick = true;
                    }
                });
                this.lookOverShow = true;
            },
            change(){
                setTimeout(()=>{
                    this.get()
                })
            },
            query(){
                this.currentPage = 1;
                this.get()
            },
            get(){
                let parm = {
                    pageNo:this.currentPage,
                    pageSize:this.perPage,
                    orderStatus:this.selectedProductStatus,
                    orderBillCode:this.orderBillCode,
                    productAbbrName:this.productAbbrName,
                    transactionTimeFrom:this.dateStart,
                    transactionTimeTo:this.dateEnd
                }
                $api.get('/trade/order/list',parm).then(msg => {
                    if(msg.code == 200){
                        this.items = msg.data.list;
                        this.count = msg.data.count;
                    }else{
                        Toast(msg.msg);
                    }
                });
            }
        },
        destroyed(){}
    }
</script>
