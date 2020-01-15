<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Arkham Companion</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link to="/campaigns" active-class="active" tag="li" class="nav-item"><a class="nav-link">Campaigns</a></router-link>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item" ><a class="nav-link">Log In</a></li>
                <li class="nav-item" ><a class="nav-link">Sign Up</a></li>
                <li class="nav-item" ><a class="nav-link">Log Out</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "",

    }
</script>

<style scoped>

</style>