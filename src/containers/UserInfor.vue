<template>
    <div class="user-infor">
        <!--页面抬头-->
        <div class="title">用户信息</div>

        <!--查询条件-->
        <div class="inquire">
            <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
            <b-form-input type="text" placeholder="请输入用户信息" size="sm"></b-form-input>
            <span>风险测评</span>
            <b-form-select v-model="selectedIsRisk" :options="optionsIsRisk" size="sm"></b-form-select>
            <b-btn class="btn">查询</b-btn>
        </div>

        <!--显示列表-->
        <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" bordered>
            <template slot="isAccount" scope="item">{{ item.value ? '是' : '否' }}</template>
            <template slot="action" scope="item">
                <router-link :to="{path: 'authentication', query: {id: 123, name: 'stone'}}">详情</router-link>
            </template>
        </b-table>

        <!--分页-->
        <div class="justify-content-center">
            <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="items.length" :limit=10 :per-page='perPage' v-model="currentPage"></b-pagination>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less'
    export default {
        name: 'user-infor',
        data(){
            return {
                selectedBase: 'A',
                selectedIsRisk: 'A',
                optionsBase: [
                    {
                        text: '手机号',
                        value: 'A'
                    },{
                        text: '用户ID',
                        value: 'B'
                    },{
                        text: '姓名',
                        value: 'C'
                    },{
                        text: '身份证号',
                        value: 'D'
                    },
                ],
                optionsIsRisk: [
                    {
                        text: '全部',
                        value: 'A'
                    },{
                        text: '已测评',
                        value: 'B'
                    },{
                        text: '未测评',
                        value: 'C'
                    }
                ],
                items: [
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                    { userid: '10002', nickname: 'seven', name: '小七', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'one', name: '小一', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'tow', name: '小二', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'four', name: '小四', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                    { userid: '10002', nickname: 'seven', name: '小七', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'one', name: '小一', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'tow', name: '小二', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'four', name: '小四', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'four', name: '小四', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                    { userid: '10002', nickname: 'seven', name: '小七', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'one', name: '小一', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'tow', name: '小二', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'three', name: '小三', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10002', nickname: 'four', name: '小四', phone: '134****6789', isAccount: false, original: '渠道方' },
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                    { userid: '10001', nickname: 'stone', name: '石头', phone: '123****1234', isAccount: true, original: '金疙瘩' },
                ],
                fields: {
                    userid: { label: '用户ID' },
                    nickname: { label: '用户昵称' },
                    name: { label: '用户名' },
                    phone: { label: '手机号' },
                    isAccount: { label: '是否开户' },
                    original: { label: '注册来源' },
                    action: { label: '操作' },
                },
                currentPage: 1,
                perPage: 10,
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
