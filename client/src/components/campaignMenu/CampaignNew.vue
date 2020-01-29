<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card w-75">
                <div class="card-header">
                    <h1>New Campaign</h1>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="cycleSelect">Campaign</label>
                            <select class="form-control" id="cycleSelect" v-model="cycle">
                                <option v-for="cycle in cycles" :value="cycle" :key="cycle.id">{{cycle.title}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="campaignName">Campaign Name</label>
                            <input type="text" class="form-control" id="campaignName" v-model.lazy="campaignName">
                        </div>
                        <div class="form-group">
                            <label for="difficulty">Difficulty</label>
                            <select class="form-control" id="difficulty" v-model="difficulty">
                                <option v-for="d in difficulties" :value="d" :key="d">{{d}}</option>
                            </select>
                        </div>
                        <div class="card">
                            <div class="card-header">Chaos Bag</div>
                            <div  class="card-body"><img style="width: 50px;height:50px" v-for="(token,index) in this.cycle.chaosBags[this.difficulty]" :src="'../imgs/' + token + '.png'" alt="" :key="index"></div>
                        </div>
                        <div class="card">
                            <div class="card-header">Players</div>
                            <div class="card-body">
                                <button class="btn btn-primary mb-3" @click.prevent="addPlayer">AddPlayer</button>
                                <div class="row justify-content-around">
                                    <PlayerNew v-for="(player,index) in this.players" @remove="onPlayerRemove(index)" @changedLead="onLeadChanged(index)" :key="index" :playerData="player"></PlayerNew>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 d-flex justify-content-between">
                            <button class="btn btn-danger" @click.prevent="cancel">Cancel</button>
                            <button class="btn btn-primary" @click.prevent="createCampaign">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PlayerNew from "./PlayerNew";
    import CampaignService from "../../axios/CampaignService";
    import cycles from '../../json/cycles.json'
    
    export default {
        name: "CampaignNew",
        components: {
            PlayerNew
        },
        data() {
            return {
                campaignName : '',
                cycle: cycles[0],
                cycles,
                difficulties: ["Easy","Standard","Hard","Expert"],
                difficulty: "Easy",
                players: [],
            }
        },
        methods: {
            async createCampaign() {
                const campaign = {
                    cycleID: this.cycle.id,
                    name: this.campaignName,
                    difficulty: this.difficulty,
                    players: this.players,
                    chaosBag: this.cycle.chaosBags[this.difficulty],
                    currentScenario: this.cycle.startingScenario,
                    log: this.cycle.defaultLogs
                };
                await CampaignService.insertCampaign(this.$store.getters.token,campaign);
                await this.$router.push('/campaigns');
            },
            cancel() {
                this.$router.back();
            },
            addPlayer(){
                this.players.push({
                    investigatorID: null,
                    playerName: "",
                    isLead: this.players.length === 0,
                    totalXp: 0,
                    spentXp: 0,
                    physicalTrauma: 0,
                    mentalTrauma: 0,
                    weaknesses: [],
                    additionalCards: []
                });
            },
            onPlayerRemove(index){
                let player = this.players.splice(index,1);
                if(player.isLead && this.players.length > 0)
                {
                    this.players[0].isLead = true;
                }
            },
            onLeadChanged(index){
                console.log("lead changed");
                console.log(this.players[index]);
                if(this.players[index].isLead) {
                    for(let i = 0; i < this.players.length; i++) {
                        if(i === index)
                            continue;
                        this.players[i].isLead = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>