const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt')


router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:securePassword,
        salt:saltPassword
    })

    signUpTemplateCopy.findOne({"email" : request.body.email}, function(err, res){
        //console.log(res)
        //console.log(err)
        if (!res) {
            signedUpUser.save()
            .then(data =>{
                response.json(data)
            })
            .catch(error=>{
                response.json(error)
                //console.log(error)
            })

            //console.log("Logged file\n")
        } else {
            //console.log("error found file\n")
            response.sendStatus(409)
        }
    })
})




module.exports = router