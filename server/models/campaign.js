const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
    name: String,
    cycleID: String,
    currentScenario: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campaign", campaignSchema);