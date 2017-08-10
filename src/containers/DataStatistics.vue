<template>
    <div class="data-statistics">
        <div class="statistics-tab">
            <div class="statistics-tab-btn" flex="box:mean">
                <button v-for="(item,index) in list" :key="index"
                    :class="{'active':tab == index}"
                    @click.stop="change(index)"
                    v-if="index!=1">{{item.text}}</button>
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
                    <button @click.stop="outExcel">导出Excel</button>
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
                    <table class="table b-table table-bordered">
                        <thead>
                            <tr>
                                <th v-for="(item,index) in tabHead" :key="index"
                                    :class="{'sorting':item.sortable,'sorting_desc':item.sortable=='desc','sorting_asc':item.sortable=='asc'}"
                                    @click.stop="sortChange(item.sortable,index,item.value)"
                                    >{{item.text}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in items">
                                <td>{{item.days}}</td>
                                <td>{{item.registerCount}}</td>
                                <td>{{item.startCount}}</td>
                                <td>{{item.openAccountCount}}</td>
                                <td>{{item.conPercent}}</td>
                                <td>{{item.orderCount}}</td>
                                <td>{{item.sumPaidAmount}}</td>
                                <td>{{item.expUserQuantity}}</td>
                            </tr>
                        </tbody>
                    </table>
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
                count:0,
                pageNo:1,
                pageSize:10,
                dateStart:'',
                dateEnd:'',
                sortStyle:'asc',//排序：desc 降序，asc升序
                orderBy:'',
                tab:0,
                merchantNum:this.$route.query.merchantNum,//商户号
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
                tabHead:[
                    {
                        value:'days',
                        text:'日期'
                    },
                    {
                        value:'days',
                        text:'注册量'
                    },
                    {
                        value:'startCount',
                        text:'启动次数',
                        sortable:true
                    },
                    {
                        value:'openAccountCount',
                        text:'实名认证数',
                        sortable:true
                    },
                    {
                        value:'conPercent',
                        text:'投资转化量',
                        sortable:true
                    },
                    {
                        value:'orderCount',
                        text:'订单笔数',
                        sortable:true
                    },
                    {
                        value:'sumPaidAmount',
                        text:'募集金额',
                        sortable:true
                    },
                    {
                        value:'expUserQuantity',
                        text:'产品到期用户数',
                        sortable:true
                    }
                ],
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
            //导出excell
            outExcel(){
                console.log(666)
            },
            sortChange(sort,index,orderBy){
                sort == 'desc' ? this.tabHead[index].sortable = 'asc' : this.tabHead[index].sortable = 'desc';
                this.sortStyle = this.tabHead[index].sortable;
                this.orderBy = orderBy;
                this.getTable();
            },
            changePage(){
                this.$nextTick(()=>{
                    this.getTable();
                });
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
                    case 2:
                        this.getStartCount();
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
                this.orderBy = '';
                this.sortStyle = '';
                this.pageNo = 1;
                this.getTable();
            },
            getTable(){
                let orderBy = this.orderBy.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
                console.log(orderBy);
                $api.get('/count/statisticsReport',{
                    merchantNum:this.merchantNum,
                    statisticsReportDateFrom:this.dateStart || null,
                    statisticsReportDateTo:this.dateEnd || null,
                    pageSize:this.pageSize,
                    pageNo:this.pageNo,
                    sortStyle:this.sortStyle,
                    orderBy:orderBy

                }).then(msg=>{
                    if(msg.code == 200){
                        this.items = msg.data.returnList;
                        this.count = msg.data.count;
                    }
                });
            },
            //总注册量
            getRegisterCount(){
                $api.get('/count/countRegisterUserByMonth').then(msg=>{
                    if(msg.code == 200){
                        this.list[0].array = msg.data;
                        this.list[0].array.forEach(({days,registerCount},index) =>{
                            this.arrayPush(days,registerCount,index);
                        });
                        this.options.series[0].name = '新增用户';
                    }
                });
            },
            //启动次数
            getStartCount(){
                $api.get('/count/startCountByMonth').then(msg=>{
                    if(msg.code == 200){
                        this.list[2].array = msg.data;
                        this.list[2].array.forEach(({days,startCount},index) =>{
                            this.arrayPush(days,startCount,index);
                        });
                        this.options.series[0].name = '启动次数';
                    }
                });
            },
            //实名认证数
            getTotalCount(){
                $api.get('/count/countOpenAccountUserByMonth').then(msg=>{
                    if(msg.code == 200){
                        this.list[3].array = msg.data;
                        this.list[3].array.forEach(({days,totalCount},index) =>{
                            this.arrayPush(days,totalCount,index);
                        });
                        this.options.series[0].name = '实名认证数';
                    }
                });
            },
            //投资转化量
            getConPercent(){
                $api.get('/count/conPercentByMonth').then(msg=>{
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
                $api.get('/count/countOrderNumberByMonths').then(msg=>{
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
                $api.get('/count/countPaidAmountByMonths').then(msg=>{
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
                let x = days;
                //index%4 == 0 ? x = days : '';
                this.options.xAxis.categories.push(x);
                this.options.series[0].data.push(Number(count));
                //console.log(count)
            }
        },
        destroyed(){

        }
    }
</script>
