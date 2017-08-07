<template>
    <div class="home">
        <div class="information" flex="dir:right">
            <div class="infor-div" @click.stop="">
                <span class="infor-inner">信息</span>
                <span class="infor-count">2</span>
            </div>
        </div>
        <div class="content">
            <div class="table">
                <ul flex="box:mean" >
                    <li v-for="(item,index) in lists" :key="index" :class="{active:tab==index}" @click.stop="change(index)">
                        <div class="table-text" v-html="listText[index]"></div>
                        <div class="table-data">{{item.today}}</div>
                        <div v-if="item.name !='countRegisterUser'" class="table-rate red" :class="{green:item.today<item.yesterday}">{{(item.today-item.yesterday)}}</div>
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
                merchantNum:'00000',
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
                            data: [],
                            color:'#4990E2',
                            lineWidth:1
                        },
                        {
                            name: '昨日',
                            data: [],
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
            $api.get('/count/indexCount',{merchantNum:this.merchantNum}).then(msg=>{
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
                this.supplement(yesterdayList);
                this.options.series[0].data = this.supplement(todayList);
                this.options.series[0].data = this.supplement(yesterdayList);
            },
            supplement(arr){
                let setNormal = (str) =>{
                    let _str = (''+str).substr(0,1);
                    _str == '0' ? str = (''+str).substr(1,1) : '';
                    return str;
                }
                let thatArr = [];
                for(let i=0;i<24;i++){
                    thatArr.push(0);
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
