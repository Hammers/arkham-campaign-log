<template>
    <div class="container">
        <span v-html="scenario.text"></span>
        <div>
            <button class="btn btn-primary btn-large" @click="nextScenario">Continue</button>
        </div>
    </div>
</template>

<script>
    import scenarios from '../../json/scenarios';
    
    export default {
        name: "",
        computed: {
            campaign() {
                return this.$store.getters.currentCampaign;
            },
            scenario() {
                return scenarios[this.campaign.cycleID][this.campaign.currentScenario];
            }
        },
        methods: {
            nextScenario() {
                this.campaign.currentScenario = this.scenario.nextScenario;
                console.log(this.campaign);
                this.$store.dispatch('updateCurrentCampaign');
            }
        }
    }
</script>

<style scoped>

</style>