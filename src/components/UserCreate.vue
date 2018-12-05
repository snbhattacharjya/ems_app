<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>

        <v-card class="elevation-6 mb-5">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Create New User</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form autocomplete="off">
              <v-select
                :items="levels"
                v-model="user_level"
                item-text= "name"
                item-value= "user_type_code"
                prepend-icon="list"
                label="Select Type(Level) of User you want to create(*)"
                @change="getSubuserlevels(user_level)">
              </v-select>
              <v-select
                :items="sublevels"
                v-model="user_sublevel"
                item-text= "sub_user_name"
                item-value= "sub_user_code"
                prepend-icon="list"
                label="Select Sub Type(Sub Level) of User you want to create(*)"
                :disabled="makedisable"
                @change="getppcelllevels(user_sublevel)"
                >
              </v-select>
              <v-select
                :items="subdivisions"
                v-model="subdivision_id"
                item-text= "sub_user_name"
                item-value= "sub_user_code"
                prepend-icon="list"
                label="Select Sub Division(*)"
                :disabled="makedisable_subdiv"
                @change="getBDO(subdivision_id,user_level)"
                >
              </v-select>

              <v-select
                :items="pplevels"
                v-model="user_pplevel"
                item-text= "name"
                item-value= "code"
                prepend-icon="list"
                label="Select Type of PPCELL user you want to create(*)"
                :disabled="makedisable_ppcell"
                >
              </v-select>


              <v-text-field
                prepend-icon="person"
                name="name"
                label="Name of the User(*)"
                type="text"
                counter
                maxlength=30
                v-model="name"
                v-validate="'required'"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                @input="uppercase"
              ></v-text-field>


              <v-text-field
                prepend-icon="account_box"
                name="designation"
                label="Designation of User(*)"
                type="text"
                counter
                maxlength=30
                v-model="designation"
                v-validate="'required'"
                :error-messages="errors.collect('designation')"
                data-vv-name="designation"
                @input="uppercase"
              ></v-text-field>


              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email(*)"
                type="text"
                counter
                maxlength=20
                v-model="email"
                v-validate="'email|required'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                @input="uppercase"
              ></v-text-field>

              <v-text-field
                prepend-icon="phone_android"
                name="mobile"
                label="Mobile of User(*)"
                type="text"
                counter
                maxlength=10
                v-model="mobile"
                v-validate="'required|digits:10|not_zero|mobile'"
                :error-messages="errors.collect('mobile')"
                data-vv-name="mobile"
              ></v-text-field>
              <!-- <v-text-field
                  prepend-icon="fingerprint"
                  name="aadhaar"
                  label="User Aadhaar No (optional)"
                  type="text"
                  v-model="aadhaar"
                  v-validate="'digits:12'"
                  :error-messages="errors.collect('aadhaar')"
                  data-vv-name="aadhaar"
                ></v-text-field> -->

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbar" :multi-line="ture" :timeout=0 :value=show_message :color=message_type :topo=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validateUser" :disabled="disable_save">Save</v-btn>
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
        valid: true,
        snackbar: false,
        timeout: 0,
        name: '',
        subdivision_id: '',
        designation: '',
        email: '',
        mobile: '',
        levels:[],
        sublevels:[],
        subdivisions:[],
        pplevels:[
          {name: 'OC', code: 'OC'},
          // {name: 'HC', code: 'HC'},
          {name: 'DATA ENTRY OPERATOR', code: 'DEO'}
        ],
        user_level : '',
        user_sublevel : '',
        user_pplevel:'',
        makedisable: true,
        makedisable_subdiv: true,
        makedisable_ppcell:true,
        aadhaar : '',
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
            identification_code: {
              required: 'Identification Code is required'
            },
            subdivision_id: {
              required: 'Subdivision is required'
            },
            block_muni_id: {
              required: 'Block/Municipality is required'
            }
          }
        }

      }
    },
    created(){
      console.log('user' +this.user_level)
      this.getuserlevels()
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
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.saveUser() : this.showError()
            this.disable_save = false
          })
      },
      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
        this.snackbar =true
      },
      saveUser(){
        axios.post('/createuser',{
        name: this.name,
        designation: this.designation,
        email:this.email,
        mobile: this.mobile,
        level : this.user_level,
        sub_level : this.user_sublevel,
        //aadhaar : this.aadhaar,
        ppcell : this.user_pplevel,
        subdiv_block_id : this.subdivision_id
        })
        .then(response => {
          this.name= '',
          this.designation= '',
          this.email='',
          this.mobile= '',
          this.user_level = '04',
          this.user_sublevel = '',
          //this.aadhaar = '',
          this.subdivision_id='',
          this.makedisable_ppcell=true,
          this.makedisable_subdiv=true,
          this.sublevels=[],
          this.subdivisions=[],
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = response.data
          this.snackbar =true
          this.$validator.reset()
        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!! '+error
          this.snackbar =true
        })
      },
      getuserlevels(){
        axios.get('/creationlevel')
          .then((response, data) => {
          response.data.forEach(item => {
              this.levels.push(item)
            });
          })
          .catch(error => {
            console.log(error)
          })
      },
      getSubuserlevels(level){ console.log(level)
          if(level === '07' || level === '06'){
            this.makedisable=true
            this.makedisable_ppcell=true
            this.sublevels=[]
            this.subdivisions=[]
                axios.get('/sublevel/06')
              .then((response, data) => {
              if(response.data.length === 0 ) {
                this.makedisable_subdiv=true
              }else{

                this.subdivisions=[]
                response.data.forEach(item => {
                    this.subdivisions.push(item)
                  });
              }
              this.makedisable_subdiv=false
              })
              .catch(error => {
                console.log(error)
              })
          }
          else{
            this.makedisable=true
            this.makedisable_ppcell=true

            this.sublevels=[]
                this.makedisable_subdiv=true
              this.subdivisions=[]
              axios.get('/sublevel/'+level)
              .then((response, data) => {
                console.log('data - '+response.data.length)
              if(response.data.length === 0 ) {
                this.makedisable=true
              }else{

                this.sublevels=[]
                response.data.forEach(item => {
                    this.sublevels.push(item)
                  });
                  this.makedisable=false
              }

              })
              .catch(error => {
                console.log(error)
              })
          }
      },
      getBDO(id,level){ console.log(level)
        if(level === '07'){
          axios.get('/getbdo/'+id)
          .then((response, data) => {
          if(response.data.length === 0 ) {
            this.makedisable=true
          }else{

            this.sublevels=[]
            response.data.forEach(item => {
                this.sublevels.push(item)
              });
          }
          this.makedisable=false
          })
          .catch(error => {
            console.log(error)
          })
        }
      },
      getppcelllevels(level){
        if(level === '06'){

            this.subdivisions=[]
                axios.get('/sublevel/06')
              .then((response, data) => {
              if(response.data.length === 0 ) {
                this.makedisable_subdiv=true
              }else{

                this.subdivisions=[]
                response.data.forEach(item => {
                    this.subdivisions.push(item)
                  });
              }
              this.makedisable_subdiv=false
              this.makedisable_ppcell=false
              })
              .catch(error => {
                console.log(error)
              })
          }
          else if(level === 'DT'){
            this.makedisable_ppcell=false
            this.makedisable_subdiv=true
             this.subdivisions=[]
          }
      },
    },
    computed: {
      uppercase: function(){
        this.name=this.name.toUpperCase().trim().replace(/<\/?[^>]+(>|$)/g, "")
        this.designation=this.designation.toUpperCase().trim().replace(/<\/?[^>]+(>|$)/g, "")
        this.email=this.email.toLowerCase().trim().replace(/<\/?[^>]+(>|$)/g, "")
      }
    }

  }
</script>
