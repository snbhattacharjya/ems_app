<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>

      <v-layout row wrap  class="">

        <v-text-field
                prepend-icon="search"
                name="personnel_search"
                label="Search"
                type="text"
                v-model="personnel_search"
                persistent-hint
                hint="Search by Personnel EPIC or Mobile or Bank Account Number"
                clearable
                @keydown.enter="search_personnel"
              ></v-text-field>
              <v-btn color="primary" @click="search_personnel" :loading="searching">Search Personnel</v-btn>
      <v-flex xs12 id="print">
        <v-alert v-if="not_found" v-model="alert" dismissible type="error">
        Not Found
        </v-alert>
        <p v-if="items_found>0">Found {{this.items_found}} Personnel(s)</p>
        <v-card class="my-5" :loading="tableloading" v-if="personnels.length>0">
        <table  class="v-datatable v-table dark mb-5" style=""  border=1>
              <tbody>
              <tr v-for="personnel in personnels" :prop="personnel" :key="personnel.id">
              <td>
                <v-layout row wrap class="my-2">
                <v-flex xs11>
                <strong>Office Name : </strong>{{personnel.officename}} <br>
                <strong>Office ID : </strong>{{personnel.office_id}} <br>
                <strong>Office Mobile : </strong>{{personnel.officemobile}} <br>
                <strong>Office Phone : </strong>{{personnel.officephone}} <br>
                <strong>Office Email : </strong>{{personnel.officeemail}} <br>
                <strong>Name : </strong>{{personnel.name}} <br>
                <strong>Designation : </strong>{{personnel.designation}} <br>
                <strong>Present Address : </strong>{{personnel.present_address}} <br>
                <strong>Permanent Address : </strong>{{personnel.permanent_address}} <br>
                <strong>Date of Birth : </strong>{{moment(personnel.dob).format('DD/MM/YYYY')}} <br>
                <!-- <strong>Gender : </strong>{{personnel.gender}} <br> -->
                <!-- <strong>Pay Scale : </strong>{{personnel.scale}} <br> -->
                <strong>Basic Pay : </strong>{{personnel.basic_pay}} <br>
                <strong>Grade Pay : </strong>{{personnel.grade_pay}} <br>
                <!-- <strong>Pay Level : </strong>{{personnel.pay_level}} <br> -->
                <strong>Employee Group : </strong>{{personnel.emp_group}} <br>
                <strong>Working Status : </strong>{{personnel.working_status}} <br>
                <strong>Email : </strong>{{personnel.email}} <br>
                <strong>Phone : </strong>{{personnel.phone}} <br>
                <strong>Mobile : </strong>{{personnel.mobile}} <br>
                <strong>Epic No : </strong>{{personnel.epic}} <br>
                <strong>Part No : </strong>{{personnel.part_no}} <br>
                <strong>Serial No : </strong>{{personnel.sl_no}} <br>
                <strong>Qualification : </strong>{{personnel.qualification_id}} <br>
                <strong>Bank AC Number : </strong>{{personnel.bank_account_no}} <br>
                <strong>Branch IFSC Number : </strong>{{personnel.branch_ifsc}} <br>
                <strong>District : </strong>{{personnel.district_id}} <br>
                <strong>Subdivision : </strong>{{personnel.subdivision_id}} <br>
                <strong>Permanent Block/Municipality : </strong>{{personnel.block_muni_perm_id}} <br>
                <strong>Permanent Assembly Constituency : </strong>{{personnel.assembly_perm_id}} <br>
                <strong>Remark : </strong>{{personnel.remark_id}} <br>
                  </v-flex>
                  <v-flex xs1><v-btn fab dark small color="primary" id="printbtn"> <v-icon dark @click="print_personnel"  title="Click to print personnel">print</v-icon></v-btn></v-flex>
                </v-layout>


               </td>
              </tr>
              </tbody>
              </table>



        </v-card>
      </v-flex>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    name:'PersonnelSearch',
    data: () => ({
      tableloading: false,
      deleting:false,
      searching:false,
      personnel_search: '',
      personnels: [],
      not_found:false,
      alert:false,
      items_found:0
    }),

    computed: {
      getuser(){
          return this.$store.getters.getUser
       },
    },

    watch: {
      personnel_search:function(val){
        if(this.personnel_search == null || this.personnel_search==''){
          this.personnels=[]
          this.items_found=0
        }
      }
    },

    created () {

    },

    methods: {
      search_personnel () {
        this.alert=false
        this.not_found=false
        this.tableloading=true
        if(this.personnel_search.length>0 && this.personnel_search.trim()!=''){
          this.searching=true
          axios.post('/personnelInformation',{
            s:this.personnel_search
          })
          .then((response, data) => {
            if(response.data.length === 0){
              this.personnels=[]
              this.items_found=0
              this.tableloading=false
              this.searching=false
              this.not_found=true
              this.alert=true
            }
          else{
            this.items_found=response.data.length
            this.personnels=[]
              response.data.forEach(item => {
                  this.personnels.push(item)
                })
                this.tableloading=false
                this.searching=false
          }
              })
          .catch(error => {
            console.log(error)
            this.tableloading=false
            this.searching=false
          })

        }
        else{

        }

      },
      print_personnel(){
        printJS({ printable: 'print', type: 'html', header: 'Polling Personnel Management System , Seraching copy of Personnel',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })
      }



    }
  }
</script>
