<template>
    <div class="data-statistics">
        <div class="statistics-tab">
            <div class="statistics-tab-btn" flex="box:mean">
                <button v-for="(item,index) in list" :key="index"
                    :class="{'active':tab == index}"
                    @click.stop="change(index)">{{item.text}}</button>
            </div>
        </div>
        <div class="statistics-charts">
            <div>
                <highcharts :options="options" ref="highcharts"></highcharts>
            </div>
        </div>
        <div class="statistics-table">
            <div class="table-head clear-both">
                <div class="tab-out">
                    <download-excel class="btn btn-default"
                        :fields="excel.title"
                        :data="items"
                        :name="excel.fileName">导出Excel</download-excel>
                </div>
                <div class="tab-search" flex>
                    <div class="date-text">创建时间：</div>
                    <div class="input-date"><datepicker language="ch" v-model="dateStart" ></datepicker></div>
                    <div class="date-text">到</div>
                    <div class="input-date"><datepicker language="ch" v-model="dateEnd"></datepicker></div>
                    <div>
                        <button @click.stop="search">查询</button>
                    </div>
                </div>
            </div>
            <div class="statistics-tabox">
                <div class="tabox-tbody">
                    <b-table :items="items" :fields="fields" bordered @sort-changed="sortingChanged" @sort-compare="sortCompare">
                        <!-- <template slot="userVerifyStatus" scope="item">{{ item.value == 9 ? '是' : '否' }}</template>
                        <template slot="userUuid" scope="item">
                            <router-link :to="{path: 'user-infor-detail',query:{userUuid:item.value}}">详情</router-link>
                        </template> -->
                    </b-table>
                </div>
                <div class="justify-content-center paging" flex-box="0" flex="main:center">
                    <div flex>
                        <div>
                            <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count" :per-page='pageSize' v-model="pageNo" @change="changePage"></b-pagination>
                        </div>
                        <div class="total"><span>共{{ Math.ceil(count / pageSize) }}页</span><span>共{{ count }}条</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/data-statistics.less';
    import Vue from 'vue';
    import VueHighcharts from 'vue-highcharts';
    import datepicker from 'vue-date';
    import $api from '../tools/api';
    import JsonExcel from 'vue-json-excel';
    Vue.component('downloadExcel', JsonExcel);
    export default {
        name: 'data-statistics',
        data(){
            return {
                sortBy:'registerCount',
                count:100,
                pageNo:1,
                pageSize:10,
                dateStart:null,
                dateEnd:null,
                sortStyle:'',//排序：desc 降序，asc升序
                tab:0,
                merchantNum:'00000',//商户号
                list:[
                    {   
                        id:0,
                        "text":'注册量',
                        array:[]
                    },
                    {
                        id:1,
                        "text":'活跃用户',
                        array:[]
                    },
                    {
                        id:2,
                        "text":'启动次数',
                        array:[]
                    },
                    {
                        id:3,
                        "text":'实名认证数',
                        array:[]
                    },
                    {
                        id:4,
                        "text":'投资转化量',
                        array:[]
                    },
                    {
                        id:5,
                        "text":'订单笔数',
                        array:[]
                    },
                    {
                        id:6,
                        "text":'募集金额',
                        array:[]
                    },
                    {
                        id:7,
                        "text":'产品到期用户数',
                        array:[]
                    }
                ],
                options:{
                    title: {
                        text: '',
                        x: -20 //center
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    xAxis: {
                        //minPadding:0.02,
                        categories: []
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '',
                        crosshairs: true,
                        shared: true
                    },
                    credits: {
                        enabled: false//去掉地址
                    },
                    legend: {
                        borderWidth: 0
                    },
                    series: [
                        {
                            name: '新增用户',
                            data: [],
                            color:'#4990E2',
                            lineWidth:1
                        }
                    ]
                },
                fields: {
                    days: { label: '日期' },
                    registerCount:{label:'注册量',sortable:true,},
                    //activeUserCout:{label:'活跃用户'},
                    startCount: { label: '启动次数' },
                    openAccountCount: { label: '实名认证数' },
                    conPercent: { label: '投资转化量' },
                    //cout2: { label: '次日留存率' },
                    orderCount: { label: '订单笔数' },
                    sumPaidAmount: { label: '募集金额' },
                    expUserQuantity: { label: '产品到期用户数' }
                },
                excel:{
                    fileName:'表格.xls',
                    title:{
                        '日期':  'String',
                        '注册量':'String',
                        //'活跃用户':'String',
                        '启动次数':  'String',
                        '实名认证数':  'String',
                        '投资转化量':  'String',
                        //'次日留存率':  'String',
                        '订单笔数':'String',
                        '募集金额':'String',
                        '产品到期用户数': 'String'
                    }
                },
                items:[],
                filter:null
            }
        },
        created(){
            this.getRegisterCount();
            this.getTable();
        },
        components: { datepicker },
        computed: {},
        methods: {
            sortCompare(){
                console.log(666)
            },
            sortingChanged(ctx){
                console.log(ctx)
                return false;
            },
            changePage(){
                console.log(this)
            },
            change(index){
                if(index == this.tab){
                    return false;
                }
                this.tab = index;
                this.options.xAxis.categories = [];
                this.options.series[0].data = [];
                switch(index){
                    case 0:
                        this.getRegisterCount();
                    break;
                    case 3:
                        this.getTotalCount();
                    break;
                    case 4:
                        this.getConPercent();
                    break;
                    case 5:
                        this.getOrderCount();
                    break;
                    case 6:
                        this.getSumPaidAmount();
                    break;
                    case 7:
                        this.getUserCount();
                    break;
                }
            },
            search(){
                this.getTable();
            },
            getTable(){
                $api.get('/count/statisticsReport',{
                    merchantNum:this.merchantNum,
                    statisticsReportDateFrom:this.dateStart,
                    statisticsReportDateTo:this.dateEnd,
                    pageSize:this.pageSize,
                    pageNo:this.pageNo,
                    sortStyle:this.sortStyle,
                    orderBy:this.orderBy

                }).then(msg=>{
                    if(msg.code == 200){
                        console.log('ok');
                        this.items = msg.data;
                    }
                });
            },
            //总注册量
            getRegisterCount(){
                $api.get('/count/countRegisterUserByMonth',{merchantNum:this.merchantNum}).then(msg=>{
                    if(msg.code == 200){
                        this.list[0].array = msg.data;
                        this.list[0].array.forEach(({days,registerCount},index) =>{
                            this.arrayPush(days,registerCount,index);
                        });
                        this.options.series[0].name = '新增用户';
                    }
                });
            },
            //开户量
            getTotalCount(){
                $api.get('/count/countOpenAccountUserByMonth',{merchantNum:this.merchantNum}).then(msg=>{
                    if(msg.code == 200){
                        this.list[3].array = msg.data;
                        this.list[3].array.forEach(({days,totalCount},index) =>{
                            this.arrayPush(days,totalCount,index);
                        });
                        this.options.series[0].name = '开户量';
                    }
                });
            },
            //投资转化量
            getConPercent(){
                $api.get('/count/conPercentByMonth',{merchantNum:this.merchantNum}).then(msg=>{
                    if(msg.code == 200){
                        this.list[4].array = msg.data;
                        this.list[4].array.forEach(({days,conPercent},index) =>{
                            this.arrayPush(days,conPercent,index);
                        });
                        this.options.series[0].name = '投资转化量';
                    }
                });
            },
            //订单笔数
            getOrderCount(){
                $api.get('/count/countOrderNumberByMonths',{merchantNum:this.merchantNum}).then(msg=>{
                    if(msg.code == 200){
                        this.list[5].array = msg.data;
                        this.list[5].array.forEach(({days,orderCount},index) =>{
                            this.arrayPush(days,orderCount,index);
                        });
                        this.options.series[0].name = '下单用户数';
                    }
                });
            },
            //募集金额
            getSumPaidAmount(){
                $api.get('/count/countPaidAmountByMonths',{merchantNum:this.merchantNum}).then(msg=>{
                    if(msg.code == 200){
                        this.list[6].array = msg.data;
                        this.list[6].array.forEach(({days,sumPaidAmount},index) =>{
                            this.arrayPush(days,sumPaidAmount,index);
                        });
                        this.options.series[0].name = '募集金额';
                    }
                });
            },
            //产品到期用户数
            getUserCount(){
                $api.get('/count/countProductExpiringUserByMonth',{merchantNum:this.merchantNum}).then(msg=>{
                    if(msg.code == 200){
                        this.list[7].array = msg.data;
                        this.list[7].array.forEach(({days,userCount},index) =>{
                            this.arrayPush(days,userCount,index);
                        });
                        this.options.series[0].name = '产品到期用户数';
                    }
                });
            },
            arrayPush(days,count,index){
                days = days.substr(5,5);
                //console.log(days)
                let x = '';
                index%4 == 0 ? x = days : '';
                this.options.xAxis.categories.push(x);
                this.options.series[0].data.push(Number(count));
                //console.log(count)
            }
        },
        destroyed(){

        }
    }
</script>
