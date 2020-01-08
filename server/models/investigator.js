const mongoose = require("mongoose");

const investigatorSchema = mongoose.Schema({
    name: String,
    health: Number,
    sanity: Number,
    totalXp: Number,
    spentXp: Number,
    physicalTrauma: Number,
    mentalTrauma: Number,
});

module.exports = mongoose.model("Investigator", investigatorSchema);