var User   = require("./models/user");
var Investigator   = require("./models/investigator");
var Campaign   = require("./models/campaign");


async function seedDB(){
    await 
    await Comment.deleteMany({});
    await Campground.deleteMany({});
    console.log("Database cleared");

    for(const seed of seeds) {
        let campground = await Campground.create(seed);
        let comment = await Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
        });
        campground.comments.push(comment);
        campground.save();
    }
    console.log("Database seeded");
}

module.exports = seedDB;