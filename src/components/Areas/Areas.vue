<template>
    <div class="select-area">
        <div class="rows" flex="main:justify">
            <div class="cols">
                <select v-model="f.p" @change="selpro" class="mb-3 form-control"v-bind:disabled="disabled">
                    <option :value="i" v-for="(v,i) in pro">{{v.name}}</option>
                </select>
                <div class="select-view">{{pro[f.p].name}}</div>
            </div>
    
            <div class="cols">
                <select v-model="f.c" @change="selcity" class="mb-3 form-control" v-bind:disabled="disabled">
                    <option :value="i" v-for="(v,i) in city">{{v.name}}</option>
                </select>
                <div class="select-view">{{city[f.c].name}}</div>
            </div>
            <!-- <div class="cols">
                <select v-model="f.cc" v-show="county.length>0" @change="result" class="mb-3 form-control">
                    <option :value="i" v-for="(v,i) in county">{{v.name}}</option>
                </select>
                <div class="select-view">{{county[f.cc].name}}</div>
            </div> -->
        </div>
        
    </div>
    </div>
</template>
<script>
    import data from "./data";
    import './areas.less';
    export default {
        name: 'areas',
        props: ['title','disabled'],
        data(){
            return {
               data:data,
               pro:"",
               city:"",
               county:"",
               f:{
                   p:0,
                   c:0,
                   cc:0,
                }
            }
        },
        created(){
            this.pro=this.data;
            this.city=this.pro[0]['child'];
            this.county=this.city[0]['child'];
            this.result();
        },
        methods:{
            selpro(){
                this.city=this.pro[this.f.p]['child'];
                this.county=this.city[0]['child'];
                this.f.c=0;
                this.f.cc=0;
                this.result();
            },
            selcity(){
                this.county=this.city[this.f.c]['child'];
                this.f.cc=0;
                this.result();
            },
            result(){
                let re={
                    pro:{id:this.pro[this.f.p].id,name:this.pro[this.f.p].name},
                    city:{id:this.city[this.f.c].id,name:this.city[this.f.c].name},
                    county:{id:this.county[this.f.cc].id,name:this.county[this.f.cc].name}
                };
                this.$emit("select",re);
            }
        }
    }   
</script>