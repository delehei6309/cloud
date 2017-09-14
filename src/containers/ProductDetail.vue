<template>
    <div class="product-detail">
        <div class="title1">定期产品详情</div>
        <div class="content">
            <h2>基本要素</h2>
            <div class="main main-up" flex>
                <ul flex-box="1" class="detail-first">
                    <li flex="">
                        <span class="title">产品名称</span>
                        <span class="info">{{productData.productName || '--'}}</span>
                    </li>
                    <li flex="">
                        <span class="title">产品类型</span>
                        <span class="info" v-if="productData.productType == 'FIXI'">固定收益类</span>
                    </li>
                    <li flex="">
                        <span class="title">收益方式</span>
                        <span class="info" v-if="productData.productInterestType == 11">到期一次性还本付息</span>
                        <span class="info"  v-else-if="productData.productInterestType == 12">等额本息</span>
                        <span class="info"  v-else-if="productData.productInterestType == 13">等额本金</span>
                        <span class="info"  v-else-if="productData.productInterestType == 14">预付利息</span>
                        <span class="info"  v-else>--</span>
                    </li>
                    <li flex="">
                        <span class="title" >可转债权</span>
                        <span class="info"  v-if="productData.isTransferFlag == 0">不可转</span>
                        <span class="info"  v-else-if="productData.isTransferFlag == 1">可转</span>
                        <span class="info"  v-else>--</span>
                    </li>
                    <li flex="">
                        <span class="title">投资人条件</span>
                        <span class="info" >{{productData.investorQualification || '--'}}</span>
                    </li>
                </ul>
                <ul  flex-box="1" class="detail-two">
                    <li flex="">
                        <span class="title" >产品规模</span>
                        <span class="info" >{{productData.productScale | currencyFormat}}元</span>
                    </li>
                    <li flex="">
                        <span class="title" >产品期限</span>
                        <span class="info" v-if="productData.productPeriod">
                            <template>{{productData.productPeriod}}</template><template v-if="productData.productPeriodType=='D'">天</template><template v-if="productData.productPeriodType=='W'">周</template><template v-if="productData.productPeriodType=='M'">月</template><template v-if="productData.productPeriodType=='Y'">年</template>
                        </span>
                        <span class="info" v-else>--</span>
                    </li>
                    <li flex="">
                        <span class="title" >预期年化收益率</span>
                        <span class="info" >{{productData.annualInterestRate | translatePate}}</span>
                    </li>
                    <li flex="">
                        <span class="title" >起投金额</span>
                        <span class="info" >
                            <template>{{productData.productMinInvestment | currencyFormat}}</template><template v-if="productData.productMinInvestment">元</template>
                        </span>
                    </li>
                    <li flex="">
                        <span class="title" >投资上限</span>
                        <span class="info" >
                            <template>{{productData.productMaxInvestment | currencyFormat}}</template><template v-if="productData.productMaxInvestment">元</template>
                        </span>
                    </li>
                </ul>
                <ul  class="right detail-three">
                    <li flex="">
                        <span class="title" >募集金额(实)</span>
                        <span class="info" >
                            <template>{{productData.productAccumulation | currencyFormat}}</template><template v-if="productData.productAccumulation">元</template>
                        </span>
                    </li>
                    <li flex="">
                        <span class="title" >募集金额(虚)</span>
                        <span class="info" >
                            <template>{{productData.productManual | currencyFormat}}</template><template v-if="productData.productManual">元</template>
                        </span>
                    </li>
                    <li flex="">
                        <span class="title" >产品状态</span>
                        <span class="info"  v-if="productData.productStatus==1">预热中</span>
                        <span class="info"  v-else-if="productData.productStatus==2">募集中</span>
                        <span class="info"  v-else-if="productData.productStatus==3">已售罄</span>
                        <span class="info"  v-else-if="productData.productStatus==4">已成立</span>
                        <span class="info"  v-else-if="productData.productStatus==5">已放款</span>
                        <span class="info"  v-else-if="productData.productStatus==6">计息中</span>
                        <span class="info"  v-else-if="productData.productStatus==8">已到期</span>
                        <span class="info"  v-else-if="productData.productStatus==9">已兑付</span>
                        <span class="info"  v-else-if="productData.productStatus==21">已作废</span>
                        <span class="info"  v-else>--</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content content2">
            <h2>项目周期</h2>
            <div class="main" flex>
                <ul flex-box="1">
                    <li>募集开始日期：{{productData.raiseStartDate || '--'}}</li>
                </ul>
                <ul flex-box="1">
                    <li>募集结束日期：{{productData.raiseEndDate || '--'}}</li>
                </ul>
                <ul flex-box="1">
                    <li>发布日：{{productData.productPublishDate || '--'}}</li>
                </ul>
            </div>
            <div class="main" flex>
                <ul flex-box="1">
                    <li>预期收款日：{{productData.productPaymentDate || '--'}}</li>
                </ul>
                <ul flex-box="1">
                    <li>起息日：{{productData.productInterestDate || '--'}}</li>
                </ul>
                <ul flex-box="1">
                    <li>到期日：{{productData.productExpiringDate || '--'}}</li>
                </ul>
            </div>

        </div>
        <div class="content content3">
            <h2>募集方</h2>
            <div class="main" >
                <ul class="raise">
                    <li flex>
                        <span class="title">企业用户编号：</span>
                        <span class="info" flex-box="1">{{productData.productIssuerUuid || '--'}}</span>
                    </li>
                    <li flex>
                        <span class="title" >企业名称：</span>
                        <span class="info" flex-box="1">{{productData.productIssuerName || '--'}}</span>
                    </li>
                </ul>
                <div class="tab">
                    <ul flex="dir:left">
                        <li v-for="(item,index) in tabList" :key="index" @click.stop="tab = index" :class="{active:tab==index,border:index == (tabList.length-1)}">{{item.title}}</li>
                    </ul>
                    <!-- <p><span>委托人预期年化收益率：</span><span> 5.15%，为定向委托投资标的到期产生的预期年化收益率扣除受托投资管理机构的管理费率。</span></p>
                    <p><span>收益起始日： </span><span>2017年03月24日</span></p>
                    <p><span>收益到期日： </span><span>2017年07月03日</span></p>
                    <p><span>期限：  </span><span>101天</span></p>
                    <p><span>预期收款日： </span><span>到期日后三个工作日内（以实际收款日为准）</span></p>
                    <p><span>定向委托投资标的： </span><span>非银行金融机构发行的产品，详见《定向委托投资标的说明》</span></p>
                    <p><span>定向委托投资标的风险提示： </span><span> 详见《风险提示函》</span></p>
                    <p><span>受托投资管理机构： </span><span>  深圳平安聚鑫资产管理有限公司</span></p>
                    <p><span>托管机构： </span><span>  平安银行股份有限公司深圳分行</span></p> -->
                    <p v-for="(item,index) in tabList" :key="index" v-show="index == tab" v-html="item.inner"></p>
                </div>
            </div>
        </div>
        <div class="content content4">
            <h2>产品附件</h2>
            <div class="main">
                <ul>
                    <li v-for="(item,index) in productData.productAttachment" :key="index">
                        <a :href="item.attachmentLink" target="_blank">{{item.attachmentName}}</a>
                    </li>
                    <!-- <li>托管机构： 平安银行股份有限公司深圳分行.pdf</li>
                    <li>托管机构： 平安银行股份有限公司深圳分行.pdf</li>
                    <li>托管机构： 平安银行股份有限公司深圳分行.pdf</li> -->
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
                        <span class="info" v-else-if="productData.productOnStatus == 2">已上架</span>
                        <span class="info" v-else-if="productData.productOnStatus == 3">已下架</span>
                        <span class="info" v-else>--</span>
                    </li>
                    <li flex>
                        <span class="title" >产品状态：</span>
                        <span class="info"  v-if="productData.productStatus==1">预热中</span>
                        <span class="info"  v-else-if="productData.productStatus==2">募集中</span>
                        <span class="info"  v-else-if="productData.productStatus==3">已售罄</span>
                        <span class="info"  v-else-if="productData.productStatus==4">已成立</span>
                        <span class="info"  v-else-if="productData.productStatus==5">封闭期</span>
                        <span class="info"  v-else-if="productData.productStatus==6">存续期</span>
                        <span class="info"  v-else-if="productData.productStatus==7">已结束</span>
                        <span class="info"  v-else-if="productData.productStatus==8">已到期</span>
                        <span class="info"  v-else-if="productData.productStatus==9">已兑付</span>
                        <span class="info" v-else>--</span>
                    </li>
                    <li flex>
                        <span class="title" >推荐状态：</span>
                        <span class="info" >{{productData.recommendStatus || '--'}}</span>
                    </li>
                </ul>
                <ul  >
                    <li flex>
                        <span class="title" >置顶状态：</span>
                        <span class="info" >{{productData.topStatus || '--'}}</span>
                    </li>
                    <li flex>
                        <span class="title" >放款状态：</span>
                        <span class="info" v-if="productData.productStatus >= 5 && productData.productStatus != 21">已放款</span>
                        <span class="info" v-else-if="productData.productStatus < 5">未放款</span>
                        <span class="info" v-else>--</span>
                    </li>
                    <li flex>
                        <span class="title" >还款状态：</span>
                        <span class="info" v-if="productData.productStatus >= 9 && productData.productStatus != 21">已兑付</span>
                        <span class="info" v-else-if="productData.productStatus < 9">未兑付</span>
                        <span class="info" v-else>--</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content content6">
            <h2>渠道结算</h2>
            <div class="main main-bottom" flex="">
               <div class="div-name">年化比例：</div>
               <div class="div-rate">{{productData.channel_charge_rate | translatePate}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/product-detail.less';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    export default {
        name: 'product-detail',
        data(){
            return {
                id:'131181199103081929',
                productData:{},
                tab:0
            }
        },
        created(){
            $api.get('/product/fixedIncome/'+this.$route.query.productUuid).then(msg => {
                if(msg.code == 200){
                    this.productData = msg.data
                }else{
                    Toast(msg.msg);
                }
            });
        },
        computed: {
            tabList:function(){
                let arr = [
                    {
                        title:'项目概况',
                        inner:this.productData.productIntroduction,
                    },
                    {
                        title:'资金投向',
                        inner:this.productData.moneyOut
                    },
                    {
                        title:'还款来源',
                        inner:this.productData.repayment
                    },
                    {
                        title:'风险保障',
                        inner:this.productData.riskProtect
                    },
                    {
                        title:'风险提示',
                        inner:this.productData.riskPrompt
                    }
                ];
                return arr;
            }
        },
        methods: {},
        destroyed(){

        }
    }
</script>
