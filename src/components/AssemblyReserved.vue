<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
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
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Assemblywise Reserved Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Serial<br> No</strong></th>
                <th width="20%"><strong>Assembly</strong></th>
                <th width="15%" ><strong>No of Polling Booth<br>(Required)</strong></th>
                <th width="15%" ><strong>With 10% Reserved</strong></th>
                <th width="15%" ><strong>With 15% Reserved</strong></th>
                <th width="15%"><strong>With 20% Reserved</strong></th>
                <th width="15%"><strong>With 25% Reserved</strong></th>
                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">({{ report.id }}) {{ report.name }}</td>
                  <td class="nopad">{{ report.total }}</td>
                  <td class="nopad">{{ calculatepercentage(report.total,'10')}}<br></td>
                  <td class="nopad">{{ calculatepercentage(report.total,'15')}}<br></td>
                  <td class="nopad">{{ calculatepercentage(report.total,'20')}}<br></td>
                  <td class="nopad">{{ calculatepercentage(report.total,'25')}}<br></td>
                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>

                    <td class="nopad">{{this.dist_total_req}}</td>
                    <td class="nopad">{{this.dist_total_req_10}}</td>
                    <td class="nopad">{{this.dist_total_req_15}}</td>
                    <td class="nopad">{{this.dist_total_req_20}}</td>
                    <td class="nopad">{{this.dist_total_req_25}}</td>
                  </tr>

                </tbody>
              </table>
            </v-layout>
          </v-flex>
        </v-layout>
      </section>
    </v-container>

  </div>

</template>




<script>
export default {
  name: 'AssemblywiseReserved',
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
      dist_total_req:0,
      dist_total_req_10:0,
      dist_total_req_15:0,
      dist_total_req_20:0,
      dist_total_req_25:0,
    }
  },
   computed: {
       getUser:function(){
          return this.$store.getters.getUser
       },
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
              .then((response, data) => {
                if(response.data['available'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['available'].forEach(item => { //console.log(item)
                      item['sl']=this.count
                      item['total']=parseInt(item.male_party_count)+parseInt(item.female_party_count)
                      this.reports.push(item)
                      this.dist_total_req += parseInt(item['total'])

                      this.count++
                    })
                      this.dist_total_req_10 =Math.round((this.dist_total_req*4)*1.1,0)
                      this.dist_total_req_15 =Math.round((this.dist_total_req*4)*1.15,0)
                      this.dist_total_req_20 =Math.round((this.dist_total_req*4)*1.2,0)
                      this.dist_total_req_25 =Math.round((this.dist_total_req*4)*1.25,0)
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
     calculatepercentage(val,percent){
       var v=0
       val=parseInt(val*4)
       var p=percent/100
       v=parseFloat((val*p))+parseInt(val)
       return Math.round(v,0)

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
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

