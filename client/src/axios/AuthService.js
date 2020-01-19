import axios from "axios";

const url = "http://localhost:3000/api/auth/";

class CampaignService {
    static signup(user) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.post(url + 'signup',{
                    email: user.email,
                    password: user.password
                });
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static login(user) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.post(url + 'login',{
                    email: user.email,
                    password: user.password
                });
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

}

export default CampaignService