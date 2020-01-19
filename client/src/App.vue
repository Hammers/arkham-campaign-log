<template>
  <div class="container mt-3">
    <Header></Header>
    <div class="row mt-4">
      <div class="col-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'app',
  components: {
    Header
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
