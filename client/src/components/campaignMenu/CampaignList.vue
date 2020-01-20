<template>
  <div class="card">
    <div class="card-header">
    <h1>Campaigns</h1>
    </div>
    <div class="card-body">
      <p class="alert alert-danger m-3" v-if="error">{{ error }}</p>
      <div class="campaigns-container" v-if="!error">
        <div class="create-campaign">
          <button @click="newCampaign" class="btn btn-primary">Start New Campaign</button>
        </div>
        <CampaignListItem
             v-for="(campaign, index) in campaigns"
             v-bind:campaign="campaign"
             v-bind:index="index"
             v-bind:key="campaign._id"
        >
        </CampaignListItem>
      </div>
    </div>
  </div>
</template>

<script>
import CampaignService from "../../axios/CampaignService";
import CampaignListItem from "./CampaignListItem";

export default {
  name: 'CampaignList',
  components: {CampaignListItem},
  data() {
    return {
      campaigns: [],
      error: '',
      name: '',
    }
  },
  async created() {
    try {
      this.campaigns = await CampaignService.getCampaigns(this.$store.getters.token);
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    newCampaign() {
      this.$router.push('/campaigns/new');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  
</style>
