<template>
    <div class="home">
        <div class="information" flex="dir:right">
            <div class="infor-div" @click.stop="inforLink">
                <span class="infor-inner">信息</span>
                <span class="infor-count">2</span>
            </div>
        </div>
        <div class="content">
            <div class="table">
                <ul flex="box:mean" >
                    <li v-for="(item,index) in tableList" :key="index" :class="{active:tab==index}" @click.stop="change(index)">
                        <div class="table-text" v-html="item.text"></div>
                        <div class="table-data">{{item.today}}</div>
                        <div v-if="index==1" class="table-rate red" :class="{green:item.today>=item.yesterday}">{{(item.today-item.yesterday) | }}</div>
                    </li>
                </ul>
            </div>
            <div class="charts">
                <highcharts :options="options" ref="highcharts"></highcharts>
            </div>
        </div>
    </div>

</template>

<script>
    import '../less/home.less';
    import Vue from 'vue';
    import VueHighcharts from 'vue-highcharts';
    import $api from '../tools/api';
    import {timeDeal} from '../tools/fun.js';
    Vue.use(VueHighcharts);
    export default {
        name: 'home',
        data(){
            return {
                tab:0,
                tableList:[
                    {
                        today:364,
                        yesterday:534,
                        text:'总注册量',
                        rate:'+4'
                    },
                    {
                        today:0.35,
                        yesterday:0.16,
                        text:'次日留存',
                        rate:'-0.8%'
                    },
                    {
                        today:8,
                        yesterday:7,
                        text:'下单笔数<i>（今）</i>',
                        rate:'-4'
                    },
                    {
                        today:8000,
                        yesterday:12000,
                        text:'募集总额<i>（今）</i>',
                        rate:'+400'
                    },
                    {
                        today:24,
                        yesterday:30,
                        text:'到期笔数<i>（今）</i>',
                        rate:'+5'
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
                        categories: ['00', '03', '06', '09', '12', '15','18', '21']
                    },
                    yAxis: {
                        title: {
                            text: '注册数量（个）'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '个',
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
                            name: '今日',
                            data: [7.0, 6.9, 9.5, 14.5, 180],
                            color:'#4990E2',
                            lineWidth:1
                        },
                        {
                            name: '昨日',
                            data: [1, 8, 17, 23, 27, 32, 46, 54],
                            color:'#D0011B',
                            lineWidth:1
                        }
                    ]
                }
            }
        },
        components:{
            
        },
        created(){
            timeDeal();
            $api.get('/count/indexCount').then(msg=>{
                if(msg.code == 200){
                    let data = msg.data;
                    this.tableList[0].today = data.countRegisterUser.todayUserCount || 0;
                    this.tableList[0].yesterday = data.countRegisterUser.yesterdayUserCount || 0;
                    console.log(data.nextDayRemains)
                    this.tableList[1].today = data.nextDayRemains.todayRemains;
                    this.tableList[1].yesterday = data.nextDayRemains.yesRemains;

                    this.tableList[2].today = data.countOrderNumber.todayOrderCount || 0;
                    this.tableList[2].yesterday = data.countOrderNumber.yesterdayOrderCount || 0;

                    this.tableList[3].today = data.sumPaidAmountByHours.todayUserCount || 0;
                    this.tableList[3].yesterday = data.sumPaidAmountByHours.yesterdayUserCount || 0;

                    this.tableList[4].today = data.countExpiringDateNumber.todaySumPaidAmount || 0;
                    this.tableList[4].yesterday = data.countExpiringDateNumber.yesterdaySumPaidAmount || 0;
                    console.log(this.tableList)
                }
            });
        },
        computed: {},
        methods: {
            change(index){
                this.tab = index;
                let chart = this.$refs.highcharts.chart;
                chart.series[0].setData([10,12,11,23,33]);
            },
            inforLink(){
                this.$router.push('/information');
            }
        },
        destroyed(){

        }
    }
</script>
