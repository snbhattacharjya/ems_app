<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
        <v-alert v-if="personnel_created" v-model="alert" dismissible type="success">
        {{ this.personnel_created }}
        </v-alert>
      <v-flex x12 v-if="this.getuser.level != 10">
         <v-btn v-if="this.getuser.level == 12" color="info" :to="'/personnel_transfer'">Transfer Personnel</v-btn>
         <v-btn v-if="this.getuser.level == 12" color="info" :to="'/exemption'">Exemption</v-btn>

      <v-layout row wrap  >
      <v-flex xs4>
          <v-select
          :items="subdivisions"
          v-model="subdivision_id"
          item-text= "name"
          item-value= "id"
          prepend-icon="list"
          label="Select Subdivision/Block"
          v-validate="'required'"
          :error-messages="errors.collect('subdivision_id')"
          data-vv-name="subdivision_id"
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
        v-validate="'required'"
        :error-messages="errors.collect('office_id')"
        data-vv-name="office_id"
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
      <v-flex  xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table v-if="this.getuser.level==12 || this.getuser.level==8 || this.getuser.level==10"
 :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.bank_account_no }}</td>
              <td >{{ props.item.mobile }}</td>
              <td>{{ props.item.updated_at=== null ?  "Not Updated": moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')  }}</td>
              <td class="justify-center layout px-0">
                <v-btn flat :to="'/personnel/'+props.item.id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn>
                <!-- <v-btn flat :to="'/personnel/'+props.item.id+ '/delete'"><v-icon small> delete</v-icon></v-btn> -->
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
          <v-data-table v-else
 :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.bank_account_no }}</td>
              <td >{{ props.item.mobile }}</td>
              <td>{{ props.item.updated_at=== null ?  "Not Updated": moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')  }}</td>
              <td class="justify-center layout px-0">
                <!-- <v-btn flat :to="'/personnel/'+props.item.id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn> -->
                <!-- <v-btn flat :to="'/personnel/'+props.item.id+ '/delete'"><v-icon small> delete</v-icon></v-btn> -->
              </td>
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
    props: {
    user_level: {
      type: String,
      required: true
    },
    },
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
      personnel_created:'',
      alert:false,
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office ID', value: 'office_id',align: 'left',sortable: false },
        { text: 'Personnel Name',align: 'left',value: 'name'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Bank Account No', value: 'bank_account_no',align: 'left', sortable: false},
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Updated at', value: 'updated_at',  },
        { text: 'Actions', value: 'name', sortable: false },
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
       getpersonnel:function(){
          return this.$store.getters.getpersonnel
       },
    },

    mounted() {

    },

    created () {
      if(window.sessionStorage.getItem('is_personnel_created')!='null'){
        this.personnel_created=window.sessionStorage.getItem('is_personnel_created')
        this.alert=true
        window.sessionStorage.setItem('is_personnel_created',null)
      }
      else{
        this.alert=false
        window.sessionStorage.setItem('is_personnel_created',null)
      }
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
      initialize () {console.log('inside initialize')
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
        this.tableloading=true
        if(this.getpersonnel!=''){

          this.personnels=[]
            this.getpersonnel.forEach(item => {
                this.personnels.push(item)

              })
              this.tableloading=false
        }else{
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
              this.$store.dispatch('storepersonnel', this.personnels)
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
        }
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
