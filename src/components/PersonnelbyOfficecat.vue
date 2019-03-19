<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
          <v-btn color="info" :to="'/office_category_wise_post_status'">Back</v-btn>
      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel(Male & Female)</v-toolbar-title>
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
              <td >{{ props.item.basic_pay }}</td>
              <td >{{ props.item.emp_group }}</td>
              <td >{{ props.item.age }}</td>
              <td>{{ props.item.remark_name }}</td>
              <td >{{ props.item.gender }}</td>
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
    name:'PersonnelbyOfficecat',
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
        { text: 'Basic Pay', value: 'basic_pay',align: 'left', },
        { text: 'Group', value: 'emp_group',align: 'left', },
        { text: 'Age', value: 'age',align: 'left', },
        { text: 'Remark', value: 'remark_name',align: 'left', },
        { text: 'Gender', value: 'gender',align: 'left', },
        { text: 'IFSC Code', value: 'branch_ifsc',align: 'left', },
        { text: 'Bank Account Number', value: 'bank_account_no',align: 'left', },


      ],
      personnelloading:false,
      loadingTXT_personnel:'No DATA',
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          id:'Personnel ID',
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          dob:'Birth Date',
          age:'Age',
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
          remark_name:'Remark',
          remark_reason:'Remark Reason',
          created_at:'Created At',
          updated_at:'Updated At'

        },
        personnel_csvfields : ['id','basic_pay','designation','dob','age','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','permanent_address','phone','post_stat','present_address','qualification_id','language_id','epic','part_no','sl_no','assembly_temp_id','assembly_perm_id','assembly_off_id','block_muni_temp_id','block_muni_perm_id','block_muni_off_id','subdivision_id','branch_ifsc','bank_account_no','remark_name','remark_reason','created_at','updated_at'],

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
        axios.get('/getnotassigned/'+this.$route.params.cat+'/'+this.$route.params.post+'/'+this.$route.params.district)
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
