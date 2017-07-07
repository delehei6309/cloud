<template>
    <div>
        <index-header></index-header>
        <div class="home">
            home
        </div>
        <index-footer></index-footer>

    </div>

</template>

<script>
    import IndexHeader from '../components/IndexHeader';
    import IndexFooter from '../components/IndexFooter';
    export default {
        name: 'home',
        data(){
            return {}
        },
        components:{
            IndexHeader,
            IndexFooter
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
