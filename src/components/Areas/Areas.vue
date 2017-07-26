<template>
    <div class="select-area">
        <div class="rows" flex="main:justify">
            <div class="cols">
                <select v-model="f.p" @change="selpro" class="mb-3 form-control" :disabled="disabled" ref="province">
                    <option :value="i" v-for="(v,i) in pro">{{v.name}}</option>
                </select>
                <!-- <div class="select-view">{{pro[f.p].name}}</div> -->
                <div class="select-view">{{pro[f.p].name}}</div>
            </div>
    
            <div class="cols">
                <select v-model="f.c" @change="selcity" class="mb-3 form-control" :disabled="disabled" ref="city">
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
        props: ['title','disabled','addressProvince','addressCity'],
        data(){
            return {
                data:data,
                pro:[],
                city:[],
                county:[],
                f:{
                    p:0,
                    c:0,
                    cc:0,
                }
            }
        },
        computed:{
        },
        created(){
            this.pro=this.data;
            this.city=this.pro[this.f.p]['child'];
            this.county=this.city[this.f.c]['child'];
            this.monitor();
        },
        methods:{
            options(select,text){
                for( let i in select.options){
                    if(typeof select.options[i] == 'object'){
                        if(text == select.options[i].text){
                            return select.options[i].value;
                        }
                    }
                }
            },
            monitor(){
                let mon = 1;
                if(this.addressProvince){
                    this.$nextTick(()=>{
                        let options = (select,text) =>{
                            for( let i in select.options){
                                if(typeof select.options[i] == 'object'){
                                    if(text == select.options[i].text){
                                        return select.options[i].value;
                                    }
                                }
                            }
                            return 0
                        }
                        this.f.p = options(this.$refs.province,this.addressProvince);
                        this.city=this.pro[this.f.p]['child'];
                        this.$nextTick(()=>{
                            this.f.c = options(this.$refs.city,this.addressCity);
                            this.result(mon);
                        });
                    });
                    return
                }
                this.result(mon);
            },
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
            result(mon){
                let re={
                    pro:{id:this.pro[this.f.p].id,name:this.pro[this.f.p].name},
                    city:{id:this.city[this.f.c].id,name:this.city[this.f.c].name},
                    county:{id:this.county[this.f.cc].id,name:this.county[this.f.cc].name}
                };
                if(!mon)
                this.$emit("select",re);
            }
        },
        watch:{
            addressProvince:function(){
                this.monitor()
            }
        }
    }   
</script>