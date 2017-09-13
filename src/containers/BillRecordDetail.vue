<template>
    <div class="user-infor bill-record-detail" flex="dir:top">
        <div flex-box="0">
            <!--页面抬头-->
            <div class="title">账单详情</div>
            <!--查询条件-->
            <div class="inquire">
                <div flex="main:justify">
                    <div>
                        <b-form-select v-model="selectedBase" :options="optionsBase" size="sm"></b-form-select>
                        <b-form-input type="text" :readonly="!selectedBase" v-model="inputVal" placeholder="请输入信息"></b-form-input>
                    </div>
                    <div class="input-wrap" flex>
                        <div class="date-text">
                            <b-form-select v-model="selectedTime" :options="optionsTime" size="sm"></b-form-select>
                        </div>
                        <div class="input-date"><datepicker language="ch" v-model="dateStart"></datepicker></div>
                        <div class="date-text">到</div>
                        <div class="input-date"><datepicker language="ch" v-model="dateEnd"></datepicker></div>
                    </div>
                    <div>
                        <b-btn class="btn" @click.native="query">查询</b-btn>
                        <b-btn class="btn" @click.native="query">导出excel</b-btn>
                    </div>
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
                        <template v-if="item.value == 1">预热中</template>
                        <template v-if="item.value == 2">募集中</template>
                        <template v-if="item.value == 3">已售罄</template>
                        <template v-if="item.value == 4">已成立</template>
                        <template v-if="item.value == 5">封闭期</template>
                        <template v-if="item.value == 6">存续期</template>
                        <template v-if="item.value == 7">已结束</template>
                        <template v-if="item.value == 8">已到期</template>
                        <template v-if="item.value == 9">已兑付</template>
                        <template v-if="item.value == 9">已作废</template>
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
                //merchantNum:this.$route.query.merchantNum,
                count:0,
                dateStart:null,
                dateEnd:null,
                filter: "0.01",
                selectedBase: '',
                selectedProductStatus: '',
                selectedTime: 1,
                //selectedIsRecommend: null,
                inputVal: '',
                optionsBase: [
                    {
                        text: '全部',
                        value: ''
                    },
                    {
                        text: '产品名称',
                        value: 1
                    },{
                        text: '产品订单号',
                        value: 2
                    }/*,{
                        text: '上架',
                        value: 3
                    }*/
                ],
                optionsTime:[
                    {
                        value:1,
                        text:'订单创建时间'
                    },{
                        value:2,
                        text:'订单支付时间'
                    }
                ],
                optionsProductOnStatus: [
                    {
                        value: '',
                        text: '全部'
                    },{
                        value: 1,
                        text: '未上架'
                    },{
                        value: 2,
                        text: '已上架'
                    },{
                        value: 3,
                        text: '已下架'
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
                    productCode: { label: '订单创建时间' },
                    productAbbrName: { label: '定期订单号' },
                    productType: { label: '产品ID' },
                    productScale: { label: '产品名称' },
                    annualInterestRate: { label: '用户名' },
                    productPeriod: { label: '投资金额(元)' },
                    productOnStatus: { label: '预期到期收益（元)' },
                    productStatus: { label: '订单支付时间' },
                    createTime: { label: '投资期限' },
                    productAccumulation: { label: '渠道对应佣金年化比例' },
                    productUuid: { label: '返佣金额（元）' },
                    productUuids: { label: '结佣状态' },
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
                    ProductOnStatus:this.selectedProductOnStatus,
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
