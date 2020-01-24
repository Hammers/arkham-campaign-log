import CampaignService from '../../axios/CampaignService'
import router from '../../router';

const state = {
    campaigns: [],
    currentCampaign: null,
};

const mutations = {
    storeCampaigns(state,campaigns){
        state.campaigns = campaigns;
    },
    setCurrentCampaign(state,campaign){
        state.currentCampaign = campaign;
    }
};

const actions = {
    async getCampaigns(context){
        let campaigns = await CampaignService.getCampaigns(context.getters.token);
        context.commit('storeCampaigns',campaigns);
    },
    async updateCurrentCampaign(context) {
        console.log(context.getters.token);
        await CampaignService.updateCampaign(context.getters.token,context.getters.currentCampaign);
    }
};

const getters = {
    campaigns(state) {
        return state.campaigns;
    },
    currentCampaign(state) {
        return state.currentCampaign;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}