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
                            <b-btn class="btn" @click.native="search">查询</b-btn>
                            <b-btn class="btn" @click.native="query">导出excel</b-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div flex="dir:top" flex-box="1">
                <!--显示列表-->
                <div class="table-wrap" flex-box="1">
                    <b-table :items="items" :fields="fields" bordered >
                        <!-- <template slot="createTime" scope="item">
                            {{item.value | timeFormat}}
                        </template> -->
                        
                        <template slot="settleStatus" scope="item">
                            <template v-if="item.value == 1">待审核</template>
                            <template v-if="item.value == -2">已作废</template>
                            <template v-if="item.value == 2">已结算</template>
                        </template>
                        <template slot="operation" scope="item">
                            <router-link 
                                :to="{path: 'bill-record-detail',query:{channelCommisionSummaryId:item.item.channelCommisionSummaryId}}">详情</router-link>
                        </template>
                    </b-table>
                </div>

                <!--分页-->
                <div class="justify-content-center paging" flex-box="0" flex="main:center">
                    <div>
                        <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count"  :per-page="pageSize" v-model="pageNo" @change="change"></b-pagination>
                        <div class="total"><span>共{{ Math.ceil(count / pageSize) }}页</span><span>共{{ count }}条</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less';
    import Toast from '../components/Toast';
    import $api from '../tools/api';
    export default {
        name: 'bill-record',
        data(){
            return {
                count:0,
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
                        value: 3,
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
                selectedYearFrom:'',
                selectedMonthFrom:'',
                selectedYearTo:'',
                selectedMonthTo:'',
                items: [],
                fields: {
                    requestCycle: { label: '结算日期' },
                    channelCommisionSummaryId: { label: '结算单号' },
                    channelAppName: { label: '渠道商名称' },
                    validOrderCount: { label: '有效成交笔数' },
                    commisionAmount: { label: '合计返佣总额' },
                    settleStatus: { label: '结算状态' },
                    operation: { label: '操作' },
                },
                pageSize: 10,
                pageNo:1,
            }
        },
        components: { },
        created(){
            this.setTime();
            this.get();
        },
        computed: {
            startCycle:function(){
                let {selectedYearFrom,selectedMonthFrom} = this;
                selectedMonthFrom < 10 ? selectedMonthFrom = ('0' +selectedMonthFrom) : '';
                if(selectedYearFrom && selectedMonthFrom){
                    return (selectedYearFrom + '.' + selectedMonthFrom) ;
                }
                return null;
            },
            endCycle:function(){
                let {selectedYearTo,selectedMonthTo} = this;
                selectedMonthTo < 10 ? selectedMonthTo = ('0' +selectedMonthTo) : '';
                if(selectedYearTo && selectedMonthTo){
                    return (selectedYearTo + '.' + selectedMonthTo) ;
                }
                return null;
            },
            startRow:function(){
                let startRow = (this.pageSize)*(this.pageNo-1);
                return startRow;
            }
        },
        methods: {
            change(){
                setTimeout(()=>{
                    this.get()
                })
            },
            search(){
                this.pageNo = 1;
                this.get()
            },
            get(){
                let {startCycle,endCycle,startRow,pageSize} = this;
                $api.get('/billingStatistics/listByCycle',{
                    startCycle,
                    endCycle,
                    startRow,
                    pageSize
                }).then(msg => {
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
                let time0 = time1-2;
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
                this.selectedMonthTo = month;
            }
        },
        destroyed(){}
    }
</script>
