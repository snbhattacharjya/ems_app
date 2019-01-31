<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
        <v-btn color="info" :to="'/poststatus_mismatch'">Back</v-btn>
        <download-csv
                        :data="personnels"
                        :name="personnelfilename"
                        :labels="personnel_labels"
                        :fields="personnel_csvfields"
                >
                <v-btn color="info" :loading="personnelloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_personnel}}</v-btn>
                </download-csv>
      <v-flex  xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table
 :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.bank_account_no }}</td>
              <td >{{ props.item.mobile }}</td>
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
import JsonCSV from 'vue-json-csv'
  export default {
    name:'MismatchChecklist',
    components: {'download-csv': JsonCSV},
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
      ],
      personnels: [],
      searchInput: '',
       personnelloading:false,
      loadingTXT_personnel:'No DATA',
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          id:'Personnel ID',
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          Age:'Age',
          email:'Email',
          emp_group:'Employee Group',
          gender: 'Gender',
          grade_pay: 'Grade Pay',
          mobile: 'Mobile',
          name: 'Name',
          office_id:'Office ID',
          pay_level:'Pay Level',
          permanent_address: 'Permanent Address',
          phone: 'Phone',
          post_stat: 'Post Status',
          present_address: 'Present Address',
          qualification_id: 'Qualification',
          language_id:'Language',
          epic:'EPIC',
          part_no:'Part No',
          sl_no:'Serial No',
          assembly_temp_id:'Temporary Assembly',
          assembly_perm_id:'Permanent Assembly',
          assembly_off_id:'Office Assembly',
          block_muni_temp_id:'Temporary Block/Municipality',
          block_muni_perm_id:'Permanent Block/Municipality',
          block_muni_off_id:'Office Block/Municipality',
          subdivision_id:'Subdivision',
          branch_ifsc:'IFSC',
          bank_account_no:'Bank Account No',
          remark:'Remark',
          remark_reason:'Remark Reason',
          created_at:'Created At',
          updated_at:'Updated At'

        },
        personnel_csvfields : ['id','basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','permanent_address','phone','post_stat','present_address','qualification_id','language_id','epic','part_no','sl_no','assembly_temp_id','assembly_perm_id','assembly_off_id','block_muni_temp_id','block_muni_perm_id','block_muni_off_id','subdivision_id','branch_ifsc','bank_account_no','remark_id','remark_reason','created_at','updated_at'],
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

        this.initialize_personnel()


    },

    methods: {


      initialize_personnel () {
        this.tableloading=true
        this.personnelloading=true
        this.loadingTXT_personnel='Loading....'
        axios.get('/getmismatchlist/'+this.$route.params.designation+'/'+this.$route.params.group,{
        })
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
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
