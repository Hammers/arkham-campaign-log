<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card col-12 col-sm-9">
                <div class="card-header">
                    <h1>{{campaign.name}}</h1>
                </div>
                <div class="card-body">
                    <div class="jumbotron">
                        <h3>{{cycle.title}} - {{campaign.difficulty}}</h3>
                        <p class="lead">Next: {{nextScenario.name}}</p>
                        <button class="btn btn-large btn-primary" @click="startScenario">Go!</button>
                    </div>
                    
                    
                    <div class="card my-3">
                        <div class="card-header"><h4>Chaos Bag</h4></div>
                        <div  class="card-body"><img style="width: 50px;height:50px" v-for="(token,index) in campaign.chaosBag" :src="'../imgs/' + token + '.png'" alt="" :key="index"></div>
                    </div>
                    
                    <div class="card my-3">
                        <div class="card-header"><h4>Players</h4></div>
                        <div class="card-body">
                            <div class="row">
                                <Player v-for="(player,index) in campaign.players" :key="index" :player="player"></Player>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 d-flex justify-content-between">
                        <button class="btn btn-danger" @click.prevent="back">Back</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Player from "./Player";
    import cycles from '../../json/cycles'
    import scenarios from '../../json/scenarios'
    
    export default {
        components: {
            Player
        },
        computed: {
            campaign() {
                return this.$store.getters.currentCampaign;
            },
            cycle() {
                return cycles.find(x => x.id === this.campaign.cycleID);
            },
            nextScenario() {
                return scenarios[this.cycle.id][this.campaign.currentScenario];
            }
        },
        methods: {
            back() {
                this.$router.push('/campaigns/')
            },
            startScenario(){
                this.$router.push('/scenario/')
            }
        }
    }
</script>

<style scoped>

</style>