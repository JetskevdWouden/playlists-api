const { Router } = require('express');
const { toJWT } = require('./jwt');
const bcrypt = require('bcrypt');
const User = require('../user/model');

const router = new Router();

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

module.exports = router;