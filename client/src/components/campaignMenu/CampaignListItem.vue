<template>
    <div class="card my-2">

        <div class="card-body">
            <h4 class="text"> {{campaign.name}} </h4>
            <div class="updated-at">
                Last updated: {{ `${campaign.updatedAt.getDate()}/${campaign.updatedAt.getMonth()+1}/${campaign.updatedAt.getFullYear()}`}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CampaignListItem",
        props: ["campaign"]
    }
</script>

<style scoped>

</style>