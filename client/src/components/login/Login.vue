<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-s-8 col-m-6">
                <h1>Login</h1>
                <p class="alert alert-danger m-3" v-if="error">{{ error }}</p>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" v-model.lazy="email" placeholder="email@email.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model.lazy="password" placeholder="Password">
                    </div>
                    <button class="btn btn-primary" @click.prevent="onSubmit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                error: "",
            }
        },
        methods: {
            async onSubmit() {
                await this.$store.dispatch('login',{
                    email: this.email,
                    password: this.password
                });
                console.log(this.$store.getters.token);
                if(this.$store.getters.token) {
                    await this.$router.push('/campaigns');
                }
                else {
                    this.error = "Oops, something went wrong :-/"
                }
            }
        }
    }
</script>

<style scoped>

</style>