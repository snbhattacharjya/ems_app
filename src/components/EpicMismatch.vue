<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
        <v-select v-if="this.getUser.level==2"
                :items="districts"
                v-model="district_id"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select district"
                autocomplete
                >
                <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary" @click="do_epic_match" >Show</v-btn></v-slide-x-reverse-transition>
              </v-select>

      <v-flex  xs12>
         <v-alert  v-model="alert"  type="info">
        {{this.msg}}
        </v-alert>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Unmatched Personnel</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <download-csv
              :data="personnel_csv"
              :name="personnelfilename"
              :labels="personnel_labels"
              :fields="personnel_csvfields"
               >
               <v-btn color="info" :loading="personnelloading" class="button"><v-icon>receipt</v-icon>Export Unmatched Personnel data as CSV</v-btn>
            </download-csv>
            <v-text-field v-model="search" append-icon="search"  label="Search Personnel"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
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
    name:'EpicMismatch',

    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      doing_epic_match:false,
      subdivision_id: '',
      office_id:'',
      subdivisions: [],
      districts:[],
      district_id:'',
      offices:[],
      isdisabled:true,
      disable_save: false,
      personnel_created:'',
      personnelloading:false,
      personnel_csv:[],
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          id:'Personnel ID',
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          dob:'Date of Birth',
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
          remark_id:'Remark',
          remark_reason:'Remark Reason',
          exempted:'Exempted',
          exemp_reason:'Reasone of Exemption',
          exemp_date:'Date of Exemption',
          created_at: 'Created At',
          updated_at: 'Updated At'
        },
        personnel_csvfields : ['id','basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','permanent_address','phone','post_stat','present_address','qualification_id','language_id','epic','part_no','sl_no','assembly_temp_id','assembly_perm_id','assembly_off_id','block_muni_temp_id','block_muni_perm_id','block_muni_off_id','subdivision_id','branch_ifsc','bank_account_no','remark_id','remark_reason','exempted','exemp_reason','exemp_date','created_at','updated_at'],

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
      matchstat_verified:0,
      matchstat_unverified:0,
      match:0,
      lists:[
        {name:'Match List',id:1},
        {name:'Unmatch List',id:0},
      ],
      msg:'',

    }),
    components: {
        'download-csv': JsonCSV,
    },
    $_veeValidate: {
      validator: 'new'
    },
    computed: {
      getUser:function(){
          return this.$store.getters.getUser
       },
    },

    mounted() {

    },

    created () {
      if(this.getUser.level==2){
        this.getdistrict()
        }else{
          this.do_epic_match()
        }


    },

    methods: {

     getdistrict(){
       axios.get('/getdistrict')
      .then((response, data) => { //console.log(response.data['available'])
       response.data.forEach(item => { //console.log(item)
          this.districts.push(item)
        })
        this.districts.push({name:"ALL",id:"all"})

          if(this.getUser.level != 2){
          this.dist_old=99
          this.district_id=this.getUser.area
          this.show()
          }
      })
      .catch(error => {
        console.log(error)
      })
     },

      do_epic_match () {

        if(this.getUser.level==2){

          var district=this.district_id
        }else{

          this.district= this.getUser.area
        }
        this.tableloading=true
        this.personnelloading=true
        axios.post('/epicdata',{district_id:district,match:0})
        .then((response, data) => {
          if(response.data['mode']=='out_of_range'){
            this.msg=response.data['message'];
            this.alert=true
            this.tableloading=false
            this.personnelloading=false
            return
          }
          else if(response.data['List'].length === 0){
            this.tableloading=false

            this.personnelloading=false
            this.personnels=[]
            this.personnel_csv=[]
          }
         else{
           this.personnels=[]
           this.personnel_csv=[]
            response.data['List'].forEach(item => {
                this.personnels.push(item)
                this.personnel_csv.push(item)
              })
            this.matchstat_verified=response.data['matchCount']
            this.matchstat_unverified=response.data['unmatchCount']
            this.msg='Epic Match Details : '+this.matchstat_verified+' (Matched) and '+this.matchstat_unverified+' (Unmatched)'
            this.alert=true
              this.tableloading=false

              this.personnelloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false

          this.personnelloading=false
        })


      },




    }
  }
</script>
