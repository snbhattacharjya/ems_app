<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>

        <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Edit Your Profile</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form autocomplete="off">
              <v-layout row wrap>
                <v-flex xs6>
                    <v-text-field
                      prepend-icon="person"
                      name="name"
                      label="Name of the User"
                      type="text"
                      counter
                      maxlength=50
                      v-model="name"
                      v-validate="'required'"
                      :error-messages="errors.collect('name')"
                      data-vv-name="name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                      prepend-icon="account_box"
                      name="designation"
                      label="Designation of User"
                      type="text"
                      counter
                      maxlength=50
                      v-model="designation"
                      v-validate="'required'"
                      :error-messages="errors.collect('designation')"
                      data-vv-name="designation"
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                    <v-text-field
                      prepend-icon="email"
                      name="email"
                      label="Email"
                      type="text"
                      counter
                      maxlength=50
                      v-model="email"
                      v-validate="'email|required'"
                      :error-messages="errors.collect('email')"
                      data-vv-name="email"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                      prepend-icon="phone_android"
                      name="mobile"
                      label="Mobile of User"
                      type="text"
                      counter
                      maxlength=10
                      v-model="mobile"
                      v-validate="'required|digits:10|not_zero|mobile'"
                      :error-messages="errors.collect('mobile')"
                      data-vv-name="mobile"
                    ></v-text-field>
                </v-flex>
              </v-layout>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :topo=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validateUser" :disabled="disable_save" :loading="loading">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>


  export default{
    name: 'UserCreate',

    components: {

    },

    $_veeValidate: {
      validator: 'new'
    },

    data (){
      return {
        loading:false,
        user_id:'',
        valid: true,
        snackbar: false,
        timeout: 0,
        name: '',
        subdivision_id: '',
        designation: '',
        email: '',
        mobile: '',
        aadhaar:'',
        makedisable: true,
        makedisable_subdiv: true,
        makedisable_ppcell:true,
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        disable_save: false,



        dictionary: {

          custom: {
            name: {
              required: 'Name can not be empty',
            },
            designation: {
              required: 'Designation is required'
            },
            email: {
              required: 'Email is required',
              email:'Email is not valid'
            },
            mobile: {
              required: 'Mobile Number is required'
            }
          }
        }

      }
    },
    created(){
      this.user_id = this.$route.params.id;
      this.name =this.getUser.name
      this.designation = this.getUser.designation
      this.email = this.getUser.email
      this.mobile = this.getUser.mobile
    },
    beforeUpdate(){


    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
      this.$validator.extend('mobile', {
        getMessage: field => `Invalid mobile number`,
        validate: value => {
            if(value.substring(0,1)>5 && value.substring(0,1)<=9)
            {
             return true
            }
            else{
              return false
            }
        }
       })
       this.$validator.extend('not_zero', {
        getMessage: field => `Zero not allowed`,
        validate: value => {
            var v = parseInt(value)
            return v>1
        }
       })
       this.$validator.extend('landline', {
        getMessage: field => `Invalid Phone number`,
        validate: value => {
            var strongRegex = new RegExp("([0-9])\\1{4}");
            if(strongRegex.test(value)==true){return false}
            else{return true}

        }
       })
    },
    methods: {
      validateUser(){
        this.loading=true
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.saveUser() : this.showError()
            this.disable_save = false
          })
          this.loading=false
      },
      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
        this.snackbar =true
      },
      saveUser(){
        this.loading=true
        axios.post('/edituser',{
        name: this.name,
        designation: this.designation,
        email:this.email,
        mobile: this.mobile,
        aadhaar: this.aadhaar

        })
        .then(response => {
          this.$store.dispatch('storeAccessToken', this.getAccessToken)
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = response.data
          this.snackbar =true
          this.loading=false
        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!! '+error
          this.snackbar =true
          this.loading=false
        })
      },


    },
    computed: {
      getUser(){
        return this.$store.getters.getUser
      },
      getAccessToken(){
        return this.$store.getters.getAccessToken
      }
    }

  }
</script>
