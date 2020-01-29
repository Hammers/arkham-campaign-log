const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");

router.get("/", (req, res, next) => {
    Campaign.find({ownerId: req.user._id},(err, campaigns) =>{
        if(err) {
            return next(err);
        }
        res.json(campaigns);
    });
});

router.get("/:id", (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) =>{
        if(err) {
            return next(err);
        }
        if(campaign.ownerId !== req.user._id)
        {
            return next("Unauthorized Access");
        }
        res.json(campaign);
    });
});

router.post("/", (req, res, next) => {
    let campaign = req.body;
    campaign.ownerId = req.user._id;
    console.log('INSERT:');
    console.log(campaign);
    Campaign.create(campaign, (err, newCampaign) =>{
        if(err) {
            return next(err);
        }
        res.json(newCampaign);
    });
});

router.put("/:id", (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) =>{
        if(err) {
            return next(err);
        }
        
        if(campaign.ownerId.toString() !== req.user._id.toString())
        {
            return next("Unauthorized Access");
        }
        console.log('UPDATE:');
        console.log(campaign);
        Campaign.update({_id: req.params.id}, req.body, (err, campaign) =>{
            if(err) {
                return next(err);
            }
            res.json(campaign);
        });
    });
    
});

router.delete("/:id", (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) =>{
        if(err) {
            return next(err);
        }
        if(campaign.ownerId.toString() !== req.user._id.toString())
        {
            return next("Unauthorized Access");
        }
        console.log("DELETE:");
        console.log(campaign);
        Campaign.findByIdAndDelete(req.params.id, (err) =>{
            if(err) {
                return next(err);
            }
            res.json();
        });
    });
    
});

module.exports = router;