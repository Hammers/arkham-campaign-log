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
    
    static insertCampaign(token,name) {
        return axios.post(url + '?secret_token=' + token, {
            name: name,
            cycleID: "NZ",
            currentScenarios: "NZ0"
        });
    }
    
    static deleteCampaign(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default CampaignService