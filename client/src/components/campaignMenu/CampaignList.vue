<template>
  <div class="container">
    <CampaignNewModal v-if="showNewModal" @close="showNewModal=false">
      
    </CampaignNewModal>
    <h1>Campaigns</h1>
    <div class="create-campaign">
      <button @click="showNewModal = true">Start New Campaign</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="campaigns-container">
      <CampaignListItem
           v-for="(campaign, index) in campaigns"
           v-bind:campaign="campaign"
           v-bind:index="index"
           v-bind:key="campaign._id"
      >
      </CampaignListItem>
    </div>
  </div>
</template>

<script>
import CampaignService from "../../CampaignService";
import CampaignListItem from "./CampaignListItem";
import CampaignNewModal from "./CampaignNewModal";

export default {
  name: 'CampaignList',
  components: {CampaignNewModal, CampaignListItem},
  data() {
    return {
      campaigns: [],
      error: '',
      name: '',
      showNewModal: false,
    }
  },
  async created() {
    try {
      this.campaigns = await CampaignService.getCampaigns();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createCampaign() {
      await CampaignService.insertCampaign(this.name);
      this.campaigns = await CampaignService.getCampaigns();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  
  
</style>
