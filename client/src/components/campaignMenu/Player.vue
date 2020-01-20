<template>
    <div class="card col-5 my-2">
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="investigatorSelect">Investigator</label>
                    <select class="form-control" id="investigatorSelect" v-model="investigator">
                        <option v-for="i in investigators" :value="i" :key="i.id">{{i.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="playerName">Player Name</label>
                    <input type="text" class="form-control" id="playerName" v-model.lazy="playerName">
                </div>
                <div v-if="investigator">
                    <p>Willpower: {{investigator.willpower}}, Intellect: {{investigator.intellect}}, Fight: {{investigator.fight}}, Agility: {{investigator.agility}}</p>
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
        data() {
            return {
                investigators,
                investigator: null,
                playerName: ''
            }
        },
        watch: {
            playerName: function (newName,oldName) {
                this.$emit('changed',{investigator: this.investigator,player:this.playerName});
            },
            investigator: function (newInvestigator,oldInvestigator) {
                this.$emit('changed',{investigator: this.investigator,player:this.playerName});
            }
        },
        methods: {
            remove(){
                this.$emit('remove');
            },
        }
    }
</script>

<style scoped>

</style>