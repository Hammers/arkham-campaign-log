const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
    try {
        if(!req.user){
            const error = new Error('An Error occured')
            return next(error);
        }
        req.login(req.user, { session : false }, async (error) => {
            if( error ) return next(error)
            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email and id
            const body = { _id : req.user._id, email : req.user.email };
            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({ user : body },'top_secret',{expiresIn: 3600});
            //Send back the token to the user
            return res.json({ token, user: body });
        });     } catch (error) {
        return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
            const error = new Error('An Error occured')
            return next(error);
        }
        req.login(user, { session : false }, async (error) => {
            if( error ) return next(error)
            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email and id
            const body = { _id : user._id, email : user.email };
            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({ user : body },'top_secret',{expiresIn: 3600});
            //Send back the token to the user
            return res.json({ token, user: body });
        });     } catch (error) {
        return next(error);
    }
    })(req, res, next);
});

module.exports = router;