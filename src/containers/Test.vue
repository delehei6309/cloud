<template>
    <div class="test">
        <div>{{options.title.text}}</div>
        <highcharts :options="options" ref="highcharts"></highcharts>
        <button @click="updateCredits">update credits</button>
    </div>
</template>
<script>
    import '../less/submit-state.less';
    import VueHighcharts from 'vue-highcharts';
    import Vue from 'vue';
    Vue.use(VueHighcharts);
    export default {
        name: 'test',
        data(){
            return {
                options:{
                  title: {
        text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: "red"
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: "green"
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
            style: {
                color: "yellow"
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: "#f0ee03"
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor: '#FFFFFF'
    },
    series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
            valueSuffix: '°C'
        }
    }]
                }
            }
        },
        //component:{VueHighcharts},
        created(){
        },
        computed: {},
        methods: {
            updateCredits: function() {
                var chart = this.$refs.highcharts.chart;
                console.log(this.$refs.highcharts)
                chart.credits.update({
                    style: {
                        color: '#' + (Math.random() * 0xffffff | 0).toString(16)
                    }
                });
            }
        },
        destroyed(){

        }
    }
</script>
