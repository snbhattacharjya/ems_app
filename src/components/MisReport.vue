<template>
  <div id="pageDashboard">
    <v-container fluid>
      <v-layout row wrap v-if="getUser.level == 2 " >
      <v-btn color="primary" :to="'/district_wise_pp_status'">District wise polling personnel status</v-btn>
      <v-btn v-if="this.getUser.level == 2" color="info" :to="'/data_sharing_ceo'">Data Sharing</v-btn>
      <v-btn v-if="this.getUser.level == 2" color="info" :to="'/office_category_wise_post_status'">Office Categorywise Post Status</v-btn>
      <v-btn v-if="this.getUser.level == 2" color="info" :to="'/remarkwise_report'">Remarkwise Personnel Report(PP2)</v-btn>
      <v-btn  color="info" :to="'/epicnumbererror'">Epic Number Error</v-btn>
      <v-btn  color="info" :to="'/serach_personnel'">Search Personnel</v-btn>
      </v-layout>
      <v-btn v-if="this.getUser.level == 12" color="info" :to="'/data_sharing_deo'">Data Sharing</v-btn>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'Polling Personnel Management System',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-2">
            <h1 class="headline">Districtwise PP Requirement & Available(Male)</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="5%" rowspan="2"><strong>Dist ID</strong></th>
                <th width="10%" rowspan="2"><strong>District</strong></th>
                <th width="13%" rowspan="2"><strong>Actual <br>Requirement<br> of Polling <br>Personnel<br> of each <br>category</strong></th>
                <th width="12%" rowspan="2"><strong>With 20%<br> Requirement</strong></th>
                <th width="60%" colspan="9"><strong>Available Male</strong></th>

                </tr>
                <tr>
                <th>Not <br>Assigned</th>
                <th>AEO</th>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>Exempted</th>
                <th>Total</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}" title="Click to See Subdivisionwise Report">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.male_party }}</td>
                  <td class="nopad">{{ (report.male_party*1.2).toFixed(0) }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.NA_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.AEO_M }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.PR_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.P1_M }}</td>
                  <td class="nopad" :class="report.P2_M_class">{{ report.P2_M }}</td>
                  <td class="nopad" :class="report.P3_M_class">{{ report.P3_M }}</td>
                  <td class="nopad">{{ report.MO_M }}</td>
                  <td class="nopad">{{ report.EXE_M }}</td>
                  <td >{{ parseInt(report.NA_M)+parseInt(report.PR_M)+parseInt(report.P1_M)+parseInt(report.P2_M)+parseInt(report.P3_M)+parseInt(report.MO_M)+parseInt(report.EXE_M) }}</td>
                  </tr>
                  <tr v-if="this.loadingTXT != 'No data found'">
                    <td></td>
                    <td class="nopad"><strong>Total</strong></td>
                    <td class="nopad">{{male_party_count}}</td>
                    <td class="nopad">{{(male_party_count*1.2).toFixed(0)}}</td>
                    <td class="nopad">{{NA_M_COUNT}}</td>
                    <td class="nopad">{{AEO_M_COUNT}}</td>
                    <td class="nopad">{{PR_M_COUNT}} </td>
                    <td class="nopad">{{P1_M_COUNT}}</td>
                    <td class="nopad">{{P2_M_COUNT}}</td>
                    <td class="nopad">{{P3_M_COUNT}}</td>
                    <td class="nopad">{{MO_M_COUNT}}</td>
                    <td class="nopad">{{EXE_M_COUNT}}</td>
                  </tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 mb-5>
            <h1 class="headline">Districtwise PP Requirement & Available(Female) </h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" id=""  border=1>
                <thead>
                <tr>
                 <th width="5%" rowspan="2"><strong>Dist ID</strong></th>
                <th width="10%" rowspan="2"><strong>District</strong></th>
                <th width="13%" rowspan="2"><strong>Actual <br>Requirement<br> of Polling <br>Personnel<br> of each <br>category</strong></th>
                <th width="12%" rowspan="2"><strong>With 20%<br> Requirement</strong></th>
                <th width="60%" colspan="9"><strong>Available Female</strong></th>
                </tr>
                <tr>
                <th>Not <br>Assigned</th>
                <th>AEO</th>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>Exempted</th>
                <th>Total</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}" title="Click to See Subdivisionwise Report">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.female_party }}</td>
                  <td class="nopad">{{ (report.female_party*1.2).toFixed(0) }}</td>
                  <td class="nopad" :class="report.PR_F_class">{{ report.NA_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.AEO_F }}</td>
                  <td class="nopad" :class="report.PR_F_class">{{ report.PR_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.P1_F }}</td>
                  <td class="nopad" :class="report.P2_F_class">{{ report.P2_F }}</td>
                  <td class="nopad" :class="report.P3_F_class">{{ report.P3_F }}</td>
                  <td class="nopad" >{{ report.MO_F }}</td>
                  <td class="nopad">{{ report.EXE_F }}</td>
                  <td>{{ parseInt(report.NA_F)+parseInt(report.PR_F)+parseInt(report.P1_F)+parseInt(report.P2_F)+parseInt(report.P3_F)+parseInt(report.MO_F)+parseInt(report.EXE_F) }}</td>
                  </tr>
                  <tr v-if="this.loadingTXT != 'No data found'">
                    <td></td>
                    <td class="nopad"><strong>Total</strong></td>
                    <td class="nopad">{{female_party_count}}</td>
                    <td class="nopad">{{(female_party_count*1.2).toFixed(0)}}</td>
                    <td class="nopad">{{NA_F_COUNT}}</td>
                    <td class="nopad">{{AEO_F_COUNT}}</td>
                    <td class="nopad">{{PR_F_COUNT}} </td>
                    <td class="nopad">{{P1_F_COUNT}}</td>
                    <td class="nopad">{{P2_F_COUNT}}</td>
                    <td class="nopad">{{P3_F_COUNT}}</td>
                    <td class="nopad">{{MO_F_COUNT}}</td>
                    <td class="nopad">{{EXE_F_COUNT}}</td>
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
  name: 'MisReport',
  props: {

  },
  data(){
    return {
      reports:[],
      search: '',
      loadingTXT: 'Loading...',
      tableloading:false,
      item_class:'',
      male_party_count:0,
      female_party_count:0,
      PR_M_COUNT:0,
      P1_M_COUNT:0,
      P2_M_COUNT:0,
      P3_M_COUNT:0,
      PR_F_COUNT:0,
      P1_F_COUNT:0,
      P2_F_COUNT:0,
      P3_F_COUNT:0,
      MO_M_COUNT:0,
      MO_F_COUNT:0,
      NA_M_COUNT:0,
      NA_F_COUNT:0,
      AEO_M_COUNT:0,
      AEO_F_COUNT:0,
      EXE_M_COUNT:0,
      EXE_F_COUNT:0,
    }
  },
  computed:{
     getmisdata:function(){
       return this.$store.getters.getMisreport
     },
     getUser:function(){
        return this.$store.getters.getUser
      }
  },
  methods:{
    createclass:function(available,requirement){

      if(parseInt(requirement) > parseInt(available)){this.available_class='red--text'}
      else if(parseInt(requirement) <= parseInt(available)){this.available_class='green--text'}
      else{ this.available_class='green--text' }
      requirement=0
      available=0
      return this.item_class
    },
    initialize:function(){
      this.tableloading=true
        axios.get('/report')
          .then((response, data) => {
            if(response.data.length != 0 || response.data!=''){
               //this.$store.dispatch('storeMISreport', response.data)
            response.data.forEach(item => { //console.log(item)
              // item.PR_M_class=this.createclass(item.PR_M,item.male_party)
              // item.P1_M_class=this.createclass(item.P1_M,item.male_party)
              // item.P2_M_class=this.createclass(item.P2_M,item.male_party)
              // item.P3_M_class=this.createclass(item.P3_M,item.male_party)
              // item.PR_F_class=this.createclass(item.PR_F,item.female_party)
              // item.P1_F_class=this.createclass(item.P1_F,item.female_party)
              // item.P2_F_class=this.createclass(item.P2_F,item.female_party)
              // item.P3_F_class=this.createclass(item.P3_F,item.female_party)
              this.PR_M_COUNT+=parseInt(item.PR_M)
              this.P1_M_COUNT+=parseInt(item.P1_M)
              this.P2_M_COUNT+=parseInt(item.P2_M)
              this.P3_M_COUNT+=parseInt(item.P3_M)
              this.PR_F_COUNT+=parseInt(item.PR_F)
              this.P1_F_COUNT+=parseInt(item.P1_F)
              this.P2_F_COUNT+=parseInt(item.P2_F)
              this.P3_F_COUNT+=parseInt(item.P3_F)
              this.male_party_count+=parseInt(item.male_party)
              this.female_party_count+=parseInt(item.female_party)
              this.MO_M_COUNT+=parseInt(item.MO_M)
              this.MO_F_COUNT+=parseInt(item.MO_F)
              this.NA_M_COUNT+=parseInt(item.NA_M)
              this.NA_F_COUNT+=parseInt(item.NA_F)
              this.AEO_M_COUNT+=parseInt(item.AEO_M)
              this.AEO_F_COUNT+=parseInt(item.AEO_F)
              this.EXE_M_COUNT+=parseInt(item.EXE_M)
              this.EXE_F_COUNT+=parseInt(item.EXE_F)
              this.reports.push(item)

            })
            this.tableloading=false
            }
            else{
              this.loadingTXT='No data found'
            }


          })
          .catch(error => {
            console.log(error)
          })
    }

  },

  created(){
    this.initialize()
    //   if(this.getmisdata != ''){
    //   this.getmisdata.forEach(item => { //console.log(item)
    //           item.PR_M_class=this.createclass(item.PR_M,item.male_party)
    //           item.P1_M_class=this.createclass(item.P1_M,item.male_party)
    //           item.P2_M_class=this.createclass(item.P2_M,item.male_party)
    //           item.P3_M_class=this.createclass(item.P3_M,item.male_party)
    //           item.PR_F_class=this.createclass(item.PR_F,item.female_party)
    //           item.P1_F_class=this.createclass(item.P1_F,item.female_party)
    //           item.P2_F_class=this.createclass(item.P2_F,item.female_party)
    //           item.P3_F_class=this.createclass(item.P3_F,item.female_party)
    //           this.PR_M_COUNT+=parseInt(item.PR_M)
    //           this.P1_M_COUNT+=parseInt(item.P1_M)
    //           this.P2_M_COUNT+=parseInt(item.P2_M)
    //           this.P3_M_COUNT+=parseInt(item.P3_M)
    //           this.PR_F_COUNT+=parseInt(item.PR_F)
    //           this.P1_F_COUNT+=parseInt(item.P1_F)
    //           this.P2_F_COUNT+=parseInt(item.P2_F)
    //           this.P3_F_COUNT+=parseInt(item.P3_F)
    //           this.male_party_count+=parseInt(item.male_party)
    //           this.female_party_count+=parseInt(item.female_party)
    //           this.MO_M_COUNT+=parseInt(item.MO_M)
    //           this.MO_F_COUNT+=parseInt(item.MO_F)
    //           this.reports.push(item)
    //         });

    // }
    // else{
    //     this.initialize()
    // }
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

