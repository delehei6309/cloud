<template>
    <div>
        <cloud-header></cloud-header>
        <div class="menu-warp" flex>
            <div class="menus" flex-box="0">
            <div class="menus-list" v-for="(item,index) in menus" :key="index">
                <div v-if="item.child.length>0">
                    <div class="menus-div menus-parent" @click.stop="item.show = !item.show" :class="{'div-active':divActiveIndex == index}">{{item.text}}</div>
                    <ul class="menus-ul animate" :style="{'height':item.show?item.child.length*32 + 'px' : 0}">
                        <li v-for="(lis,i) in item.child" :key="i">
                            <router-link class="menu" :to="{path:lis.path}"
                             active-class="menu-active"
                             replace >{{lis.text}}</router-link>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <div class="menus-item">
                        <router-link class="menu" :to="{path:item.path}"
                             active-class="menu-active"
                             replace >{{item.text}}</router-link>
                    </div>
                </div>
            </div>
        </div>

            <router-view flex-box="1" class="content-view"></router-view>
        </div>
        <cloud-footer></cloud-footer>

    </div>

</template>

<script>
    import CloudHeader from '../components/CloudHeader';
    import CloudFooter from '../components/CloudFooter';
    import '../less/menus.less';
    export default {
        name: 'menus',
        data(){
            return {
                animateHeight:false,
                menus:[
                    {
                        path:'/menus/authentication',
                        text:'资质认证',
                        show:false,
                        child:[]
                    },
                    {
                        path:'',
                        text:'用户管理',
                        show:false,
                        child:[
                            {
                                path:'/menus/user-management',
                                text:'用户管理'
                            },
                            {
                                path:'/menus/user-infor',
                                text:'用户信息'
                            }
                        ]
                    },
                    {
                        path:'',
                        text:'用户管理',
                        show:false,
                        child:[
                            {
                                path:'/menus/product-management',
                                text:'产品管理'
                            }
                        ]
                    }
                ]
            }
        },
        components:{
            CloudHeader,
            CloudFooter
        },
        computed:{
            route:function(){
                return this.$route.path;
            },
            divActiveIndex:function(){
                let index ;
                this.menus.forEach((item,i)=>{
                    item.child.forEach((m,n)=>{
                        if(m.path == this.route){
                            index = i;
                        }
                    })
                })
                return index;
            }
        },
        methods:{
        },
        created(){

        }
    }
</script>
