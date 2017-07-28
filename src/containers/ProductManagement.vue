<template>
    <div class="user-infor" flex="dir:top">
        <div flex-box="0">
            <!--页面抬头-->
            <div class="title">定期产品管理</div>
            <!--查询条件-->
            <div class="inquire">
                <div flex="main:justify">
                    <div>
                        <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
                        <b-form-input type="text" v-model="inputVal"></b-form-input>
                        <span>产品状态</span>
                        <b-form-select v-model="selectedProductStatus" :options="optionsProductStatus" size="sm"></b-form-select>
                    </div>
                    <div class="input-wrap" flex>
                        <div class="date-text">创建时间：</div>
                        <div class="input-date"><datepicker language="ch" v-model="dateStart"></datepicker></div>
                        <div class="date-text">到</div>
                        <div class="input-date"><datepicker language="ch" v-model="dateEnd"></datepicker></div>
                    </div>
                    <b-btn class="btn" @click.native="query">查询</b-btn>
                </div>
            </div>
        </div>
        <div flex-box="1" flex="dir:top">
            <!--显示列表-->
            <div class="table-wrap" flex-box="1">
                <b-table :items="items" :fields="fields"  bordered>
                    <template slot="productType" scope="item">
                        <template v-if="item.value == 'FIXI'">固定收益类</template>
                    </template>
                    <template slot="productScale" scope="item">{{item.value | currencyFormat}}</template>
                    <template slot="annualInterestRate" scope="item">{{item.value | translatePate}}</template>
                    <template slot="productPeriod" scope="item">
                        <template>{{item.value}}</template><template v-if="item.item.productPeriodType == 'D'">天</template><template v-if="item.item.productPeriodType == 'W'">周</template><template v-if="item.item.productPeriodType == 'M'">月</template><template v-if="item.item.productPeriodType == 'Y'">天</template>
                    </template>
                    <template slot="productOnStatus" scope="item">
                        <template v-if="item.value == 1">未上架</template>
                        <template v-if="item.value == 2">已上架</template>
                        <template v-if="item.value == 3">已下架</template>
                    </template>
                    <template slot="productStatus" scope="item">
                        <template v-if="item.value == 2">募集中</template>
                        <template v-if="item.value == 3">已售罄</template>
                        <template v-if="item.value == 4">已成立</template>
                        <template v-if="item.value == 8">已到期</template>
                        <template v-if="item.value == 9">已兑付</template>
                    </template>
                    <template slot="createTime" scope="item">
                        {{item.value | timeFormat}}
                    </template>
                    <template slot="productAccumulation" scope="item">{{item.value | currencyFormat}}</template>
                    <template slot="productUuid" scope="item">
                        <router-link :to="{path: 'product-detail', query: {productUuid: item.value}}">详情</router-link>
                    </template>
                </b-table>
            </div>

            <!--分页-->
            <div class="justify-content-center paging" flex-box="0" flex="main:center">
                <div>
                    <b-pagination prev-text="上一页" next-text="下一页" hide-goto-end-buttons size="md" :total-rows="count" :per-page='perPage' v-model="currentPage" @click.native="change()"></b-pagination>
                    <div class="total"><span>共{{ Math.ceil(count / perPage) }}页</span><span>共{{ count }}条</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less';
    import datepicker from 'vue-date';
    import Toast from '../components/Toast';
    import $api from '../tools/api';
    export default {
        name: 'user-infor',
        data(){
            return {
                count:0,
                dateStart:null,
                dateEnd:null,
                filter: "0.01",
                selectedBase: 1,
                selectedProductStatus: null,
                //selectedIsRecommend: null,
                inputVal: '',
                optionsBase: [
                    {
                        text: '产品编号',
                        value: 1
                    },{
                        text: '产品名称',
                        value: 2
                    }
                ],
                optionsProductStatus:[
                    {
                        text: '全部',
                        value: null,
                    },{
                        text: '募集中',
                        value: 2,
                    },{
                        text: '已售罄',
                        value: 3,
                    },{
                        text: '已成立',
                        value: 4,
                    },{
                        text: '已到期',
                        value: 8,
                    },{
                        text: '已兑付',
                        value: 9,
                    }
                ],
                /*optionsIsRecommend: [
                    {
                        text: '全部',
                        value: null,
                    },{
                        text: '是',
                        value: true,
                    },{
                        text: '否',
                        value: false,
                    },
                ],*/
                items: [],
                fields: {
                    productCode: { label: '产品编号' },
                    productAbbrName: { label: '产品简称' },
                    productType: { label: '产品类型' },
                    productScale: { label: '产品规模（元）' },
                    annualInterestRate: { label: '预期年化收益率' },
                    productPeriod: { label: '产品期限' },
                    productOnStatus: { label: '上架状态' },
                    productStatus: { label: '产品状态' },
                    createTime: { label: '创建时间' },
                    productAccumulation: { label: '已募集金额（元）' },
                    productUuid: { label: '操作' },
                },
                currentPage: 1,
                perPage:10,
            }
        },
        components: { datepicker },
        created(){
            this.get();
        },
        computed: {
            productCode:function(){
                if(this.selectedBase == 1){
                    return this.inputVal;
                }
                return null
            },
            productAbbrName:function(){
                if(this.selectedBase == 2){
                    return this.inputVal;
                }
                return null
            }
        },
        methods: {
            change(){
                setTimeout(()=>{
                    this.get();
                })
            },
            query(){
                this.currentPage = 1;
                this.get();
            },
            get(){
                let parm = {
                    pageNo:this.currentPage,
                    pageSize:this.perPage,
                    ProductStatus:this.selectedProductStatus,
                    productCode:this.productCode,
                    productAbbrName:this.productAbbrName,
                    productOpenTimeFrom:this.dateStart,
                    productOpenTimeTo:this.dateEnd
                }
                $api.get('/product/fixedIncome/list',parm).then(msg => {
                    if(msg.code == 200){
                        this.items = msg.data.list
                        this.count = msg.data.count
                    }else{
                        Toast(msg.msg);
                    }
                });
            }
        },
        destroyed(){}
    }
</script>
