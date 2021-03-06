const { clientAuthentication, auth, checkRequirements } = require('../helpers/helper');
const bcrypt = require('bcrypt');
const { registerDB, logoutDB, updateTokenDB, findUserByUsernameDB } = require('../models/auth_db');
const { throws } = require('assert');
const { loginFailedResponse, requirementsFailedResponse } = require('../views/json_responses/auth_response');
const { successWithMessageAndResultResponse, clientAuthFailedResponse, successWithMessageResponse, failedWithMessageResponse } = require('../views/json_responses/response');
module.exports = {
    loginController : (req, res) =>{
        console.log(auth(req))
        require('crypto').randomBytes(48, function(err, buffer) {
            const token = buffer.toString('hex');
            
            if(clientAuthentication(req)){
                findUserByUsernameDB(auth(req).username).then(data =>{
                    if (data.rows.length == 0) {
                        res.send(loginFailedResponse)
                    }else{
                        bcrypt.compare(auth(req).password, data.rows[0].password, function(err, result) {
                            if (result){
                                updateTokenDB(auth(req).username, token).then(()=>{
                                    const user = data.rows[0]
                                    user.token = token
                                    res.send(successWithMessageAndResultResponse("successfully logged-in", user))
                                })
                            }else{
                                res.send(loginFailedResponse)
                            }
                        });
                        
                        

                    }

                })
            }else{
                res.send(clientAuthFailedResponse)
            }
        });
    },
    registerController : (req, res) => {
        
        if(clientAuthentication(req)){
            bcrypt.genSalt(10, function(err, salt) {
                const data = auth(req)
                bcrypt.hash(data.password, salt, function(err, hash) {

                    if (checkRequirements(data)[0]) {
                        registerDB({...data, password: hash}).then((result)=>{
                            if (result == null) {
                                res.send(successWithMessageResponse("successfully registered an account"))
                            }else{ 
                                if (result.detail && result.detail.search("already exists.")){
                                    res.send(failedWithMessageResponse(400,"username is not available"))
                                }else{
                                    res.send(failedWithMessageResponse(400,result))
                                }
                                
                            }
                            
                        })
                        
                    } else{
                        res.send(failedWithMessageResponse(400,checkRequirements(data)[1]))
                    }
                    
                    
                });
            });
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    logoutController : (req, res) => {
        if(clientAuthentication(req)){
            logoutDB(auth(req).token).then((data)=>{
                if (data.rowCount > 0){
                    res.send(successWithMessageResponse("successfully logged-out"))
                }else{
                    res.send(failedWithMessageResponse(400, "session not found or user has already logged out"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    }
}

