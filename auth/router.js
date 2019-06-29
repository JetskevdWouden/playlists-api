const { Router } = require('express');
const { toJWT, toData } = require('./jwt');
const bcrypt = require('bcrypt');
const User = require('../user/model');
const auth = require('./middelware');

const router = new Router();

//user sign-in '/tokens'
router.post('/tokens', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if(email && password) {
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(entity => {
                if(!entity) {
                    res
                        .status(400)
                        .send({
                            message: "USER OR PASSWORD IS INCORRECT"
                        })
                }
                if(bcrypt.compareSync(password, entity.password)) {
                    res
                        .send({
                            message: "HERE IS YOUR TOKEN",
                            jwt: toJWT({userId: entity.id})
                        })
                } else {
                    res
                        .status(400)
                        .send({
                            message: "PASSWORD IS INCORRECT"
                        })
                }
            })
            .catch(error => {
                console.error(error)
                res
                    .status(500)
                    .send({
                        message: "SOMETHING WENT WRONG"
                    })
            })
    } else {
        res
            .status(400)
            .send({
                message: "PLEASE SUPPLY VALID EMAIL AND PASSWORD"
            })
    }
})

router.get('/test', auth, (req,res) => {
    res
        .send({
            message: `THANKS FOR VISITING THE TEST ENDPOINT ${req.user.email}`
        })
})

module.exports = router;