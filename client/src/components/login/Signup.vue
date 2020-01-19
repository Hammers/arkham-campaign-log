<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-s-8 col-m-6">
                <h1>Signup</h1>
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
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('signup',{
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>