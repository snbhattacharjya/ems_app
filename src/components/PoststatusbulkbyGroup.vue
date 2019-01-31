<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex x12 v-if="this.getuser.level != 10">
      <v-layout row wrap  >

      <v-flex xs6>
        <v-select
          :items="emp_groups"
          v-model="emp_group"
          item-text= "name"
          item-value= "id"
          prepend-icon="list"
          label="Select Group(Required)"
          v-validate="'required'"
          :error-messages="errors.collect('emp_group')"
          data-vv-name="emp_group"
          >
        </v-select>
      </v-flex>
      <v-flex xs1>
        <v-btn color="primary" @click="dofilter" :disabled="disable_save">Show</v-btn>
      </v-flex>
      <v-flex xs3 class="ml-3">
        <!-- <download-csv
                        :data="personnels"
                        :name="personnelfilename"
                        :labels="personnel_labels"
                        :fields="personnel_csvfields"
                >
                <v-btn color="info" :loading="personnelloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_personnel}}</v-btn>
                </download-csv> -->
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

              <td >{{ props.item.designation }}</td>

              <td>{{props.item.pp}}</td>

              <td class="justify-center layout px-0">
                <v-btn flat :to="'/checklist/'+props.item.designation+ '/'+emp_group"><v-icon small class="mr-2">edit</v-icon>Check List</v-btn>
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
import JsonCSV from 'vue-json-csv'
//import moment from 'moment'

  export default {
    name:'PoststatusbulkbyGroup',
    components: {'download-csv': JsonCSV},
    data: () => ({
      dialog: false,
      search: '',
      emp_groups: [
          'A',
          'B',
          'C',
          'D'
        ],
      post_stat_id:'',
      snackbar: false,
      tableloading:false,
      subdivision_id: '',
      office_id:'',
      subdivisions: [],
      offices:[],
      isdisabled:true,
      disable_save: false,
      show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",

      poststats:[],
      headers: [
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Personnel Count', value: 'pp',},
        { text: 'Actions', value: '', sortable: false },
      ],
      personnelloading:false,
      loadingTXT_personnel:'No DATA',
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          // id:'Personnel ID',
          // basic_pay: 'Basic Pay',
          // designation: 'Designation',
          // Age:'Age',
          // email:'Email',
          // emp_group:'Employee Group',
          // gender: 'Gender',
          // grade_pay: 'Grade Pay',
          // mobile: 'Mobile',
          // name: 'Name',
          // office_id:'Office ID',
          // pay_level:'Pay Level',
          // permanent_address: 'Permanent Address',
          // phone: 'Phone',
          // post_stat: 'Post Status',
          // present_address: 'Present Address',
          // qualification_id: 'Qualification',
          // language_id:'Language',
          // epic:'EPIC',
          // part_no:'Part No',
          // sl_no:'Serial No',
          // assembly_temp_id:'Temporary Assembly',
          // assembly_perm_id:'Permanent Assembly',
          // assembly_off_id:'Office Assembly',
          // block_muni_temp_id:'Temporary Block/Municipality',
          // block_muni_perm_id:'Permanent Block/Municipality',
          // block_muni_off_id:'Office Block/Municipality',
          // subdivision_id:'Subdivision',
          // branch_ifsc:'IFSC',
          // bank_account_no:'Bank Account No',
          // remark:'Remark',
          // remark_reason:'Remark Reason'

        },
        // personnel_csvfields : ['id','basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','phone','post_stat','remark'],

      personnels: [],
      searchInput: ''
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

    },

    methods: {

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
        this.personnelloading=true
        this.loadingTXT_personnel='Loading....'
        this.tableloading=true
        axios.post('/mismatchreport',{
          group: this.emp_group
        })
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.personnels=[]
            this.loadingTXT_personnel='No Data Found'
            this.personnelloading=false
          }
         else{
           this.personnels=[]
            response.data.forEach(item => {

                this.personnels.push(item)

              })
              this.personnelloading=false
              this.loadingTXT_personnel='Download as CSV'
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })

      },




    }
  }
</script>
