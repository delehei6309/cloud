<template>
    <div class="home">
        <!-- <div class="information" flex="dir:right">
            <div class="infor-div" @click.stop="">
                <span class="infor-inner">信息</span>
                <span class="infor-count">2</span>
            </div>
        </div> -->
        <div class="content">
            <div class="table">
                <ul flex="box:mean" >
                    <li v-for="(item,index) in lists" :key="index" :class="{active:tab==index}" @click.stop="change(index)">
                        <div class="table-text" v-html="listText[index]"></div>
                        <div class="table-data">{{item.today}}</div>
                        <div
                            v-if="item.name !='countRegisterUser'"
                            class="table-rate red"
                            :class="{green:item.today<item.yesterday}">
                                <template v-if="item.today>=item.yesterday">+{{item.today-item.yesterday}}</template>
                                <template v-else>{{item.today-item.yesterday}}</template>
                            </div>
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
                merchantNum:this.$route.query.merchantNum,
                tab:0,
                lists:null,
                listText:['总注册量','下单笔数<i>（今）</i>','募集总额<i>（今）</i>','到期笔数<i>（今）</i>'],
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
                        categories: ['00', '01', '02', '03', '04', '05','06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
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
                        shared: true,
                        useHTML: true,
                        formatter: function () {
                            var x = Number( this.x)+'-'+(Number(this.x)+1),
                                y1 = this.y,
                                y2 = null;
                            if(this.points.length>1){
                                y2 = this.points[1].y;
                                var table = '时间：<b>' + x +'</b></br>'
                                            +this.points[0].series.name+'：<b>' + y1 + '</b></br>'
                                            +this.points[1].series.name+'：<b>' + y2 + '</b>';
                            }else{
                                table = '<b>时间：' + x +'</b></br>'
                                    +this.points[0].series.name+'：<b>' + y1 + '</b></br>';
                            }
                            return table;
                        }
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
                            data: [],
                            color:'#4990E2',
                            lineWidth:1,
                            mySign:'today'
                        },
                        {
                            name: '昨日',
                            data: [],
                            color:'#D08166',
                            lineWidth:1,
                            mySign:'yesterday'
                        }
                    ]
                }
            }
        },
        components:{

        },
        created(){
            timeDeal();
            $api.get('/count/indexCount',{merchantNum:this.merchantNum}).then(msg=>{
                console.log('msg---->',msg)
                if(msg.code == 200){
                    this.lists = msg.data;
                    this.setOption(this.tab);
                }
            });
        },
        computed: {},
        methods: {
            change(index){
                this.tab = index;
                this.setOption(index);
            },
            inforLink(){
                this.$router.push('/information');
            },
            setOption(tab){
                let todayList = this.lists[tab].todayList;
                let yesterdayList = this.lists[tab].yesterdayList;
                //this.supplement(yesterdayList);
                this.options.series[0].data = this.supplement('today',todayList);
                this.options.series[1].data = this.supplement('yesterday',yesterdayList);
            },
            supplement(day,arr){
                let setNormal = (str) =>{
                    let _str = (''+str).substr(0,1);
                    _str == '0' ? str = (''+str).substr(1,1) : '';
                    return str;
                }
                let thatArr = [];
                for(let i=0;i<24;i++){
                    if(day == 'yesterday'){
                        thatArr.push(0);
                    }else{
                        let hours = new Date().getHours();
                        if(i<=hours){
                            thatArr.push(0);
                        }else{
                            thatArr.push('');
                        }
                    }

                }
                arr.forEach(({hours,totalCount}) =>{
                    thatArr[setNormal(hours)] = totalCount;
                });
                return thatArr;
            }
        },
        destroyed(){

        }
    }
</script>
