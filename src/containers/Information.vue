<template>
    <div class="home-information" flex="dir:top">
        <div class="information-title common-title" flex-box="0">系统消息</div>
        <div class="information-content" flex-box="1" flex="dir:top">
            <ul class="infor-cont-list" flex-box="1">
                <li v-for="(item,index) in lists" :key="index" :class="{'active':active == index}">
                    <div class="infor-list-title" flex="main:justify" @click="item.fold = !item.fold">
                        <div>2017年6月10日数据显示异常公告</div>
                        <div>「2017-06-06 16:29」</div>
                    </div>
                    <div class="infor-list-page animate" :class="{'show':!item.fold}">
                        众安收银台是由众安保险开放平台开发，颠覆传统线下保险收费模式和线上保险代理收费模式，引领保险收费新时代的来临，使线上的PC端，微信端，APP端有机会尝试新的保险收费方式。收银台是由众安保险开放平台开发，颠覆传统线下保险收费模式和线上保险代理收费模式，引领保险收费新时代的来临，使线上的PC端，微信端。
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../less/information.less';
    export default {
        name: 'home-information',
        data(){
            return {
                active:null,
                lists:[
                    {
                        fold:1,
                    },{
                        fold:1,
                    },{
                        fold:1,
                    },{
                        fold:1
                    },{
                        fold:1
                    }
                ]
            }
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
