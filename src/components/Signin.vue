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
                  :autofocus=true
                  v-model="username"
                  v-validate="'required'"
                  data-vv-name="username"
                  :error-messages="errors.collect('username')"
                  @input="uppercase"
                  @keydown.enter="login"
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
                  @keydown.enter="login"
                ></v-text-field>
                <v-layout row wrap class="my-2">
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs10 >
                      <canvas class="captcha" id="captcha_canvas" ref="captcha_canvas"  width="150" height="40" style="border:1px solid #000000;"/>
                </v-flex>
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
                  type="text"
                  v-model="captcha"
                  v-validate="'required'"
                  data-vv-name="captcha"
                  :error-messages="errors.collect('captcha')"
                  @keydown.enter="login"
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
      //this.random()
    },
    mounted() {
    this.$validator.localize("en", this.dictionary)
    this.random()
  },
    methods: {
      login(){
        if(this.captcha_pass === true ){
          this.show_message = false
          this.message_type = ''
          this.message_icon = ''
          this.message_text = ''
          this.snackbar =false
          this.$validator.validate()
          .then(result =>{
            if(result){
              this.loading = true
              axios.post('/login',{
                username: this.encode(this.username),
                password: this.encode(this.password)
              })
              .then(response => {
                this.$store.dispatch('storeAccessToken', response.data)
                this.isHidden = !this.isHidden
                setTimeout(() => {
                  this.$router.replace("/dashboard")
                  this.loading = false
                },8000)

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
        var canvas = this.$refs.captcha_canvas
        var ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "25px Arial"
        ctx.strokeStyle = 'rgb(0,0,0)';
        var text = ""
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i <= l; i++){
          text+= possible.charAt(Math.floor(Math.random() * possible.length))
          //ctx.transform(2,-0.1,-0.5,1,0,0)
         }
        this.captcha_real=text
        ctx.fillText(text, 22, 22)


      },
      reload_captcha(){
        this.random()
      },
      encode(string){
          // Create Base64 Object
          var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
          return Base64.encode(Base64.encode(string))
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
    margin:10px 0 0 10px;
}
</style>

