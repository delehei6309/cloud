<template>
    <div class="test">
        <line-chart 
          id="donut" 
          :data="donutData" 
          colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]' 
          resize="true">
        </line-chart>
    </div>
</template>
<script>
    import '../less/submit-state.less';
    import { LineChart } from 'vue-morris'
    export default {
        name: 'submit-state',
        data(){
            return {
                donutData: [
                  { label: 'Red', value: 300 },
                  { label: 'Blue', value: 50 },
                  { label: 'Yellow', value: 100 }
                ]
            }
        },
        component:{LineChart},
        created(){},
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
