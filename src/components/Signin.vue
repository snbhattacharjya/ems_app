<template>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login To PPMS</v-toolbar-title>
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
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs10>
                  <v-text-field
                  id="captcha_real"
                  class="captcha"
                  prepend-icon="donut_small"
                  name="captcha_real"
                  label="Captcha"
                  type="text"
                  v-model="captcha_real"
                  :disabled="true"
                >
                </v-text-field></v-flex>
                <v-flex xs2 class="mt-4">
                                  <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-icon style="cursor:pointer" @click="reload_captcha">autorenew</v-icon></v-slide-x-reverse-transition>
                </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                <v-text-field
                  id="captcha"
                  prepend-icon="input"
                  name="captcha"
                  label="Input Captcha"
                  type="password"
                  v-model="captcha"
                  v-validate="'required'"
                  data-vv-name="captcha"
                  :error-messages="errors.collect('captcha')"
                ></v-text-field>
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
  export default {
    name: 'Signin',
    data(){
      return {
        username: '',
        password: '',
        loading: false,
        isHidden:true,
        captcha_real:'',
        captcha:'',
        captcha_pass:false,
        snackbar: false,
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
         dictionary: {
          custom: {
            username:{
              required: "Please type Username"
            },
            password:{
              required: "Please type Password"
            },
            captcha:{
              required: "Please type Captcha"

            }

          }
        }
      }
    },
   components: {

    },
    $_veeValidate: {
      validator: 'new'
    },
    created(){
      this.captcha_real=this.random()
    },
    mounted() {
    this.$validator.localize("en", this.dictionary)
  },
    methods: {

      login(){
        if(this.captcha_pass === true ){
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
                },2000)

              })
              .catch(error => {
                this.captcha=''
                this.reload_captcha()
                this.password = ''
                this.errors.add(
                  {
                    field: 'username',
                    msg: 'Invalid Username or Password'
                  },
                  {
                    field: 'captcha',
                    msg: 'Invalid Captcha'
                  }
                )
                this.loading = false
              })
            }
          })
        }
        else{
                this.captcha=''
                this.reload_captcha()
                this.password = ''
                this.errors.add(
                  {
                    field: 'captcha',
                    msg: 'Invalid Captcha'
                  }
                )
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Captcha is invalid!!! '
          this.snackbar =true
        }


      },
      random(l=5) {
        var text = ""
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (var i = 0; i <= l; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        return text
      },
      reload_captcha(){
        this.captcha_real=this.random()
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
    watch:{
      captcha:function(val){
        if(this.captcha === this.captcha_real){
          this.captcha_pass=true
        }
        else{
          this.captcha_pass=false
        }
      }
    }
  }
</script>
<style scoped>
.captcha{
  -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
</style>

