<template>
    <div class="conatainer">
        <div class="card">
            <div class="card-header">
                <h3>{{scenario.name}}</h3>
            </div>
            <div class="card-body">
                <component :is="scenario.view"></component>
            </div>
            
        </div>
    </div>
</template>

<script>
    import Prologue from "./Prologue";
    import StandardScenario from "./StandardScenario";
    import scenarios from '../../json/scenarios';
    
    export default {
        name: "",
        components: {
            Prologue,
            StandardScenario
        },
        computed: {
            campaign() {
                return this.$store.getters.currentCampaign;
            },
            scenario() {
                return scenarios[this.campaign.cycleID][this.campaign.currentScenario];
            }
        }
    }
</script>

<style scoped>

</style>