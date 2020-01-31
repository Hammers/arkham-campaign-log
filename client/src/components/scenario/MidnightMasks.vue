<template>
    <div class="my-2">
        <p><strong>Cultists in the Victory Display:</strong></p>
        <form>
            <div class="form-group form-check my-1" v-for="(cultist,index) in this.cultists" :key="cultist">
                <input type="checkbox" class="form-check-input" :id="'cultist' + index" @change="cultistToggled(cultist,$event)">
                <label class="form-check-label" :for="'cultist' + index">{{cultist}}</label>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ["actionList"],
        data() {
            return {
                cultists: ['"Wolf-Man" Drew','Herman Collins','Peter Warren','Victoria Devereux','Ruth Turner','The Masked Hunter'],
            }
        },
        created() {
            this.cultists.forEach(cultist => {
                var action = {
                    type: "logEntry",
                    entry: cultist,
                    log: 2,
                };
                this.actionList.push(action)
            })
        },
        methods: {
            cultistToggled(cultist, event) {
                var action = this.actionList.find(x => x.entry === cultist);
                action.log = event.target.checked ? 1 : 2;
            }
        }
    }
</script>

<style scoped>

</style>