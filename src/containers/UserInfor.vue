<template>
    <div class="user-infor" flex="dir:top">
        <div class="user-detail-head" flex-box="0">
            <!--页面抬头-->
            <div class="title">用户信息</div>

            <!--查询条件-->
            <div class="inquire">
                <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
                <b-form-input type="text" size="sm" v-model="inputVal"></b-form-input>
                <span>开户进度</span>
                <b-form-select v-model="progressSelected" :options="progressOptions" size="sm"></b-form-select>
                <b-btn class="btn" @click.native="query">查询</b-btn>
            </div>
        </div>
        <div class="user-detail-box" flex-box="1" flex="dir:top">
            <!--显示列表-->
            <div class="table-wrap" flex-box="1">
                <b-table :items="items" :fields="fields"  bordered>
                    <template slot="userVerifyStatus" scope="item">
                        <template v-if="item.value == 0">已注册</template>
                        <template v-if="item.value == 1">已实名</template>
                        <template v-if="item.value == 2">已授权</template>
                        <template v-if="item.value == 3">已绑卡</template>
                        <template v-if="item.value == 4">已充值</template>
                        <template v-if="item.value == 5">已投资</template>
                    </template>
                    <template slot="investorRiskScore" scope="item">{{ item.value == 0 ? '未测评' : '已测评'}}</template>
                    <template slot="registerTime" scope="item">{{ item.value | timeFormat }}</template>
                    <template slot="userUuid" scope="item">
                        <router-link :to="{path: 'user-infor-detail',query:{userUuid:item.value}}">详情</router-link>
                    </template>
                </b-table>
            </div>

            <!--分页-->
            <div class="justify-content-center paging" flex-box="0" flex="main:center">
                <div>
                    <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count" :per-page='perPage' v-model="currentPage" @change="change"></b-pagination>
                    <div class="total"><span>共{{ Math.ceil(count / perPage) }}页</span><span>共{{ count }}条</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less';
    import Toast from '../components/Toast';
    import $api from '../tools/api';
    export default {
        name: 'user-infor',
        data(){
            return {
                //registerMerchantNum:this.$route.query.registerMerchantNum,
                selectedBase: 1,
                inputVal: '',
                count:0,
                optionsBase: [
                    {
                        text: '手机号',
                        value: 1
                    },{
                        text: '用户ID',
                        value: 2
                    }
                ],
                progressOptions: [
                    {
                        value: '0',
                        text: '已注册'
                    },{
                        value: '1',
                        text: '已实名'
                    },{
                        value: '2',
                        text: '已授权'
                    },{
                        value: '3',
                        text: '已绑卡'
                    },{
                        value: '4',
                        text: '已充值'
                    },{
                        value: '5',
                        text: '已投资'
                    },{
                        value: '',
                        text: '全部'
                    }
                ],
                progressSelected: '',
                items: [],
                fields: {
                    userId: { label: '用户ID' },
                    investorRealName:{label:'姓名'},
                    investorMobile: { label: '手机号' },
                    userVerifyStatus: { label: '开户进度' },
                    investorRiskScore: { label: '风险测评' },
                    registerTime: { label: '注册时间' },
                    userUuid: { label: '操作' },
                },
                currentPage: 1,
                perPage: 10,
            }
        },
        created(){
            this.get();
        },
        computed: {
            investorMobile:function(){
                if(this.selectedBase == 1){
                    return this.inputVal;
                }
                return null
            },
            userId:function(){
                if(this.selectedBase == 2){
                    return this.inputVal;
                }
                return null
            }
        },
        methods: {
            query(){
                this.currentPage = 1;
                this.get();
            },
            change(){
                setTimeout(()=>{
                    this.get();
                })
            },
            get(){
                let parm = {
                    pageNo:this.currentPage,
                    pageSize:this.perPage,
                    investorMobile:this.investorMobile,
                    userId:this.userId,
                    userVerifyStatus:this.progressSelected,
                    //registerMerchantNum:this.registerMerchantNum
                }
                $api.get('/user/investor/list',parm).then(msg => {
                    if(msg.code == 200){
                        this.items = msg.data.list;
                        this.count = msg.data.count;
                    }else{
                        Toast(msg.msg);
                    }
                });
            }
        },
        destroyed(){}
    }
</script>
