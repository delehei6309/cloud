<template>
    <div class="cloud-header">
        <div class="header-body" flex="main:justify">
            header
        </div>
    </div>
</template>

<script>
    import './cloud-header.less';
    import Toast from '../Toast';
    import $api from '../../tools/api';
    export default {
        name: 'cloud-header',
        data(){
            return {
                userMobile: '18997296307',
            }
        },
        created(){
        },
        computed: {},
        methods: {
            loginOut(){}
        },
        destroyed(){}
    }
</script>
