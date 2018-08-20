<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-alert
          :value=show_message
          :color=message_type
          :icon=message_icon
          outline
        >
          {{message_text}}
        </v-alert>
        <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Create New Office</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="office_name"
                label="Office Name"
                type="text"
                v-model="office_name"
                v-validate="'required'"
                :error-messages="errors.collect('office_name')"
                data-vv-name="office_name"
              ></v-text-field>

              <v-text-field
                prepend-icon="email"
                name="identification_code"
                label="Identification Code eg. DDO Code/IFSC/DISE Code alike"
                type="text"
                v-model="identification_code"
                v-validate="'required'"
                :error-messages="errors.collect('identification_code')"
                data-vv-name="identification_code"
              ></v-text-field>

              <subdivision-list
                v-model="subdivision_id"
                v-validate="'required'"
                data-vv-name="subdivision_id"
                :error="errors.collect('subdivision_id')"
              ></subdivision-list>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validateOffice" :disabled="disable_save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import SubdivisionList from '@/components/SubdivisionList'
  export default{
    name: 'Office',

    components: {
      'subdivision-list': SubdivisionList,
    },

    $_veeValidate: {
      validator: 'new'
    },

    data (){
      return {
        valid: true,
        office_name: '',
        identification_code: '',
        subdivision_id: '',
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
            }
          }
        }

      }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      validateOffice(){
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.saveOffice() : this.showError()
            this.disable_save = false
          })
      },
      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
      },
      saveOffice(){
        axios.post('/office',{
          office_name: this.office_name,
          identification_code: this.identification_code,
          subdivision_id: this.subdivision_id
        })
        .then(response => {
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = 'Office Added Successfully'
        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!!'
          console.log(error)
        })
      }
    },
    computed: {

    }

  }
</script>
