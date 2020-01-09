<template>
    <div class="campaign-list-item">
        <div class="updated-at">
            Last updated: {{ `${campaign.updatedAt.getDate()}/${campaign.updatedAt.getMonth()+1}/${campaign.updatedAt.getFullYear()}`}}
        </div>
        <p class="text"> {{campaign.name}} </p>
    </div>
</template>

<script>
    export default {
        name: "CampaignListItem",
        props: ["campaign"]
    }
</script>

<style scoped>
    div.campaign-list-item {
        position:relative;
        border: 1px solid #5bd658;
        background-color: #bcffb8;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.updated-at {
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 15px 5px 15px;
        background-color: darkgreen;
        color: white;
        font-size: 13px;
    }

    p.text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
</style>