<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">

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
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Assemblywise Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="10%" ><strong>Serial No</strong></th>
                <th width="20%"><strong>Assembly Details</strong></th>
                <th width="10%" ><strong>No of Polling<br> Booth(Male)</strong></th>
                <th width="10%"><strong>No of Polling<br> Booth(Female)</strong></th>
                <!-- <th width="40%" id="exclude" ><strong>Update Requirement</strong></th> -->
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">({{ report.id }}) {{ report.name }}</td>
                  <td class="nopad">
                    <v-edit-dialog
                      :return-value.sync="report.male_party_count"
                      lazy
                      @save="updaterequirement(report.id,report.male_party_count,report.female_party_count)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ report.male_party_count }}
                      <v-text-field
                        slot="input"
                        v-model="report.male_party_count"

                        label="Edit"
                        single-line

                      ></v-text-field>
                    </v-edit-dialog>

                    </td>
                  <td class="nopad">
                    <v-edit-dialog
                      :return-value.sync="report.female_party_count"
                      lazy
                      @save="updaterequirement(report.id,report.male_party_count,report.female_party_count)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ report.female_party_count }}
                      <v-text-field
                        slot="input"
                        v-model="report.female_party_count"

                        label="Edit"
                        single-line

                      ></v-text-field>
                    </v-edit-dialog>
                   </td>
                  <!-- <td class="nopad" id="exclude">
                    <v-layout row wrap>
                      <v-flex xs1></v-flex>
                      <v-flex xs3><v-text-field label="Male" prepend-icon=""  v-model="report.male_party_count" ></v-text-field></v-flex>
                      <v-flex xs1></v-flex>
                      <v-flex xs3><v-text-field label="Female" prepend-icon="" v-model="report.female_party_count" ></v-text-field></v-flex>
                      <v-flex xs4><v-btn color="primary" @click="updaterequirement(report.id,report.male_party_count,report.female_party_count)" :disabled="disable_save">Update</v-btn></v-flex>
                    </v-layout>
                  </td> -->
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
  name: 'AssemblywiserequirementUpdate',
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
       this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = response.data
          this.snackbar =true
      })
      .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!! '+error
          this.snackbar =true
      })
     }

  },

  created(){

    axios.get('/getdistrict')
      .then((response, data) => { //console.log(response.data['available'])
       response.data.forEach(item => { //console.log(item)
          this.districts.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style scoped>
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

