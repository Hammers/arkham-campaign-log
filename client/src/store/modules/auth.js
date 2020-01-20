import AuthService from '../../axios/AuthService'
import router from '../../router';

const state = {
    token: null,
    user: null,
};

const mutations = {
    authUser(state, userData) {
        state.token = userData.token;
        state.user = userData.user;
    },
    clearAuthData(state) {
        state.token = null;
        state.user = null;
    }
};

let storeLocalToken = function(token,user)
{
    localStorage.setItem("ARK_COM_TOKEN",token);
    let now = new Date();
    let exp = new Date(now.getTime() + 3600000);
    console.log(token);
    console.log(exp);
    localStorage.setItem("ARK_COM_TOKEN",token);
    localStorage.setItem("ARK_COM_EXP",exp);
    localStorage.setItem("ARK_COM_USER",user);
};

const actions = {
    async signup({commit}, authData) {
        await AuthService.signup(authData)
            .then(res => {
                commit('authUser',{
                token: res.token,
                user: res.user
                });
                storeLocalToken(res.token,res.user);
            })
            .catch(err => console.log(err))
    },
    async login({commit}, authData) {
        await AuthService.login(authData)
                .then(res => {
                    commit('authUser',{
                    token: res.token,
                    user: res.user,
                });
                storeLocalToken(res.token,res.user);
            })
            .catch(err => console.log(err))
    },
    logout({commit}) {
        commit('clearAuthData');
        localStorage.removeItem("ARK_COM_TOKEN");
        localStorage.removeItem("ARK_COM_EXP");
        localStorage.removeItem("ARK_COM_USER");
        router.replace('/login');
    },
    tryAutoLogin({commit}) {
        const token = localStorage.getItem("ARK_COM_TOKEN");
        if (!token) {
            return;
        }
        const expDate = localStorage.getItem("ARK_COM_EXP");
        const now = new Date();
        if(now >= expDate) {
            return;
        }
        const user = localStorage.getItem("ARK_COM_USER");
        commit('authUser', {
            token,
            user
        })
    }
};

const getters = {
    token(state) {
        return state.token;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}