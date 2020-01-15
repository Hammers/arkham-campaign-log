const express       = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    cors            = require("cors")

const campaignRoutes = require("./routes/campaign");
const authRoutes = require("./routes/login");
require('./auth/auth');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/arkham");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/campaigns", passport.authenticate('jwt', {session: false}), campaignRoutes);
app.set("view engine", "http");

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err);

    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
});

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`The arkham-campaign-log server is listening on port ${port}`);
});