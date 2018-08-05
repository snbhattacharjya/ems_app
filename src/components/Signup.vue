<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="UserName" label="Name" type="text" v-model="username"></v-text-field>
              <v-text-field prepend-icon="email" name="Email" label="Email" type="text" v-model="email"></v-text-field>
              <v-text-field prepend-icon="person_pin" name="Designation" label="Designation" type="text" v-model="designation"></v-text-field>
              <v-text-field prepend-icon="contact_phone" name="Mobile" label="Mobile" type="text" v-model="mobile"></v-text-field>
              <v-text-field prepend-icon="fingerprint" name="Aadhaar" label="Aadhaar" type="text" v-model="aadhaar"></v-text-field>
              <v-select :items="levels" prepend-icon="list" label="User Level" v-model="level"></v-select>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        email: '',
        designation: '',
        mobile: '',
        aadhaar: '',

        levels: [
          'State',
          'District'
        ],
        areas: [
          {
            id: '1',
            name: 'Hooghly'
          }
        ]

      }
    },

    methods: {
      register(){
        axios.post('/register',{
          username: this.username,
          email: this.email,
          designation: this.designation,
          mobile: this.mobile,
          aadhaar: this.aadhaar,
          level: this.level
        })
        .then(reponse => {

        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  }
</script>
