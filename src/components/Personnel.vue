<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Create New Office</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="personnel_name" label="Office Name" type="text" v-model="office_name"></v-text-field>
              <v-text-field prepend-icon="email" name="designation" label="Official Designation" type="text" v-model="designation"></v-text-field>
              <v-select :items="offices" item-text= "name" item-value= "id" prepend-icon="list" label="Office" v-model="office_id"></v-select>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="savePersonnel">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default{
    name: 'Office',
    data (){
      return {
        offices: [],
        personnel_name: '',
        designation: '',
        office_id: '',
      }
    },
    created() {
      axios.get('/offices')
      .then((response, data) => {
       response.data.forEach(item => {
          this.offices.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
    },
    methods: {
      savePersonnel(){
        axios.post('/personnel',{
          personnel_name: this.personnel_name,
          designation: this.designation,
          office_id: this.office_id
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    computed: {

    }

  }
</script>
