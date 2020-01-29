const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    investigatorID: String,
    playerName: String,
    isLead: Boolean,
    totalXp: Number,
    spentXp: Number,
    physicalTrauma: Number,
    mentalTrauma: Number,
    weaknesses: [String],
    additionalCards: [String]
});

module.exports = mongoose.model("Player", playerSchema);