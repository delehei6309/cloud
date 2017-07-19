<template>
    <div class="user-infor">
        <!--页面抬头-->
        <div class="title">用户信息</div>

        <!--查询条件-->
        <div class="inquire">
            <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
            <b-form-input type="text" placeholder="请输入用户信息" size="sm" v-model="inputVal"></b-form-input>
            <b-btn class="btn" @click.native="query">查询</b-btn>
        </div>

        <!--显示列表-->
        <div class="table-wrap">
            <b-table :items="items" :fields="fields"  bordered>
                <template slot="userVerifyStatus" scope="item">{{ item.value == 9 ? '是' : '否' }}</template>
                <template slot="userUuid" scope="item">
                    <router-link :to="{path: 'user-infor-detail',query:{userUuid:item.value}}">详情</router-link>
                </template>
            </b-table>
        </div>

        <!--分页-->
        <div class="justify-content-center">
            <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count" :per-page='perPage' v-model="currentPage" @change="change"></b-pagination>
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
                selectedBase: 0,
                inputVal: '',
                count:0,
                optionsBase: [
                    {
                        text:'全部',
                        value:0
                    },{
                        text: '手机号',
                        value: 1
                    },{
                        text: '用户ID',
                        value: 2
                    }
                ],
                items: [],
                fields: {
                    userId: { label: '用户ID' },
                    investorRealName:{label:'姓名'},
                    investorMobile: { label: '手机号' },
                    userVerifyStatus: { label: '是否开户' },
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
                    userId:this.userId
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
