<template>
    <div class="user-infor bill-record">
        <div flex="dir:top" class="user-infor-box">
            <div flex-box="0">
                <!--页面抬头-->
                <div class="title">渠道结算记录</div>
                <!--查询条件-->
                <div class="inquire">
                    <div flex="main:justify">
                        <div flex>
                            <div>
                                <b-form-select v-model="selectedYearFrom" :options="optionsYears" size="sm"></b-form-select>
                                <b-form-select v-model="selectedMonthFrom" :options="optionsMonths" size="sm"></b-form-select>
                            </div>
                            <div class="space">到</div>
                            <div>
                                <b-form-select v-model="selectedYearTo" :options="optionsYears" size="sm"></b-form-select>
                                <b-form-select v-model="selectedMonthTo" :options="optionsMonths" size="sm"></b-form-select>
                            </div>
                        </div>
                        <div>
                            <b-btn class="btn" @click.native="query">查询</b-btn>
                            <b-btn class="btn" @click.native="query">导出excel</b-btn>
                        </div>
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
                        <template slot="operation" scope="item">
                            <router-link :to="{path: 'bill-record-detail',query:{userUuid:item.value}}">详情</router-link>
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
                //selectedYearFrom: '2017',
                //selectedYearTo: '2017',
                /*selectedMonthFrom:1,
                selectedMonthTo:1,*/
                selectedProductStatus: null,
                //selectedIsRecommend: 'all',
                //belongMerchantNum:this.$route.query.belongMerchantNum,
                inputVal: '',
                optionsYears: [],
                optionsMonths: [
                    {
                        text: '1月',
                        value: 1,
                    },{
                        text: '2月',
                        value: 2,
                    },{
                        text: '3月',
                        value: 2,
                    },{
                        text: '4月',
                        value: 4,
                    },{
                        text: '5月',
                        value: 5,
                    },{
                        text: '6月',
                        value: 6,
                    },{
                        text: '7月',
                        value: 7,
                    },{
                        text: '8月',
                        value: 8,
                    },{
                        text: '9月',
                        value: 9,
                    },{
                        text: '10月',
                        value: 10,
                    },{
                        text: '11月',
                        value: 11,
                    },{
                        text: '12月',
                        value: 12,
                    }
                ],
                items: [],
                fields: {
                    orderBillCode: { label: '结算日期' },
                    userPhone: { label: '结算单号' },
                    productAbbrName: { label: '渠道商户号' },
                    productPeriod: { label: 'APP名称' },
                    productAnnualInterestRate: { label: '合计笔数' },
                    orderAmount: { label: '合计返佣总额' },
                    paidAmount: { label: '结算状态' },
                    operation: { label: '操作' },
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
            this.setTime();
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
            },
            setTime(){
                let date = new Date();
                let time1 = date.getFullYear();
                let time0 = 2015;
                let fun = (year0,year1)=>{
                    if(year0<=year1){
                        this.optionsYears.push({
                            text: year1+'年',
                            value: year1
                        });
                        year1 --;
                        fun(year0,year1);
                    }
                    return null;
                }
                fun(time0,time1);
                this.selectedYearFrom = this.optionsYears[this.optionsYears.length-1].value;
                this.selectedYearTo = this.optionsYears[0].value;
                this.selectedMonthFrom = this.optionsMonths[0].value;
                let month = date.getMonth()+1;
                console.log(month);
                this.selectedMonthTo = month;
            }
        },
        destroyed(){}
    }
</script>
