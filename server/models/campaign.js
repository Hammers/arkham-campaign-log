const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
    ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    name: String,
    cycleID: String,
    currentScenario: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campaign", campaignSchema);