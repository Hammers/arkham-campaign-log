<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Arkham Companion</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link to="/campaigns" active-class="active" tag="li" class="nav-item"><a class="nav-link">Campaigns</a></router-link>
            </ul>
            <ul class="navbar-nav">
                <router-link v-if="!token" to="/login" active-class="active" tag="li" class="nav-item"><a class="nav-link">Log In</a></router-link>
                <router-link v-if="!token" to="/signup" active-class="active" tag="li" class="nav-item"><a class="nav-link">Signup</a></router-link>
                <li v-if="token" @click="logout" class="nav-item"><a class="nav-link">Log Out</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "",
        computed: {
            token() {
                return this.$store.getters.token;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>

<style scoped>

</style>