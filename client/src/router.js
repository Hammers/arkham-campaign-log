import Home from "./components/Home";
import CampaignList from "./components/campaignMenu/CampaignList";
import CampaignNew from "./components/campaignMenu/CampaignNew";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import store from "./store/store";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
let isLoggedIn = (to, from, next) => {
    if(store.getters.token) {
        next();
    } else {
        next('/login');
    }
};

const routes = [
    { path: '/', component: Home },
    { path: '/campaigns', component: CampaignList, beforeEnter(to,from,next){isLoggedIn(to,from,next)}},
    { path: '/campaigns/new', component: CampaignNew, beforeEnter(to,from,next){isLoggedIn(to,from,next)}},
    { path: '/login', component: Login, beforeEnter(to,from,next){
            if(!store.getters.token) {
                next();
            } else {
                next('/campaigns');
            }
        } },
    { path: '/signup', component: Signup, beforeEnter(to,from,next){
            if(!store.getters.token) {
                next();
            } else {
                next('/campaigns');
            }
        }  },
    
];

export default new VueRouter({
    mode: 'history',
    routes
});