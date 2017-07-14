<template>
    <div class="user-infor">
        <!--页面抬头-->
        <div class="title">定期产品管理</div>
        <!--查询条件-->
        <div class="inquire">
            <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
            <b-form-input type="text" v-model="inputVal" placeholder="请输入用户信息"></b-form-input>
            <span>产品状态</span>
            <b-form-select v-model="selectedProductStatus" :options="optionsProductStatus" size="sm"></b-form-select>
            <span>推荐至首页</span>
            <b-form-select v-model="selectedIsRecommend" :options="optionsIsRecommend" size="sm"></b-form-select>
            <div class="input-wrap">
              创建时间：<input type="date" id="startDate">到<input type="date" id="endDate">

              <b-btn class="btn">查询</b-btn>
            </div>
        </div>

        <!--显示列表-->
        <div class="table-wrap">
            <b-table :items="items" :fields="fields" :filter="filter" :current-page="currentPage" :per-page="perPage" bordered>
                <template slot="productUuid" scope="item">
                    <router-link :to="{path: 'product-detail', query: {productUuid: item.value}}">详情</router-link>
                </template>
                <template slot="createTime" scope="item">
                    {{item.value | timeFormat}}
                </template>
            </b-table>
        </div>

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
                filter: "0.01",
                selectedBase: 'all',
                selectedProductStatus: 'all',
                selectedIsRecommend: 'all',
                inputVal: '',
                optionsBase: [
                    {
                        text: '全部',
                        value: 'all'
                    },{
                        text: '产品编号',
                        value: 'code'
                    },{
                        text: '产品名称',
                        value: 'abbrName'
                    }
                ],
                optionsProductStatus: [
                    {
                        text: '全部',
                        value: 'all',
                    },{
                        text: '预热中',
                        value: 'preheating',
                    },{
                        text: '募集中',
                        value: 'raising',
                    },{
                        text: '已售罄',
                        value: 'sold',
                    },{
                        text: '已成立',
                        value: 'formed',
                    },{
                        text: '封存期',
                        value: 'storaged',
                    },{
                        text: '存续期',
                        value: 'duration',
                    },{
                        text: '已结束',
                        value: 'end',
                    }
                ],
                optionsIsRecommend: [
                    {
                        text: '全部',
                        value: 'all',
                    },{
                        text: '是',
                        value: true,
                    },{
                        text: '否',
                        value: false,
                    },
                ],
                items: [],
                fields: {
                    productCode: { label: '产品编号' },
                    productAbbrName: { label: '产品简称' },
                    productType: { label: '产品类型' },
                    productScale: { label: '产品规模（元）' },
                    annualInterestRate: { label: '预期年化收益率' },
                    productPeriod: { label: '产品期限（天）' },
                    productOnStatus: { label: '上架状态' },
                    productStatus: { label: '产品状态' },
                    createTime: { label: '创建时间' },
                    productAccumulation: { label: '已募集金额（元）' },
                    productUuid: { label: '操作' },
                },
                currentPage: 1,
                perPage: 10,
            }
        },
        components: {},
        created(){
          $api.get('/product/fixedIncome/list').then(msg => {
            if(msg.code == 200){
              this.items = msg.data
            }else{
              Toast(msg.msg)
            }
          })
        },
        computed: {},
        methods: {},
        destroyed(){}
    }
</script>
