<template>
    <div class="cloud-header">
        <div class="header-body" flex="main:justify">
            <div class="header-left" flex>
                <div class="imgs"><img src="../../images/cloud-logo.png" alt="logo"></div>
                <div>开放平台</div>
            </div>
            <div class="header-right" flex>
                
            </div>
        </div>
    </div>
</template>

<script>
    import './cloud-header.less';
    import Toast from '../Toast';
    export default {
        name: 'cloud-header',
        data(){
            return {
                userMobile:'18997296307',
            }
        },
        created(){
        },
        computed: {},
        methods: {
            loginOut(){
                Toast('退出');
            }
        },
        destroyed(){

        }
    }
</script>
