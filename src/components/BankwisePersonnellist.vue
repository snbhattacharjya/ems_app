<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
          <v-btn color="info" :to="'/bankwise_personnel'">Back</v-btn>
      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel({{this.bank}})</v-toolbar-title>
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
          <v-data-table v-model="select" :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading" :rows-per-page-items="rows">
            <template slot="items" slot-scope="props">

              <td>{{ props.item.office_id }}</td>
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.branch_ifsc }}</td>
              <td >{{ props.item.bank_account_no}}</td>



            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-flex>
      <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>
import JsonCSV from 'vue-json-csv'
  export default {
    name:'BankwisePersonnellist',
    components: {'download-csv': JsonCSV},
    data: () => ({

      dialog: false,
      search: '',

      snackbar: false,
      tableloading:false,

      offices:[],
      bank:'',
      isdisabled:true,
      disable_save: false,
      show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",

      rows:[5,10,25,100,200,500,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
      headers: [
        { text: 'Office ID', value: 'office_id',align: 'left'},
        { text: 'Personnel ID', value: 'id',align: 'left'},
        { text: 'Personnel Name', value: '',align: 'left' },
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'IFSC Code', value: 'branch_ifsc',align: 'left', },
        { text: 'Bank Account Number', value: 'bank_account_no',align: 'left', },


      ],
      personnelloading:false,
      loadingTXT_personnel:'No DATA',
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          office_id:'Office ID',
          id:'Personnel ID',
          name: 'Name',
          designation: 'Designation',
          branch_ifsc: 'IFSC Code',
          bank_account_no: 'Bank Account number'
          },
        personnel_csvfields : [
          'office_id',
          'id',
          'name',
          'designation',
          'branch_ifsc',
          'bank_account_no'
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

    },
    methods: {


      initialize () {
        this.personnelloading=true
        this.loadingTXT_personnel='Loading....'
        this.tableloading=true
        axios.get('/listofbankpersonnel/'+this.$route.params.ifsc)
        .then((response, data) => {
          if(response.data['list'].length === 0){
            this.tableloading=false
            this.personnels=[]
            this.personnel_csv=[]
            this.loadingTXT_personnel='No Data Found'
            this.personnelloading=false
          }
         else{
           this.personnels=[]
           this.personnel_csv=[]
            response.data['list'].forEach(item => {
                this.personnels.push(item)
                this.personnel_csv.push(item)
              })
              if(response.data['bank']==''){
                this.bank='Not Found'
              }
              else{
              this.bank=response.data['bank'][0]['bank_name']
              }
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
