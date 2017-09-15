<template>
    <div class="data-statistics">
        <div class="statistics-tab">
            <div class="statistics-tab-btn" flex="box:mean">
                <button v-for="(item,index) in list" :key="index"
                    :class="{'active':tabName == item.name}"
                    @click.stop="change(index,item.name)"
                    v-if="item.name!='activeUser'">{{item.text}}</button>
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
                    <form id="searchForm" modelAttribute="merchantSearch" :action="serverUrlOut" method="get">
                        <input type="hidden" name="statisticsReportDateFrom" v-model="dateStartEx">
                        <input type="hidden" name="statisticsReportDateTo" v-model="dateEndEx">
                        <input type="hidden" name="sortStyle" v-model="sortStyle">
                        <input type="hidden" name="sortCloumn" v-model="sortCloumn">
                        <input  type="submit" value="导出Excel"/>
                    </form>
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
                                <th v-for="(item,index) in tabHead" :key="index">{{item.text}}</th>
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
                                <td>{{item.sumPaidAmount | currencyFormat}}</td>
                                <td>{{item.expUserQuantity}}</td>
                                <td>{{item.expirCount}}</td>
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
    import VueHighcharts from 'vue-highcharts';
    import datepicker from 'vue-date';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    export default {
        name: 'data-statistics',
        data(){
            return {
                serverUrlOut:'',
                count:0,
                pageNo:1,
                pageSize:10,
                dateStart:'',
                dateEnd:'',
                dateStartEx:'',
                dateEndEx:'',
                sortStyle:'',//排序：desc 降序，asc升序
                sortCloumn:'',
                tabName:'',
                list:{
                    registerCount:{   
                        id:0,
                        name:'countRegisterUserByMonth',
                        "text":'注册量',
                        array:[]
                    },
                    activeUser:{
                        id:1,
                        name:'activeUser',
                        "text":'活跃用户',
                        array:[]
                    },
                    startCount:{
                        id:2,
                        name:'startCountByMonth',
                        "text":'启动次数',
                        array:[]
                    },
                    totalCount:{
                        id:3,
                        name:'countOpenAccountUserByMonth',
                        "text":'实名认证数',
                        array:[]
                    },
                    conPercent:{
                        id:4,
                        name:'conPercentByMonth',
                        "text":'投资转化量',
                        array:[]
                    },
                    orderCount:{
                        id:5,
                        name:'countOrderNumberByMonths',
                        "text":'订单笔数',
                        array:[]
                    },
                    sumPaidAmount:{
                        id:6,
                        name:'countPaidAmountByMonths',
                        "text":'募集金额',
                        array:[]
                    },
                    userCount:{
                        id:7,
                        name:'countProductExpiringUserByMonth',
                        "text":'产品到期用户数',
                        array:[]
                    },
                    countExpiring:{
                        id:8,
                        name:'countExpiringNumberByMonths',
                        "text":'产品到期笔数',
                        array:[]
                    }
                },
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
                        value:'registerCount',
                        text:'注册量'
                    },
                    {
                        value:'startCount',
                        text:'启动次数',
                        sortStyle:true
                    },
                    {
                        value:'openAccountCount',
                        text:'实名认证数',
                        sortStyle:true
                    },
                    {
                        value:'conPercent',
                        text:'投资转化量',
                        sortStyle:true
                    },
                    {
                        value:'orderCount',
                        text:'订单笔数',
                        sortStyle:true
                    },
                    {
                        value:'sumPaidAmount',
                        text:'募集金额',
                        sortStyle:true
                    },
                    {
                        value:'expUserQuantity',
                        text:'产品到期用户数',
                        sortStyle:true
                    },
                    {
                        value:'expirCount',
                        text:'产品到期笔数',
                        sortStyle:true
                    }
                ],
                items:[],
                filter:null
            }
        },
        created(){
            this.serverUrlOut = $api.serverUrl+'/count/exportExcelReport';
            this.change('registerCount','countRegisterUserByMonth');
            this.getTable();
        },
        components: { datepicker },
        computed: {},
        methods: {
            //排序
            sortChange(sort,index,sortCloumn){
                this.tabHead.forEach((val,inx)=>{
                    if(val.sortStyle){
                        val.sortStyle = true;
                    }
                });
                sort == 'desc' ? this.tabHead[index].sortStyle = 'asc' : this.tabHead[index].sortStyle = 'desc';
                this.sortStyle = this.tabHead[index].sortStyle;
                this.sortCloumn = sortCloumn;
                this.pageNo = 1;
                this.getTable();
            },
            //分页切换
            changePage(){
                this.$nextTick(()=>{
                    this.getTable();
                });
            },
            //切换button
            change(key,name){
                if(name == this.tabName){
                    return false;
                }
                this.tabName = name;
                this.options.tooltip.valueSuffix = '';
                this.options.xAxis.categories = [];
                this.options.series[0].data = [];

                this.options.series[0].name = this.list[key].text;
                if(key == 'registerCount'){
                    this.options.series[0].name = '新增用户';
                }
                $api.get('/count/'+name).then(msg=>{
                    if(msg.code == 200){
                        this.list[key].array = msg.data;
                        this.list[key].array.forEach((obj,index) =>{
                            this.arrayPush(obj);
                        });
                    }else{
                        Toast(msg.msg);
                    }
                });
            },
            //查询
            search(){
                this.sortCloumn = '';
                this.sortStyle = '';
                this.dateStartEx = this.dateStart;
                this.dateEndEx = this.dateEnd;
                this.tabHead.forEach((val,inx)=>{
                    if(val.sortStyle){
                        val.sortStyle = true;
                    }
                });
                this.pageNo = 1;
                this.getTable();
            },
            arrayPush(obj){
                let days = obj.days;
                let x = days.substr(5,5);
                for(let key in obj){
                    if(key != 'days'){
                        //add '%'
                        if(key == 'conPercent'){
                            this.options.tooltip.valueSuffix = '%';
                        }
                        this.options.series[0].data.push(Number(obj[key]));
                    }
                }
                this.options.xAxis.categories.push(x);
            },
            getTable(){
                let sortCloumn = this.sortCloumn.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
                $api.get('/count/statisticsReport',{
                    statisticsReportDateFrom:this.dateStart || null,
                    statisticsReportDateTo:this.dateEnd || null,
                    pageSize:this.pageSize,
                    pageNo:this.pageNo,
                    //sortStyle:this.sortStyle,
                    //sortCloumn:sortCloumn

                }).then(msg=>{
                    if(msg.code == 200){
                        this.items = msg.data.returnList;
                        this.count = msg.data.count;
                    }else{
                        Toast(msg.msg);
                    }
                });
            },
            accMul(arg1,arg2){
                let m=0,s1=arg1.toString(),s2=arg2.toString();
                try{m+=s1.split(".")[1].length}catch(e){console.log()}
                try{m+=s2.split(".")[1].length}catch(e){console.log()}
                return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
            }
        },
        destroyed(){

        }
    }
</script>
