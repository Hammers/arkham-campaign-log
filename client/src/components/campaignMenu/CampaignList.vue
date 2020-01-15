<template>
  <div class="card">
    <CampaignNewModal v-if="showNewModal" @close="showNewModal=false"></CampaignNewModal>
    <div class="card-header">
    <h1>Campaigns</h1>
    </div>
    <div class="card-body">
      <div class="create-campaign">
        <button @click="showNewModal = true" class="btn btn-primary">Start New Campaign</button>
      </div>
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
  
  p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  
  
</style>
