<template>
    <div class="home">
        <div class="information"></div>
        <div class="content">
            <div class="table">
                <ul flex >
                    <li v-for="(item,index) in tableList" flex-box="1" :key="index" :class="{active:tab==index}" @click.stop="tab = index">
                        <div class="table-data">{{item.data}}</div>
                        <div class="table-text">{{item.text}}</div>
                        <div class="table-rate" :class="{red:true}">{{item.rate}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    import '../less/home.less';
    export default {
        name: 'home',
        data(){
            return {
                tab:0,
                tableList:[
                    {
                        data:'364',
                        text:'注册量',
                        rate:'+4'
                    },
                    {
                        data:'2.5%',
                        text:'次日存留',
                        rate:'-0.8%'
                    },
                    {
                        data:'8',
                        text:'下单笔数（今）',
                        rate:'+4'
                    },
                    {
                        data:'8000',
                        text:'募集总金额（今）',
                        rate:'+400'
                    },
                    {
                        data:'8',
                        text:'产品到期笔数（今）',
                        rate:'+5'
                    }
                ]
            }
        },
        components:{
            
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
