<template>
<v-container fluid>
    <v-layout align-center justify-center>


      <v-flex xs6>
<v-alert :value="firstlogin" type="error">
      Password change is mandatory after first login.
      </v-alert>
        <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Change Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  id="old_password"
                  prepend-icon="lock"
                  name="old_password"
                  label="Old Password"
                  type="password"
                  v-model="old_password"
                  v-validate="'required'"
                  data-vv-name="old_password"
                  :error-messages="errors.collect('old_password')"
                ></v-text-field>

                <v-text-field
                  id="new_password"
                  prepend-icon="lock"
                  name="new_password"
                  ref="new_password"
                  label="New Password"
                  type="password"
                  v-model="new_password"
                  v-validate="'required|min:8|verify_password'"
                  data-vv-name="new_password"
                  :error-messages="errors.collect('new_password')"
                ></v-text-field>
                <v-text-field
                  id="confirm_password"
                  prepend-icon="lock"
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  v-model="confirm_password"
                  v-validate="'required|confirmed:new_password'"
                  data-vv-name="confirm_password"
                  :error-messages="errors.collect('confirm_password')"
                ></v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validatepassword" :disabled="disable_save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>


  export default{
    name: 'ChangePassword',
    data (){
      return {
        valid: true,
        snackbar: false,
        old_password:'',
        new_password:'',
        confirm_password:'',
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        disable_save: false,
        firstlogin:false,
        dictionary: {

          custom: {
            old_password: {
              required: 'Old password can not be empty'
            },
            new_password: {
              required: 'New password is required',
              min:'Password must be at least 8 characters '
            },
            confirm_password: {
              required: 'Confirm password is required',
              confirmed:'Password mismatch'
            }
          }
        }
      }
    },
    $_veeValidate: {
      validator: 'new'
    },
    beforeUpdate() {

      if(this.getuser.change_password === 0){
          this.firstlogin=true
      }
    },
    created(){
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
      this.$validator.extend('verify_password', {
        getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , .$ @ # & ? etc)`,
        validate: value => {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            return strongRegex.test(value);
        }
       })
    },
    methods:{
      change_password:function () {

        axios.post('/changepassword',{
          old_password: this.old_password,
          new_password: this.new_password
        })
        .then((response, data) => {

          if(this.getuser.change_password === 0){
            this.$store.dispatch('destroyToken')
            this.$router.replace("/signin")
          }
          else if(this.getuser.change_password === 1){
            this.old_password=''
            this.new_password=''
            this.confirm_password=''
            this.showMessage('Password Has Been Changed')
          }
        })
        .catch(error => {
          this.old_password=''
            this.new_password=''
            this.confirm_password=''
          this.showError(error.response.data)
        })
      },
      validatepassword:function(){
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.change_password() : this.showError()
            this.disable_save = false
          })
      },
      showError:function(error){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = error
        this.snackbar =true
      },
      showMessage:function(msg){
        this.show_message = true
        this.message_type = 'success'
        this.message_icon = 'success'
        this.message_text = msg
        this.snackbar =true
      },

    },
    computed:{
       getuser:function(){
          return this.$store.getters.getUser
       },
    },



  }
</script>
