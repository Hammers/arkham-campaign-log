<template>
    <div class="container">
        <p>{{scenario.text}}</p>
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
                this.$store.dispatch('updateCurrentCampaign');
            }
        }
    }
</script>

<style scoped>

</style>