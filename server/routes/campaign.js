const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");

router.get("/", (req, res, next) => {
    Campaign.find((err, campaigns) =>{
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
        res.json(campaign);
    });
});

router.post("/", (req, res, next) => {
    Campaign.create(req.body, (err, campaign) =>{
        if(err) {
            return next(err);
        }
        res.json(campaign);
    });
});

router.put("/", (req, res, next) => {
    Campaign.findByIdAndUpdate(req.params.id, req.body, (err, campaign) =>{
        if(err) {
            return next(err);
        }
        res.json(campaign);
    });
});

router.delete("/:id", (req, res, next) => {
    Campaign.findByIdAndDelete(req.params.id, (err) =>{
        if(err) {
            return next(err);
        }
        res.json();
    });
});

module.exports = router;