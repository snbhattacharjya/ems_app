<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <download-csv
                        :data="personnel_csv"
                        :name="personnelfilename"
                        :labels="personnel_labels"
                        :fields="personnel_csvfields"

                >
                    <v-btn color="info" :loading="tableloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_personnel}}</v-btn>
                </download-csv>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table v-model="select" :headers="headers"  :items="personnels" :search="search" class="elevation-1" :loading="tableloading" :rows-per-page-items="rows">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.officeId }}</td>
              <td>{{ props.item.office }}</td>
              <td>{{ props.item.officeAddress }}</td>
              <td>{{ props.item.officeEmail }}</td>
              <td >{{ props.item.officeMobile }}</td>
              <td >{{ props.item.officePhone }}</td>
              <td >{{ props.item.personnel }}</td>
              <td >{{ props.item.personnelId}}</td>
              <td>{{props.item.designation}}</td>
              <td>{{props.item.email}}</td>
              <td>{{props.item.mobile}}</td>

              <td>{{props.item.phone}}</td>
              <td>{{props.item.epic}}</td>

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
  export default {
    name:'EpicnumberError',
    components: {'download-csv': JsonCSV},
    data: () => ({
      disable_select_all:true,
      loading_bulk:false,
      dialog: false,
      search: '',
      post_stat:'',
      post_stat_id:'',
      snackbar: false,
      tableloading:false,
      subdivision_id: '',
      office_id:'',
      subdivisions: [],
      offices:[],
      select:[],
      selected:[],
      isdisabled:true,
      disable_save: false,
      show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
      gender:'',
       genders: [
          {
            id: 'M',
            name: 'Male'
          },
          {
            id: 'F',
            name: 'Female'
          }
        ],
      poststats:[],
      poststat_to: '',
      rows:[5,10,25,100,200,500,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
      headers: [
        { text: 'Office ID', value: 'officeId',align: 'left'},
        { text: 'Office Name', value: 'office',align: 'left'},
        { text: 'Office Address', value: 'officeAddress',align: 'left'},
        { text: 'Office Email',align: 'left',value: 'officeEmail'},
        { text: 'Office Mobile',align: 'left',value: 'officeMobile'},
        { text: 'Office Phone',align: 'left',value: 'officePhone'},
        { text: 'Personnel', value: 'personnel',align: 'left' },
        { text: 'Personnel ID', value: 'personnelId',align: 'left'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Email', value: 'email',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Phone', value: 'phone',align: 'left', },
        { text: 'Epic Number',align: 'left',value: 'epic'},

      ],
      personnelloading:false,
      loadingTXT_personnel:'No DATA',
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          officeId:'Office ID',
          office:'Office Name',
          officeAddress:'Office Address',
          officeEmail:'Office Email',
          officeMobile:'Office Mobile',
          officePhone:'Office Phone',
          personnelId:'Personnel ID',
          personnel:'Personnel',
          designation:'Designation',
          email:'Email',
          mobile:'Mobile',
          phone:'Phone',
          epic:'Epic Number'

        },
        personnel_csvfields : [
          'officeId',
          'office',
          'officeAddress',
          'officeEmail',
          'officeMobile',
          'officePhone',
          'personnel',
          'personnelId',
          'email',
          'phone',
          'designation',
          'epic'
        ],

      personnels: [],
      personnel_csv:[],
      searchInput: ''
    }),

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
      this.initialize()

    },
    watch:{
      select:function(){
        if(this.select.length > 0){
          this.disable_select_all=false
        }
        else{
          this.disable_select_all=true
        }
      }
    },
    methods: {


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
        axios.get('/getnoepic',{

        })
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.personnels=[]
            this.personnel_csv=[]
            this.loadingTXT_personnel='No Data Found'
            this.personnelloading=false
          }
         else{
           this.personnels=[]
           this.personnel_csv=[]
            response.data.forEach(item => {

                this.personnels.push(item)
                this.personnel_csv.push(item)

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
