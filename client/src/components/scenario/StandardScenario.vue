<template>
    <div class="container">
        <h2 class="text-center">Setup</h2>
        <div v-for="(intro,index) in this.intros" :key="index">
            <p>{{intro}}</p>
        </div>
        <hr>
        <ul>
            <div v-for="(item,index) in this.setup" :key="index">
                <li>{{item}}</li>
            </div>
        </ul>
        <div class="d-flex justify-content-center" v-if="!showResolution">
            <button class="btn btn-large btn-primary" @click="showResolution = true">Resolution</button>
        </div>
        <component :is="scenario.resolutionView" v-if="showResolution"></component>
    </div>
</template>

<script>
    import scenarios from '../../json/scenarios';
    import StandardResolution from "./StandardResolution";

    export default {
        name: "",
        components: {
            StandardResolution
        },
        data() {
            return {
                showResolution: false,
            }
        },
        computed: {
            campaign() {
                return this.$store.getters.currentCampaign;
            },
            scenario() {
                return scenarios[this.campaign.cycleID][this.campaign.currentScenario];
            },
            intros() {
                return this.getTextList(this.scenario.intro);
            },
            setup() {
                return this.getTextList(this.scenario.setup);
            }
        },
        methods: {
            getTextList(entries) {
                let textList = [];
                for (var i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    if('logNeeded' in entry) {
                        if(!this.$store.getters.basicLogIds.includes(entry.logNeeded)) {
                            continue;
                        }
                    }

                    if('logMissing' in entry) {
                        if(this.$store.getters.basicLogIds.includes(entry.logMissing)) {
                            continue;
                        }
                    }

                    if('playersNeeded' in entry) {
                        if(this.campaign.players.length !== entry.playersNeeded) {
                            continue;
                        }
                    }

                    if('entryCount' in entry) {
                        if(this.campaign.log[entry.log].entries.length !== entry.entryCount) {
                            continue;
                        }
                    }
                    
                    textList.push(entry.text);
                }
                return textList;
            }
        }
    }
</script>

<style scoped>

</style>