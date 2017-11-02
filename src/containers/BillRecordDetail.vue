<template>
    <div class="user-infor bill-record-detail" flex="dir:top">
        <div flex-box="0">
            <!--页面抬头-->
            <div class="title">账单详情</div>
            <!--查询条件-->
            <div class="inquire">
                <div flex="main:justify">
                    <div>
                        <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
                        <b-form-input type="text" :readonly="!selectedBase" v-model="inputVal" placeholder="请输入信息"></b-form-input>
                    </div>
                    <div class="input-wrap" flex>
                        <div class="date-text">
                            <b-form-select v-model="selectedTime" :options="optionsTime" size="sm"></b-form-select>
                        </div>
                        <div class="input-date"><datepicker language="ch" v-model="payidTimeFrom"></datepicker></div>
                        <div class="date-text">到</div>
                        <div class="input-date"><datepicker language="ch" v-model="payidTimeTo"></datepicker></div>
                    </div>
                    <div>
                        <b-btn class="btn" @click.native="search">查询</b-btn>
                        <b-btn class="btn" >导出excel</b-btn>
                    </div>
                </div>
            </div>
        </div>
        <div flex-box="1" flex="dir:top">
            <!--显示列表-->
            <div class="table-wrap" flex-box="1">
                <b-table :items="items" :fields="fields"  bordered>
                    <template slot="createTime" scope="item">{{item.value | timeFormat}}</template>
                    <template slot="orderAmount" scope="item">{{item.value | currencyFormat}}</template>
                    <template slot="expectedProfitAmount" scope="item">{{item.value | currencyFormat}}</template>
                    <template slot="payedTime" scope="item">{{item.value | timeFormat}}</template>
                    <template slot="channelChargeRate" scope="item">{{item.value | translatePate}}</template>
                    <template slot="settleStatus" scope="item">
                        <template v-if="item.value == 1">未结算</template>
                        <template v-if="item.value == 2">结算请求中</template>
                        <template v-if="item.value == 3">已结算</template>
                    </template>
                </b-table>
            </div>

            <!--分页-->
            <div class="justify-content-center paging" flex-box="0" flex="main:center">
                <div>
                    <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count" :per-page='pageSize' v-model="pageNo" @click.native="change()"></b-pagination>
                    <div class="total"><span>共{{ Math.ceil(count / pageSize) }}页</span><span>共{{ count }}条</span></div>
                </div>
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
                channelCommisionSummaryId:this.$route.query.channelCommisionSummaryId,
                count:0,
                payidTimeFrom:'',
                payidTimeTo:'',
                selectedBase: 1,
                selectedTime: 1,
                inputVal: '',
                optionsBase: [
                    {
                        text: '产品名称',
                        value: 1
                    },{
                        text: '产品订单号',
                        value: 2
                    }
                ],
                optionsTime:[
                    {
                        value:1,
                        text:'订单创建时间'
                    }/*,{
                        value:2,
                        text:'订单支付时间'
                    }*/
                ],
                items: [],
                fields: {
                    createTime: { label: '订单创建时间' },
                    tradeOrderBillCode: { label: '定期订单号' },
                    userName: { label: '用户姓名' },
                    productAbbrName: { label: '产品名称' },
                    userPhone: { label: '用户名' },
                    orderAmount: { label: '投资金额(元)' },
                    expectedProfitAmount: { label: '预期到期收益(元)' },
                    payedTime: { label: '订单支付时间' },
                    channelChargeRate: { label: '渠道对应佣金年化比例' },
                    commisionAmount: { label: '返佣金额(元)' },
                    settleStatus: { label: '结佣状态' },
                },
                pageNo: 1,
                pageSize:10,
            }
        },
        components: { datepicker },
        created(){
            this.get();
        },
        computed: {
            orderBillCode:function(){
                if(this.selectedBase == 1){
                    return this.inputVal;
                }
                return null
            },
            productAbbrName:function(){
                if(this.selectedBase == 2){
                    return this.inputVal;
                }
                return null
            },
            startRow:function(){
                let startRow = (this.pageSize)*(this.pageNo-1);
                return startRow;
            }
        },
        methods: {
            change(){
                setTimeout(()=>{
                    this.get();
                })
            },
            search(){
                this.pageNo = 1;
                this.get();
            },
            get(){
                let {channelCommisionSummaryId,payidTimeFrom,payidTimeTo,orderBillCode,productAbbrName,pageSize,startRow} = this;
                $api.get('/billingStatistics/settlementRecDetail',{
                    channelCommisionSummaryId,payidTimeFrom,payidTimeTo,orderBillCode,productAbbrName,pageSize,startRow
                }).then(msg => {
                    if(msg.code == 200){
                        this.items = msg.data.list
                        this.count = msg.data.count
                    }else{
                        Toast(msg.msg);
                    }
                });
            }
        },
        destroyed(){}
    }
</script>
