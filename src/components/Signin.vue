<template>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login To EMS</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form autocomplete="off">
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  label="Username"
                  type="text"
                  autofocus="true"
                  v-model="username"
                  v-validate="'required'"
                  data-vv-name="username"
                  :error-messages="errors.collect('username')"
                  @input="uppercase"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  v-validate="'required'"
                  data-vv-name="password"
                  :error-messages="errors.collect('password')"
                ></v-text-field>
                <v-layout row wrap class="my-2">
                <v-flex xs6></v-flex>
                <v-flex xs6>
                <my-captcha :callSuccess="captchaOk" color="black"  resolve="digit"></my-captcha>
                </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
              <v-card-text v-if="!isHidden" class="info--text"><strong> <h4>Please wait while dashboard is loading....</h4></strong></v-card-text>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import myCaptcha from 'vue-captcha'
  export default {
    name: 'Signin',
    data(){
      return {
        username: '',
        password: '',
        loading: false,
        isHidden:true,
        captcha:false,
        snackbar: false,
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
      }
    },
   components: {
     VueRecaptcha,
     'my-captcha': myCaptcha
    },
    $_veeValidate: {
      validator: 'new'
    },
    beforeUpdate(){
    },
    methods: {
      captchaOk () {
          this.captcha= true
      console.log('captcha ok.!')
    },
      login(){
        if(this.captcha === true){
          this.$validator.validate()
          .then(result =>{
            if(result){
              this.loading = true
              axios.post('/login',{
                username: this.username,
                password: this.password
              })
              .then(response => {
                this.$store.dispatch('storeAccessToken', response.data.access_token)
                this.isHidden = !this.isHidden
                setTimeout(() => {
                  this.$router.replace("/dashboard")
                  this.loading = false
                },8000)

              })
              .catch(error => {
                this.password = ''
                this.errors.add(
                  {
                    field: 'username',
                    msg: 'Invalid Username or Password'
                  }
                )
                this.loading = false
              })
            }
          })
        }
        else{
          //alert('Captcha is invalid')
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Captcha is invalid!!! '
          this.snackbar =true
        }


      }

    },
    computed:{
      getmenu:function(){
          return this.$store.getters.getMenu
       },
       uppercase:function(){
         this.username=this.username.toUpperCase()
       }
    },
  }
</script>
