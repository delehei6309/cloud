<template>
    <div class="user-infor">
        <!--页面抬头-->
        <div class="title">用户信息</div>

        <!--查询条件-->
        <div class="inquire">
            <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
            <b-form-input type="text" placeholder="请输入用户信息" size="sm"></b-form-input>
            <b-btn class="btn">查询</b-btn>
        </div>

        <!--显示列表-->
        <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" bordered>
            <template slot="userVerifyStatus" scope="item">{{ item.value == 9 ? '是' : '否' }}</template>
            <template slot="userUuid" scope="item">
                <router-link :to="{path: 'user-infor-detail',query:{userUuid:item.value}}">详情</router-link>
            </template>
        </b-table>
        <!--分页-->
        <div class="justify-content-center">
            <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="items.length" :limit=10 :per-page='perPage' v-model="currentPage"></b-pagination>
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
                selectedBase: 'phone',
                inputVal: '',
                optionsBase: [
                    {
                        text: '手机号',
                        value: 'phone'
                    },{
                        text: '用户ID',
                        value: 'B'
                    }
                ],
                items: [],
                fields: {
                    userId: { label: '用户ID' },
                    userLoginName: { label: '用户昵称' },
                    investorMobile: { label: '手机号' },
                    userVerifyStatus: { label: '是否开户' },
                    userUuid: { label: '操作' },
                },
                currentPage: 1,
                perPage: 10,
            }
        },
        created(){
            $api.get('/user/investor/list').then(msg => {
                if(msg.code == 200){
                    this.items = msg.data
                }else{
                    Toast(msg.msg);
                }
            });
        },
        computed: {},
        methods: {
            inquire: function() {
                let sql = this.selectedBase + '=' + this.inputVal + '&isRisk=' + this.selectedIsRisk
            }
        },
        destroyed(){

        }
    }
</script>
