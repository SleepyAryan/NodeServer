const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post('/', (req, res, next) => {
    console.log(req.body);
//checking if the user already exists in the db
User.find({email: req.body.email})
.exec()
.then(user => {
    if (user.length >= 1){
        //Mail already exists in the database
        return res.status(409).json({
            message: "User already exists in the database"
        });
    } else {
        //Generating a new User
        // to store the user password..I have tried to encode/decrypt it
        //I have used bcrypt
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    id: new mongoose.Types.ObjectId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                });
                user
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        meassage: 'User Created'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })
    }
})
.catch(err => {
    console.log(err);
    res.status(422).json({
        error: err
    })
});
});
module.exports = router;
















