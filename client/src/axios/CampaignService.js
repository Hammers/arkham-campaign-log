import axios from "axios";

const url = "http://localhost:3000/api/campaigns/";

class CampaignService {
    static getCampaigns(token) {
        return new Promise(async (resolve, reject) =>{
            try {
                const res = await axios.get(url + '?secret_token=' + token);
                const data = res.data;
                resolve(
                    data.map(campaign => ({
                        ...campaign,
                        updatedAt: new Date(campaign.updatedAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }
    
    static insertCampaign(token,campaign) {
        return axios.post(url + '?secret_token=' + token, campaign);
    }
    
    static deleteCampaign(token,id) {
        return axios.delete(`${url}${id}?secret_token=${token}`);
    }
    
    static updateCampaign(token, campaign) {
        console.log(campaign);
        return axios.put(`${url}${campaign._id}?secret_token=${token}`, campaign)
    }
}

export default CampaignService