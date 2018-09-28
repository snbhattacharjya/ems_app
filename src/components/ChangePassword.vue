<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>

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
                  data-vv-name="password"
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
                  v-validate="'required'"
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
            <v-snackbar v-model="snackbar" :multi-line="false" :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
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

    components: {

    },

    $_veeValidate: {
      validator: 'new'
    },

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

        dictionary: {

          custom: {
            office_name: {
              required: 'Office Name can not be empty',
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

    },
    mounted () {
      //this.$validator.localize('en', this.dictionary)
    },
    methods: {
      change_password () {

        axios.post('/changepassword',{
          old_password: this.old_password,
          new_password: this.new_password
        })
        .then((response, data) => {

        })
        .catch(error => {
          console.log(error)
          this.showError(error)
        })
      },
      validatepassword(){
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.change_password() : this.showError()
            this.disable_save = false
          })
      },
      showError(error){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = error
        this.snackbar =true
      },

    },
    computed: {

    }

  }
</script>
