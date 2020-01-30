<template>
    <div class="container">
        <h2 class="text-center">Setup</h2>
        <span v-html="scenario.intro"></span>
        <hr>
        <span v-html="scenario.setup"></span>
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
            }
        },
    }
</script>

<style scoped>

</style>