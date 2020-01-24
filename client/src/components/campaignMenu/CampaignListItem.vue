<template>
    <div class="card my-2" >

        <div class="card-body">
            
            <h4 class="text d-flex justify-content-between"> <span>{{campaign.name}}</span><span>{{cycle.title}}</span> </h4>
            <div class="d-flex justify-content-between">
                <span>Last updated: {{ `${campaign.updatedAt.getDate()}/${campaign.updatedAt.getMonth()+1}/${campaign.updatedAt.getFullYear()}`}}</span>
                <span>{{campaign.difficulty}}</span>
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-danger" @click="deleteCampaign">Delete</button>
                <button class="btn btn-primary" @click="selectCampaign">Start</button>
            </div>
        </div>
    </div>
</template>

<script>
    import cycles from '../../json/cycles.json'
    import CampaignService from "../../axios/CampaignService";
    
    export default {
        name: "CampaignListItem",
        props: ["campaign"],
        data() {
            return {
                cycles,
            }
        },
        computed: {
            cycle() {
                return this.cycles.find(x => x.id === this.campaign.cycleID);
            }
        },
        methods: {
            selectCampaign() {
                this.$store.commit('setCurrentCampaign',this.campaign);
                this.$router.push("/campaigns/current");
            },
            async deleteCampaign() {
                await CampaignService.deleteCampaign(this.$store.getters.token,this.campaign._id);
                await this.$store.dispatch('getCampaigns');
            }
        }
    }
</script>

<style scoped>

</style>