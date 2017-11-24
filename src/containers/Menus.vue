<template>
    <div>
        <cloud-header></cloud-header>
        <div class="menu-warp" flex="main:justify">
            <div class="menus" flex-box="0">
                <div class="menus-list" >
                    菜单
                </div>
            </div>
            <router-view flex-box="1" class="content-view"></router-view>
        </div>
        <index-footer></index-footer>

    </div>
</template>

<script>
    import CloudHeader from '../components/CloudHeader';
    import IndexFooter from '../components/IndexFooter';
    import '../less/menus.less';
    import $api from '../tools/api';
    export default {
        name: 'menus',
        data(){
            return {
                
            }
        },
        created(){},
        components: {
            CloudHeader,
            IndexFooter
        },
        computed: {
        },
        methods: {},

    }
</script>
