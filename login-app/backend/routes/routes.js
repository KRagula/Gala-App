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
                response.json("valid")
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

router.post('/login', async (request, response) => {

    const response2 = await signUpTemplateCopy.findOne({"email" : request.body.email})
    if (!response2) {

        response.sendStatus(409)
        return;
            //console.log("Logged file\n")
    }
    //console.log(response2.password)

    bcrypt.compare(request.body.password, response2.password, function(err, res) {
        if (err){
          response.sendStatus(409)
        }
        if (res) {
          // Send JWT
          response.json("valid")
        } else {
          // response is OutgoingMessage object that server response http request
          response.sendStatus(401)
        }
      });
      
})

async function hashHelper(password, salt) {
    return await bcrypt.hash(password, salt)
}


module.exports = router