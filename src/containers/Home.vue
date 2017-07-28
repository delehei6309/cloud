<template>
    <div class="home">
        <div class="information" flex="dir:right">
            <div class="infor-div">
                <span class="infor-inner">信息</span>
                <span class="infor-count">2</span>
            </div>
        </div>
        <div class="content">
            <div class="table">
                <ul flex="box:mean" >
                    <li v-for="(item,index) in tableList" :key="index" :class="{active:tab==index}" @click.stop="tab = index">
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
                        categories: ['00', '01', '02', '03', '04', '05','06', '07', '08', '09', '10', '11','12','13','14','15','16','17','18','19','20']
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
                        valueSuffix: ''
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: '今日',
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,20,15,12,13,14,10],
                        color:'#4990E2',
                    },
                    {
                        name: '昨日',
                        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5,30,25.2, 26.5, 23.3,21],
                        color:'#D0011B'
                    }]
                }
            }
        },
        components:{
            
        },
        created(){
            console.log(('-6%'.substring(0,1)))
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
