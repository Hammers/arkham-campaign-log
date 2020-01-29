<template>
    <div class="card w-100">
        <div class="card-body">
            <h3 class="text d-flex justify-content-between">
                <span>{{this.player.playerName}}</span>
                <span>{{investigator.name}}</span>
            </h3>
            <div class="row my-1 justify-content-center">
                <span class="col-2">XP:</span>
                <div class="col-6 align-self-center">
                    <div class="progress position-relative">
                        <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: xpPercent + '%'}" :aria-valuenow="xpPercent" aria-valuemin="0" aria-valuemax="100"></div>
                        <small class="justify-content-center d-flex position-absolute w-100">{{this.player.spentXp}} / {{this.player.totalXp}}</small>
                    </div>
                </div>
            </div>
            <div class="row justify-content-around my-1">
                <span>Physical Trauma: {{player.physicalTrauma}}</span>
                <span>Mental Trauma: {{player.mentalTrauma}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import investigators from '../../json/investigators'
    export default {
        name: "",
        props: ["player"],
        computed: {
            investigator() {
                return investigators.find(x => x.id === this.player.investigatorID);
            },
            xpPercent() {
                return (this.player.spentXp / this.player.totalXp) * 100;
            }
        }
    }
</script>

<style scoped>

</style>