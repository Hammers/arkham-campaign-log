<template>
  <div class="container">
    <h1>Campaigns</h1>
    <div class="create-campaign">
      <label for="create-campaign">Start a new Campaign</label>
      <input type="text" id="create-campaign" v-model="name" placeholder="Campaign Name">
      <button v-on:click="createCampaign">Start!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="campaigns-container">
      <div class="campaign"
      v-for="(campaign, index) in campaigns"
      v-bind:item="campaign"
      v-bind:index="index"
      v-bind:key="campaign._id"
      >
        <div class="updated-at">
          {{ `${campaign.updatedAt.getDate()}/${campaign.updatedAt.getMonth()}/${campaign.updatedAt.getFullYear()}`}}
        </div>
        <p class="text"> {{campaign.name}} </p>
      </div>
    </div>
  </div>
</template>

<script>
import CampaignService from "../CampaignService";

export default {
  name: 'CampaignComponent',
  data() {
    return {
      campaigns: [],
      error: '',
      name: ''
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
  
  div.campaign {
    position:relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }
  
  div.updated-at {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }
  
  p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>
