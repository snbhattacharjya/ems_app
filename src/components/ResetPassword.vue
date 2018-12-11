<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex x12 v-if="this.getuser.level != 10">
      <v-layout row wrap  >
      <v-flex xs4>
          <v-select
          :items="subdivisions"
          v-model="subdivision_id"
          item-text= "name"
          item-value= "id"
          prepend-icon="list"
          label="Select Subdivision"

          >
          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary" @click="getOfficelist" >Show</v-btn></v-slide-x-reverse-transition>

        </v-select>
      </v-flex>

      <v-flex xs8>
        <v-btn v-if="this.getuser.level == 12" color="primary" @click="getAdminlist" >Show Admin Users</v-btn>
      </v-flex>
      </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>Office List</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table :headers="headers" :items="offices" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td v-if="isadmin==false">{{ props.item.id }}</td>
              <td v-else>{{ props.item.user_id }}</td>
              <td v-if="isadmin==false" >{{ props.item.name }} ({{ props.item.identification_code }})</td>
              <td v-else>{{ props.item.name }}</td>
              <td >{{ props.item.mobile }}</td>
              <td v-if="isadmin==false"  class="justify-center layout px-0">
                <v-btn flat @click="resetpass(props.item.id)"><v-icon small class="mr-2">restore</v-icon>Reset Password</v-btn>
              </td>
              <td v-else class="justify-center layout px-0">
                <v-btn flat @click="resetpass(props.item.user_id)"><v-icon small class="mr-2">restore</v-icon>Reset Password</v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-flex>
      <v-dialog
      v-model="dialog"
      max-width="290"
      persistent=true
    >
      <v-card>
        <v-card-title class="headline">User Password Reset</v-card-title>

        <v-card-text>
         Password reseted successfully for <strong>{{this.userid}}</strong><br> New Password - <span class="green--text"> {{this.newpassword}}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Close
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>

      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    name: 'ResetPassword',
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      subdivision_id: '',
      office_id:'',
      subdivisions: [],
      offices:[],
      isdisabled:true,
      disable_save: false,
      isadmin:false,
      headers: [

        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Name',align: 'left',sortable: false,value: 'name'},
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Actions', value: 'name', sortable: false },
      ],
      offices: [],
      searchInput: '',
      newpassword:'',
      userid:''

    }),
    components: {

    },
    $_veeValidate: {
      validator: 'new'
    },
    computed: {
       getuser:function(){
          return this.$store.getters.getUser
       },
    },

    mounted() {

    },

    created () {
      if(this.getuser.level != 10){this.getsubdivision()}
      else{
        this.initialize_personnel()
      }

    },

    methods: {
      getsubdivision(){

          axios.get('/subdivisions')
          .then((response, data) => {
          response.data.forEach(item => {
              this.subdivisions.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
      },
     getAdminlist(){

        axios.get('/offices/admin')
          .then((response, data) => {

            this.offices=[]
          response.data.forEach(item => {

              this.offices.push(item)
            });
          this.isadmin=true
          })
          .catch(error => {
            console.log(error)
          })

     },

      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
        this.snackbar =true
      },

      getOfficelist(){
        if(this.subdivision_id !=''){
           this.isadmin=false
        axios.get('/offices/'+this.subdivision_id)
          .then((response, data) => {
            this.isdisabled=false
            this.offices=[]
          response.data.forEach(item => {

              this.offices.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
        }
        else{
          alert('Please select subdivision first !')
        }
      },
      resetpass(val){
        if(confirm('Are you sure to reset password for '+val+' ?')){
          this.disable_save=true
         axios.get('/resetpassword/'+val)
          .then((response, data) => {
            this.userid=val
            this.newpassword=response.data
            this.dialog=true

          })
          .catch(error => {
            console.log(error)
          })
        }
      },



    }
  }
</script>
