<template>
    <div>
        <h2 class="text-center">Resolution</h2>
        <form>
            <div class="form-group">
                <label for="investigatorSelect">Resolution</label>
                <select class="form-control" id="investigatorSelect" v-model="resolution" @change="resolutionChanged">
                    <option v-for="(resolution,index) in scenario.resolutions" :value="resolution" :key="index">{{resolution.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="victoryDisplay">Victory Display</label>
                <input type="number" class="form-control" id="victoryDisplay" v-model="victoryDisplay">
            </div>
        </form>
        <div v-if="resolution">
            <div>
                {{this.resolution.text}}
            </div>
            <div v-for="(c,index) in actionComponents" :key="index">
                <component :is="c.name" :actionList="c.actionList"></component>
            </div>
            <div>
                <ul>
                    <li v-for="(text,index) in actionDescriptions" :key="index">{{text}}</li>
                </ul>
            </div>
            <div class="d-flex justify-content-center my-2">
                <button class="btn btn-primary btn-large" @click="nextScenario">Continue</button>
            </div>
        </div>
    </div>
</template>

<script>
    import scenarios from '../../json/scenarios';
    import MidnightMasks from "./MidnightMasks";

    export default {
        name: "",
        components: {
            MidnightMasks,
        },
        computed: {
            campaign() {
                return this.$store.getters.currentCampaign;
            },
            scenario() {
                return scenarios[this.campaign.cycleID][this.campaign.currentScenario];
            },
            actionDescriptions() {
                let descriptions = [];
                for(var i = 0; i < this.resolution.actions.length; i++) {
                    if(this.resolution.actions[i].text) {
                        descriptions.push(this.resolution.actions[i].text);
                    }
                }
                return descriptions;
            }
        },
        data() {
            return {
                resolution: null,
                victoryDisplay: 0,
                actionInputs: {},
                actionComponents: []
            }
        },
        methods: {
            resolutionChanged() {
                this.actionComponents = [];
                for(var i = 0; i < this.resolution.actions.length; i++) {
                    if("component" in this.resolution.actions[i]) {
                        var component = {};
                        component.name = this.resolution.actions[i].component;
                        component.actionList = [];
                        this.actionComponents.push(component);
                    }
                }
            },
            nextScenario() {
                var actionList = this.resolution.actions;
                for(var x = 0; x < this.actionComponents.length; x++) {
                    actionList.push(...this.actionComponents[x].actionList);
                }
                for (var i = 0; i < actionList.length; i++) {
                    var action = actionList[i];
                    let players = [];
                    switch(action.type) {
                        case "logEntry":
                            console.log("Entering log entry: " + action.entry);
                            var entry = {
                                logId: action.entryID,
                                text: action.entry
                            };
                            var logIndex = 0;
                            if("log" in action) {
                                logIndex = action.log;
                            }
                            this.campaign.log[logIndex].entries.push(entry);
                            break;
                        case "xp":
                            var xp = 0;
                            if(action.includeDisplay) {
                                xp += Number(this.victoryDisplay);
                            }
                            if("bonus" in action) {
                                xp += Number(action.bonus);
                            }
                            players = this.getPlayers(action.player);
                            players.forEach(p => {
                                p.totalXp += xp;
                                console.log(p.playerName + " gained " + xp + "xp");
                            });
                            break;
                        case "mentalTrauma":
                            players = this.getPlayers(action.player);
                            players.forEach(p => {
                                p.mentalTrauma += action.amount;
                                console.log(p.playerName + " gained " + action.amount + " mental trauma");
                            });
                            break;
                        case "physicalTrauma":
                            players = this.getPlayers(action.player);
                            players.forEach(p => {
                                p.physicalTrauma += action.amount;
                                console.log(p.playerName + " gained " + action.amount + " physical trauma");
                            });
                            break;
                        case "cardGain":
                            players = this.getPlayers(action.player);
                            console.log(players);
                            players.forEach(p => {
                                if(!p.additionalCards)
                                    p.additionalCards = [];
                                p.additionalCards.push(action.cardName);
                                console.log(p.playerName + " gained " + action.cardName);
                            });
                            break;
                        default:
                            break;
                    }
                }
                this.campaign.currentScenario = this.scenario.nextScenario;
                this.$store.dispatch('updateCurrentCampaign');
                this.$router.push('/campaigns/current')
            },
            getPlayers(selector) {
                let players = [];
                console.log(this.campaign);
                switch(selector)
                {
                    case "lead":
                        console.log(this.campaign.players.find(p => p.isLead === true));
                        players.push(this.campaign.players.find(p => p.isLead === true));
                        break;
                    case "all":
                        players = this.campaign.players;
                        break;
                    default:
                        break;
                }
                console.log(players);
                return players;
            }
        }
    }
</script>

<style scoped>

</style>