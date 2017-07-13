<template>
    <div class="fixi-goods-detail">
        <div class="title1">定期产品详情</div>
        <div class="content">
            <h2>基本要素</h2>
            <div class="main main-up" flex>
                <ul flex-box="1" class="detail-first">
                    <li flex="">
                        <span class="title">产品名称</span>
                        <span class="info">{{productData.productName}}</span>
                    </li>
                    <li flex="">
                        <span class="title">产品类型</span>
                        <span class="info">固定收益类</span>
                    </li>
                    <li flex="">
                        <span class="title">收益方式</span>
                        <span class="info" v-if="productData.productInterestType == 11">到期一次性还本付息</span>
                        <span class="info"  v-if="productData.productInterestType == 12">等额本息</span>
                        <span class="info"  v-if="productData.productInterestType == 13">等额本金</span>
                        <span class="info"  v-if="productData.productInterestType == 14">预付利息</span>
                    </li>
                    <li flex="">
                        <span class="title" >可转债权</span>
                        <span class="info"  v-if="productData.isTransferFlag == 0">不可转</span>
                        <span class="info"  v-if="productData.isTransferFlag == 1">可转</span>
                    </li>
                    <li flex="">
                        <span class="title">投资人条件</span>
                        <span class="info" >{{productData.investorQualification}}</span>
                    </li>
                </ul>
                <ul  flex-box="1" class="detail-two">
                    <li flex="">
                        <span class="title" >产品规模</span>
                        <span class="info" >{{productData.productScale | currencyFormat}}元</span>
                    </li>
                    <li flex="">
                        <span class="title" >产品期限</span>
                        <span class="info" >
                            <template>{{productData.productPeriod}}</template><template v-if="productData.productPeriodType=='D'">天</template><template v-if="productData.productPeriodType=='W'">周</template><template v-if="productData.productPeriodType=='M'">月</template><template v-if="productData.productPeriodType=='Y'">年</template>
                        </span>
                    </li>
                    <li flex="">
                        <span class="title" >预期年化收益率</span>
                        <span class="info" >{{productData.annualInterestRate}}</span>
                    </li>
                    <li flex="">
                        <span class="title" >起投金额</span>
                        <span class="info" >{{productData.productMinInvestment | currencyFormat}}元</span>
                    </li>
                    <li flex="">
                        <span class="title" >投资上限</span>
                        <span class="info" >{{productData.productMaxInvestment | currencyFormat}}元</span>
                    </li>
                </ul>
                <ul  class="right detail-three">
                    <li flex="">
                        <span class="title" >募集金额(实)</span>
                        <span class="info" >{{productData.productAccumulation | currencyFormat}}元</span>
                    </li>
                    <li flex="">
                        <span class="title" >募集金额(虚)</span>
                        <span class="info" >{{productData.productManual | currencyFormat}}元</span>
                    </li>
                    <li flex="">
                        <span class="title" >产品状态</span>
                        <span class="info"  v-if="productData.productStatus==1">预热中</span>
                        <span class="info"  v-if="productData.productStatus==2">募集中</span>
                        <span class="info"  v-if="productData.productStatus==3">已售罄</span>
                        <span class="info"  v-if="productData.productStatus==4">已成立</span>
                        <span class="info"  v-if="productData.productStatus==5">封闭期</span>
                        <span class="info"  v-if="productData.productStatus==6">存续期</span>
                        <span class="info"  v-if="productData.productStatus==7">已结束</span>
                        <span class="info"  v-if="productData.productStatus==8">已到期</span>
                        <span class="info"  v-if="productData.productStatus==9">已兑付</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content content2">
            <h2>项目周期</h2>
            <div class="main" flex>
                <ul flex-box="1">
                    <li>发布日：{{productData.productPublishDate}}</li>
                    <li>预期收款日：{{productData.productPaymentDate}}</li>
                </ul>
                <ul flex-box="1">
                    <li>起息日：{{productData.productInterestDate}}</li>
                    <li>成立日：{{productData.productInterestDate}}</li>
                </ul>
                <ul flex-box="1">
                    <li>到期日：{{productData.productExpiringDate}}</li>
                </ul>
            </div>

        </div>
        <div class="content content3">
            <h2>募集方</h2>
            <div class="main" >
                <ul >
                    <li flex="box:mean ">
                        <span class="title" flex-box="1">企业用户编号：</span>
                        <span class="info" flex-box="6">{{productData.productIssuerUuid}}</span>
                    </li>
                    <li flex="box:mean">
                        <span class="title" flex-box="1" >企业名称：</span>
                        <span class="info" flex-box="6">{{productData.productIssuerName}}</span>
                    </li>
                </ul>
                <div class="tab">
                    <ul flex="dir:left">
                        <li v-for="(item,index) in tabList" :key="index" @click.stop="tab = index" :class="{active:tab==index,border:index == (tabList.length-1)}">{{item.title}}</li>
                    </ul>
                    <p><span>委托人预期年化收益率：</span><span> 5.15%，为定向委托投资标的到期产生的预期年化收益率扣除受托投资管理机构的管理费率。</span></p>
                    <p><span>收益起始日： </span><span>2017年03月24日</span></p>
                    <p><span>收益到期日： </span><span>2017年07月03日</span></p>
                    <p><span>期限：  </span><span>101天</span></p>
                    <p><span>预期收款日： </span><span>到期日后三个工作日内（以实际收款日为准）</span></p>
                    <p><span>定向委托投资标的： </span><span>非银行金融机构发行的产品，详见《定向委托投资标的说明》</span></p>
                    <p><span>定向委托投资标的风险提示： </span><span> 详见《风险提示函》</span></p>
                    <p><span>受托投资管理机构： </span><span>  深圳平安聚鑫资产管理有限公司</span></p>
                    <p><span>托管机构： </span><span>  平安银行股份有限公司深圳分行</span></p>
                </div>
            </div>
        </div>
        <div class="content content4">
            <h2>产品附件</h2>
            <div class="main">
                <ul>
                    <li v-for="(item,index) in productData.productAttachment" :key="index">
                        <rou
                    </li>
                    <li>托管机构： 平安银行股份有限公司深圳分行.pdf</li>
                    <li>托管机构： 平安银行股份有限公司深圳分行.pdf</li>
                    <li>托管机构： 平安银行股份有限公司深圳分行.pdf</li>
                </ul>

            </div>
        </div>
        <div class="content content5">
            <h2>状态</h2>
            <div class="main main-bottom" flex="dir:left box:mean">
                <ul  flex-box="1">
                    <li flex>
                        <span class="title" >上架状态：</span>
                        <span class="info" v-if="productData.productOnStatus == 1">未上架</span>
                        <span class="info" v-if="productData.productOnStatus == 2">已上架</span>
                        <span class="info" v-if="productData.productOnStatus == 3">已下架</span>
                    </li>
                    <li flex>
                        <span class="title" >产品状态：</span>
                        <span class="info"  v-if="productData.productStatus==1">预热中</span>
                        <span class="info"  v-if="productData.productStatus==2">募集中</span>
                        <span class="info"  v-if="productData.productStatus==3">已售罄</span>
                        <span class="info"  v-if="productData.productStatus==4">已成立</span>
                        <span class="info"  v-if="productData.productStatus==5">封闭期</span>
                        <span class="info"  v-if="productData.productStatus==6">存续期</span>
                        <span class="info"  v-if="productData.productStatus==7">已结束</span>
                        <span class="info"  v-if="productData.productStatus==8">已到期</span>
                        <span class="info"  v-if="productData.productStatus==9">已兑付</span>
                    </li>
                    <li flex>
                        <span class="title" >推荐状态：</span>
                        <span class="info" >{{productData.recommendStatus}}</span>
                    </li>
                </ul>
                <ul  >
                    <li flex>
                        <span class="title" >置顶状态：</span>
                        <span class="info" >{{productData.topStatus}}</span>
                    </li>
                    <li flex>
                        <span class="title" >放款状态：</span>
                        <span class="info" v-if="productData.transactionStatus == 1">待审核</span>
                        <span class="info" v-if="productData.transactionStatus == 2">审核通过</span>
                        <span class="info" v-if="productData.transactionStatus == 3">已兑付</span>
                        <span class="info" v-if="productData.transactionStatus == -1">审核失败</span>
                    </li>
                    <li flex>
                        <span class="title" >还款状态：</span>
                        <span class="info" v-if="productData.transactionStatus == 1">待审核</span>
                        <span class="info" v-if="productData.transactionStatus == 2">审核通过</span>
                        <span class="info" v-if="productData.transactionStatus == 3">已兑付</span>
                        <span class="info" v-if="productData.transactionStatus == -1">审核失败</span>
                    </li>
                </ul>
                <ul flex-box="1"></ul>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/fixi-goods-detail.less';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    export default {
        name: 'fixi-goods-detail',
        data(){
            return {
                id:'131181199103081929',
                productData:{},
                tab:0,
                tabList:[
                    {
                        title:'项目概况',
                        inner:null
                    },
                    {
                        title:'资金投向',
                        inner:null
                    },
                    {
                        title:'还款来源',
                        inner:null
                    },
                    {
                        title:'风险保障',
                        inner:null
                    },
                    {
                        title:'风险提示',
                        inner:null
                    }
                ]
            }
        },
        created(){
            $api.get('/product/fixedIncome/41552f8251d34da8b2ae80e4513d2791').then(msg => {
                if(msg.code == 200){
                    this.productData = msg.data
                }else{
                    Toast(msg.msg);
                }
            });
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
