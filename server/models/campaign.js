const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String,
        cycleID: String,
        difficulty: String,
        chaosBag: [String],
        currentScenario: String,
        players: [{
            investigatorID: String,
            playerName: String,
            totalXp: Number,
            spentXp: Number,
            physicalTrauma: Number,
            mentalTrauma: Number,
            weaknesses: [String],
            additionalCards: [String]
        }],
        log: [String]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campaign", campaignSchema);