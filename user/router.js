const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./model');
const auth = require('../auth/middelware');

const router = new Router();

// '/users'
// email password and password_confirmation
//add user
router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
    }
    if (user.email && user.password && user.password_confirmation) {
        user.password = bcrypt.hashSync(req.body.password, 10)
        //check password
        if (bcrypt.compareSync(user.password_confirmation, user.password)) {
            //make user
            User
                .create(user)
                .then(user => {
                    res
                        .status(201)
                        .send({
                            message: "A NEW USER WAS ADDED",
                            email: user.email,
                            user_id: user.id
                        })
                })
                .catch(error => next(error))
        } else {
            //passwords dont match
            res
                .status(422)
                .send({
                    message: "PLEASE MAKE SURE YOUR PASSWORDS MATCH"
                })
        }
    } else {
        //fill in all fields
        res
            .status(400)
            .send({
                message: "PLEASE FILL IN ALL FIELDS (EMAIL/PASSWORD/PASSWORD_CONFIRMATION"
            })
    }
})

router.get('/users', auth, (req, res, next) => {
    User
        .findAll()
        .then(users => {
            res
                .status(200)
                .send({
                    users: users
                })
        })
        .catch(error => next(error))
})

module.exports = router;