<template>
    <div class="card col-5 my-2">
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="investigatorSelect">Investigator</label>
                    <select class="form-control" id="investigatorSelect" v-model="playerData.investigatorID">
                        <option v-for="i in investigators" :value="i.id" :key="i.id">{{i.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="playerName">Player Name</label>
                    <input type="text" class="form-control" id="playerName" v-model.lazy="playerData.playerName">
                </div>
                <div class="form-group">
                    <label for="lead">Lead Investigator</label>
                    <input type="radio" class="form-control" id="lead" @change="changedLead" :value="true" v-model="playerData.isLead">
                </div>
                <div class="mt-3 d-flex justify-content-between">
                    <button class="btn btn-danger" @click.prevent="remove">Remove</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import investigators from '../../json/investigators'
    export default {
        name: "",
        props: ["playerData"],
        data () {
            return {
                investigators
            }
        },
        methods: {
            remove(){
                this.$emit('remove');
            },
            changedLead(){
                this.$emit('changedLead');
            }
        }
    }
</script>

<style scoped>

</style>