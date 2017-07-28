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
                        <div class="table-data">{{item.data}}</div>
                        <div class="table-rate red" :class="{green:item.rate.substring(0,1)=='-'}">{{item.rate}}</div>
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
    import {timeDeal} from '../tools/fun.js';
    Vue.use(VueHighcharts);
    export default {
        name: 'home',
        data(){
            return {
                tab:0,
                tableList:[
                    {
                        data:'364',
                        text:'总注册量',
                        rate:'+4'
                    },
                    {
                        data:'2.5%',
                        text:'次日留存',
                        rate:'-0.8%'
                    },
                    {
                        data:'8',
                        text:'下单笔数<i>（今）</i>',
                        rate:'-4'
                    },
                    {
                        data:'8000',
                        text:'募集总额<i>（今）</i>',
                        rate:'+400'
                    },
                    {
                        data:'8',
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
            timeDeal()
        },
        computed: {},
        methods: {
            change(index){
                this.tab = index;
                //this.options.series[0].data[4] = this.options.series[0].data[4]+index;
                let chart = this.$refs.highcharts.chart;
                //console.log(chart)
                chart.series[0].setData([10,12,11,23,33]);
                //console.log(this.options.series[0].data[4])
            },
            inforLink(){
                this.$router.push('/information')
            }
        },
        destroyed(){

        }
    }
</script>
