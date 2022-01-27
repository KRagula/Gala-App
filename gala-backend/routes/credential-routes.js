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
        //console.log(err) I HAVE NEVER FUCKINGD ONE THIS BEFORE AND YOU MAKE FUN OF ME
        if (!res) {
            signedUpUser.save()
            .then(data =>{
                response.json({ 'firstname': signedUpUser.firstName , 'lastname': signedUpUser.lastName, 'data':'data'})
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
            //Account does not exist
    }
    //console.log(response2.password)

    bcrypt.compare(request.body.password, response2.password, function(err, res) {
        if (err){
          response.sendStatus(410)
          //Invalid password
        }
        if (res) {
          // Send JWT
          let options = {
            maxAge: 1000 * 60 * 60, // would expire after 15 minutes
          }
    
          var nameCookie = 'firstname=' + response2.firstName + ' HttpOnly'
          var lastNameCookie = 'lastname=' + response2.lastName

          response.cookie('first-name',response2.firstName, options)
          response.cookie('last-name',response2.lastName, options)
          response.json({ 'firstname': response2.firstName , 'lastname': response2.lastName, 'data':'data'})
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