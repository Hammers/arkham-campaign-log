import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
import auth from './modules/auth';
import campaign from "./modules/campaign";

export default new Vuex.Store({
    modules: {
        auth,
        campaign
    }
}); 