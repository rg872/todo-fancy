const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const decode = require('../helpers/decode-password');
const decodeJwt = require('../helpers/decode-jwt')

module.exports = {
    signInFb : function(req, res){
          let logged_user =
          {
            email: req.body.email,
            name: req.body.name,
            password: null,
            exp: 0,
            lvl: 1,
            hp: 50,
            atk: 10,
            title: 'Noob'
          }
    
          User.findOne({ email: logged_user.email })
          .then((user)=>{
            let token = jwt.sign({ email: logged_user.email, name: logged_user.name }, process.env.SECRET);
            if(user){
              res.status(200).json({
                message:'Login succeed',
                token : token,
                status: 'login',
                user: user
              });
            } else {
              User.create(logged_user).
              then((user)=>{
                res.status(200).json({
                  message:'User is registered',
                  token : token,
                  status: 'register',
                  user: user
                });
              })
            }
    
          })
          .catch((err)=>{
            res.status(500).json({
              message:'Server error',
              err: err
            });
          });
      },

    signUp: function(req , res){
        let new_user =
        { 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            exp: 0,
            lvl: 1,
            hp: 50,
            atk: 10,
            title: 'Noob',  
            todo: []
        }
        // res.status(200).send('yes')
        User.create(new_user).
        then((user)=>{
          
            let token = jwt.sign({ email: user.email }, process.env.SECRET);
            res.status(200).json({
                message:'User successfuly registered',
                token: token,
                user: user
            });
        })
        .catch((err)=>{
            if(err.code === 11000){
                res.status(400).json({
                    message:'Please Use another email'
                });
            }else{
                res.status(500).json({
                    message:'Server error'
                });
            }            
        });
    },
    
    signIn: function(req, res){
        let logged_user =
          {
            email: req.body.email,
            password: req.body.password
          }

          User.findOne({ email: logged_user.email})
          .then((user)=>{ 
                
            if(decode.verify(logged_user.password, user.password)){

              let token = jwt.sign({ email: user.email }, process.env.SECRET);

              res.status(200).json({
                message:'Succeed login',
                token : token,
                status: 'success',
                user: user
              });
            } else {
              res.status(400).json({
                message:'Email/password is invalid',
                status: 'fail'
              });
            }
    
          })
          .catch((err)=>{
            res.status(500).json({
              message:'Server error',
              err: err
            });
          });
      },

      getUser: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;
    
          User.findOne({ email: email})
          .then((user)=>{  

            res.status(200).json({
              message:'Succeed get user data',
              user: user
            });   

          })
          .catch((err)=>{

            res.status(500).json({
              message:'Server error',
              err: err
            });

          });
      },

      updateTitle: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;

        User.findByIdAndUpdate(req.body.id, {title: req.body.title})
        .then((user)=>{
            res.status(200).json({
                message: 'success change title'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },
}
