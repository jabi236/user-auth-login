//password verification
// login user

const express = require('express');
const { v4: uuidv4 } = require('uuid');
//uuidv4();
const { signInUser } = require('../models/User');
const { signUpUser } = require('../models/User');
const { updateUser } = require('../models/User');
const { isLoggedIn} = require('../models/User');
const { currUser} = require('../models/User');



const router = new express.Router();
let user_id ='';
//login page
router.route('/login')
    .get((req,res)=>{
        res.render('login', {
            /*alert:{
                type: 'danger',
                title:'Error',
                message: 'Something horrible happend'
            }
            */

        })
    })
    .post((req,res)=>{
        console.log("body: %j",req.body);
        result ='';
       
        user_id = signInUser("body: %j",req.body);
        
        if(user_id == "no"){
            res.render('login', {
            alert:{
                type: 'danger',
                title:'Error',
                message: 'Incorrect Username and/or Password!'
            }
        }) 
            
        }
        else{
           console.log("found user: ", user_id)
            res.redirect('/'+user_id)
        }
        
    })

// new user page
router.route('/new')
    .get((req,res)=>{
        res.render('new', {

        })
    })
    .post((req,res)=>{
        console.log("body: %j",req.body);
        result = '';
        result =signUpUser("body: %j",req.body);
        if(result == "error1"){
            res.render('new', {
                alert:{
                    type: 'danger',
                    title:'Error',
                    message: 'Passwords do not match!'
                }
            })
        }
        if(result == "error2"){
            res.render('new', {
                alert:{
                    type: 'danger',
                    title:'Error',
                    message: 'Username already being Used!'
                }
            })
        }
        if(result == "error3"){
            res.render('new', {
                alert:{
                    type: 'danger',
                    title:'Error',
                    message: 'Email already being Used!'
                }
            })
        }
        if(result == "success"){
            res.redirect('/login')
        }
    })

// account page
router.route('/:userID')
    .get((req,res)=>{
        result = '';
        /*
        app.get('users/:user_id', (req,res)=>{
            console.log(req.parms.user_id);
        })
        */
        //req.parms.user_id
        
        result = isLoggedIn(req.params.userID);
        acc = currUser(req.params.userID);
        //console.log(acc)
        //console.log(user);
        //console.log(result);
        if(result == "found"){
           res.render('edit', {
                
                user:{
                    userID: acc.userID,
                    username: acc.username,
                    email: acc.email, 
                    password: acc.password, 
                    phone: acc.phone
                }
                //console.log(user)
            }) 
        }

        if(result == "not found"){
            res.render('404',{
            alert:{
                type:'warning',
                title: '404 Page Not Found',
                message: 'User not found?'
        }
        
        })
        }
        
    })
    .post((req,res)=>{
        console.log("body: %j",req.body);
        result = updateUser("body: %j",req.body);
        acc = currUser(req.params.userID);
        console.log(acc)
        if(result == "updated"){
            res.render('edit', {
                user:{
                    userID: acc.userID,
                    username: acc.username,
                    email: acc.email, 
                    password: acc.password, 
                    phone: acc.phone
                },
                alert:{
                    type:'success',
                    title: 'Success!',
                    message: 'User info updated!'
                }
                
            }) 

        }
        //TODO
    })


/*router.use((req, res)=>{
    res.render('404',{
        alert:{
            type:'warning',
            title: '404 Page Not Found',
            message: 'wut?'
        }
        })
    })
    .post((req,res)=>{
        //TODO
    })
*/

module.exports = router;