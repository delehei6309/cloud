<template>
    <div class="data-statistics">
        <div class="statistics-tab">
            <div class="statistics-tab-btn" flex="box:mean">
                <button v-for="(item,index) in list" :key="index"
                    :class="{'active':tab == index}"
                    @click.stop="tab=index">{{item.text}}</button>
            </div>
        </div>
        <div class="statistics-charts">
            <div>
                <highcharts :options="options" ref="highcharts"></highcharts>
            </div>
        </div>
        <div class="statistics-table">
            <div class="table-head">
                <div class="tab-out">
                    <button>导出Excel</button>
                </div>
                <div class="tab-search" flex>
                    <div class="date-text">创建时间：</div>
                    <div class="input-date"><datepicker language="ch" v-model="dateStart"></datepicker></div>
                    <div class="date-text">到</div>
                    <div class="input-date"><datepicker language="ch" v-model="dateEnd"></datepicker></div>
                </div>
            </div>
            <div class="statistics-tabox">
                <div class="tabox-tbody">
                    <!-- <b-table :items="items" :fields="fields"  bordered>
                        <template slot="userVerifyStatus" scope="item">{{ item.value == 9 ? '是' : '否' }}</template>
                        <template slot="userUuid" scope="item">
                            <router-link :to="{path: 'user-infor-detail',query:{userUuid:item.value}}">详情</router-link>
                        </template>
                    </b-table> -->
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
    export default {
        name: 'data-statistics',
        data(){
            return {
                dateStart:null,
                dateEnd:null,
                tab:0,
                list:[
                    {
                        "text":'注册量'
                    },
                    {
                        "text":'活跃用户'
                    },
                    {
                        "text":'启动次数'
                    },
                    {
                        "text":'开户量'
                    },
                    {
                        "text":'投资转化量'
                    },
                    {
                        "text":'投资笔数'
                    },
                    {
                        "text":'募集金额'
                    },
                    {
                        "text":'次日留存率'
                    },
                    {
                        "text":'最高在线人数'
                    },
                    {
                        "text":'到期单数'
                    },
                    {
                        "text":'到期用户数'
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
        created(){
        },
        components: { datepicker },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
