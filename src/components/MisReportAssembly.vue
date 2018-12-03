<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleString() }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude','clk2e'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >
          <v-flex xs12 class="my-5" id="exclude">
            <v-layout row wrap >
              <v-flex xs9>
                <v-select
                :items="districts"
                v-model="district_id"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select district"
                >
              </v-select>
              </v-flex>
              <v-flex xs3>
                <v-btn color="primary" @click="show" :disabled="disable_save">Show</v-btn>


              </v-flex>
              <v-btn color="primary" :to="'/assembly_wise_reserved'">Reserve Report</v-btn>
              <v-btn color="primary" :to="'/assembly_groupby_subdivision'">Subdivision wise Assembly Report</v-btn>
              <v-btn color="primary" :to="'/pollingpersonnel_progress_report'">Polling Personnel Progress Report</v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Assemblywise Requirement Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="10%" ><strong>Serial No</strong></th>
                <th width="10%"><strong>Assembly ID</strong></th>
                <th width="40%" ><strong>Assembly Name</strong></th>
                <th width="20%" ><strong>No of Polling Booth(Male)</strong></th>
                <th width="20%"><strong>No of Polling Booth(Female)</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.id }}</td>
                  <td class="nopad">{{ report.name }}</td>
                 <td v-if="getUser.level == 12" class="text--center" id="edt">
                    <v-edit-dialog
                      :return-value.sync="report.male_party_count"
                      lazy
                      large
                      @save="updaterequirement(report.id,report.male_party_count,report.female_party_count)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ report.male_party_count }} <v-icon small id="clk2e" class="ml-5" color="info" title="Click to Edit">edit</v-icon>
                      <v-text-field
                        slot="input"
                        v-model="report.male_party_count"

                        label="Edit"
                        single-line

                      ></v-text-field>
                    </v-edit-dialog>

                    </td>
                    <td v-else class="nopad">{{ report.male_party_count }}</td>
                  <td v-if="getUser.level == 12" class="text--center" id="edt">
                    <v-edit-dialog
                      :return-value.sync="report.female_party_count"
                      lazy
                      large
                      @save="updaterequirement(report.id,report.male_party_count,report.female_party_count)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ report.female_party_count }}<v-icon small id="clk2e" class="ml-5" color="info" title="Click to Edit">edit</v-icon>
                      <v-text-field
                        slot="input"
                        v-model="report.female_party_count"

                        label="Edit"
                        single-line

                      ></v-text-field>
                    </v-edit-dialog>
                   </td>
                   <td v-else class="nopad">{{ report.female_party_count }}</td>
                  </tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
           <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :topo=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-layout>
      </section>
    </v-container>

  </div>

</template>




<script>
export default {
  name: 'MisReportAssembly',
  props: {

  },
  data(){
    return {
      reports:[],
      districts:[],
      district:'',
      district_id:'',
      search: '',
      count:1,
      tableloading:false,
      disable_save:false,
      loadingtxt:'Loading...',
      dist_old:'',
      snackbar: false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
    }
  },

  methods:{
     show:function(){
       if(this.dist_old != '' && this.district_id === this.dist_old){
          console.log('same district')

       }
       else{
          this.dist_old=this.district_id
          this.tableloading=true
          this.disable_save=true
          this.reports=[]
          this.count=1
          this.loadingtxt='Loading...'
            axios.get('/assemblyreport/'+this.district_id)
              .then((response, data) => { console.log(response.data['available'].length)
                if(response.data['available'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['available'].forEach(item => { //console.log(item)
                      item['sl']=this.count
                      this.reports.push(item)
                      this.count++
                    });
                    this.district=response.data['district']
                    this.tableloading=false
                    this.disable_save=false
                }
              })
              .catch(error => {
                console.log(error)
              })
       }

     },
     updaterequirement(id,male_party_count,female_party_count){
       axios.post('/updateassemblyreport',{
        assembly_id: id,
        male_party_count: male_party_count,
        female_party_count:female_party_count,
        district_id: this.district_id
        })
      .then((response, data) => {
        this.show_message = false
          this.message_type = ''
          this.message_icon = ''
          this.message_text = ''
          this.snackbar =false
       this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = response.data
          this.snackbar =true
      })
      .catch(error => {
        this.show_message = false
          this.message_type = ''
          this.message_icon = ''
          this.message_text = ''
          this.snackbar =false
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!! '+error
          this.snackbar =true
      })
     },
     cancel () {
          // this.show_message = false
          // this.message_type = ''
          // this.message_icon = ''
          // this.message_text = ''
          // this.snackbar =false
          // this.show_message = true
          // this.message_type = 'error'
          // this.message_icon = 'warning'
          // this.message_text = 'Operation Canceled'
          // this.snackbar =true
      },
      open () {
        this.show_message = false
          this.message_type = ''
          this.message_icon = ''
          this.message_text = ''
          this.snackbar =false
      },


  },
  computed: {
      getUser:function(){
        return this.$store.getters.getUser
      }
    },
  created(){

    axios.get('/getdistrict')
      .then((response, data) => { //console.log(response.data['available'])
       response.data.forEach(item => { //console.log(item)
          this.districts.push(item)
        })

          if(this.getUser.level != 2){
          this.dist_old=99
          this.district_id=this.getUser.area
          this.show()
          }
      })
      .catch(error => {
        console.log(error)
      })

  }
}
</script>
<style scoped>
#clk2e{ display: none;}
#edt:hover  #clk2e{ display: block;}
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

