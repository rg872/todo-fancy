<template>
  <div class="container">
      <h1>User</h1>
      <br>
      <div class="row">
        <div class="col-md-6" id="loginCol">
          <h1>Log In</h1>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="emaillogin" v-model="email_login" aria-describedby="emailHelp" placeholder="Enter email" value="">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="passwordlogin" v-model="password_login" placeholder="Enter Password" value="">
              </div>
              <div class="d-flex flex-sm-column">
                <button style="width:fit-content;" class="btn btn-primary" v-on:click="login">Login</button>
              </div>
              
        </div>


        <div class="col-md-6" id="registerCol">
          <h1>Register</h1>
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter Full Name" value="">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email_register" aria-describedby="emailHelp" placeholder="Enter email" value="">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label><span v-if="password_confirm !== password_register" style="color:red; "> insert the same password below</span>
              <input type="password" class="form-control" id="password" v-model="password_register" placeholder="Enter Password" value="">
              <br>
              <input type="password" class="form-control" id="confirmPassword" v-model="password_confirm" placeholder="Enter Password Again" value="">
            </div>

            <button class="btn btn-primary" v-on:click="register">Register</button>
        </div>
      </div>  
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'register',
    data: function(){
        return{
            name:'',
            email_register:'',
            password_register:'',
            password_confirm:'',
            email_login:'',
            password_login:''
        }
    },
    methods: {
        register: function(){
            
            let user = {
                name: this.name,
                email: this.email_register,
                password: this.password_register
            }

            this.$store.dispatch('signUp' , user)
            .then(()=>{
                let _this = this
                setTimeout(function(){ 
                    _this.$router.push('/')
                }, 500);
                
                
            })
      },

      login: function(){

        let user = {
            email: this.email_login,
            password: this.password_login
        }
        
        this.$store.dispatch('signIn' , user)
        .then(()=>{
            let _this = this
            setTimeout(function(){ 
                _this.$router.push('/')
            }, 500);  
        })
      }
    },
    
    beforeCreate: function () {
        this.$store.dispatch('seedEnemy')
    }
}
</script>

<style>
    #registerCol{
        text-align: left;
    }

    #loginCol{
      text-align: left;
    }
</style>
