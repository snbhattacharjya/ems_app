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

          @change="getOfficelist"
          >
        </v-select>
      </v-flex>
      <v-flex xs7>
        <v-select
        :items="offices"
        v-model="office_id"
        item-text= "name"
        item-value= "id"
        prepend-icon="list"
        label="Select Office"
        :disabled="isdisabled"
        autocomplete
        :search-input.sync="searchInput"
        >
        </v-select>
      </v-flex>
      <v-flex xs1>
        <v-btn color="primary" @click="dofilter" :disabled="disable_save">Show</v-btn>
      </v-flex>
      </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.permanent_address }}</td>
              <td >{{ props.item.mobile }}</td>
              <td class="justify-center layout px-0">
                <v-btn flat :to="'/personnel/'+props.item.id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn>
                <!-- <v-btn flat :to="'/personnel/'+props.item.id+ '/delete'"><v-icon small> delete</v-icon></v-btn> -->
              </td>
              <td>{{ props.item.updated_at=== null ?  "Not Updated": moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')  }}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-flex>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>
//  import SubdivisionList from '@/components/SubdivisionList'
//  import OfficeList from '@/components/OfficeList'
  export default {
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
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office ID', value: 'office_id',align: 'left', },
        { text: 'Personnel Name',align: 'left',sortable: false,value: 'name'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Permanent Address', value: 'permanent_address',align: 'left', sortable: false},
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Actions', value: 'name', sortable: false },
        { text: 'Updated at', value: 'updated_at', sortable: false }
      ],
      personnels: [],
      searchInput: ''
    }),
    components: {
        //  'subdivision-list': SubdivisionList,
        //  'office-list': OfficeList
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
      dofilter(){
        //console.log('SUB - '+this.subdivision_id)
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.initialize() : this.showError()
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
      initialize () {
        console.log('creating filter....')
        this.tableloading=true
        axios.get('/personnelbyoffice/'+this.office_id,{
          //office_id: this.office_id
        })
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.personnels=[]
          }
         else{
           this.personnels=[]
            response.data.forEach(item => {
                this.personnels.push(item)

              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },
      initialize_personnel () {
        //console.log('creating filter....')
        this.tableloading=true
        axios.get('/personnelbyoffice/'+this.getuser.user_id,{
          //office_id: this.office_id
        })
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
           this.personnels=[]
            response.data.forEach(item => {
                this.personnels.push(item)

              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },
      getOfficelist(){
        //console.log('SUB - '+this.subdivision_id)
        axios.get('/offices/'+this.subdivision_id)
          .then((response, data) => {
            this.isdisabled=false
            this.offices=[]
          response.data.forEach(item => {
            item.name=item.id+' - '+item.name
              this.offices.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
      },


    }
  }
</script>
