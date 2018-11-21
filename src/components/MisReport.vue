<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report As On {{ new Date().toLocaleString() }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'MIS Report - Districtwise',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-2">
            <h1 class="headline">Districtwise Male</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="10%" rowspan="2"><strong>Dist ID</strong></th>
                <th width="25%" rowspan="2"><strong>District</strong></th>
                <th width="15%" rowspan="2"><strong>Actual Requirement of<br> Polling Personnel<br> of each category</strong></th>
                <th width="50%" colspan="6"><strong>Available Male</strong></th>

                </tr>
                <tr>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>Total</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}" title="Click to See Subdivisionwise Report">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.male_party }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.PR_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.P1_M }}</td>
                  <td class="nopad" :class="report.P2_M_class">{{ report.P2_M }}</td>
                  <td class="nopad" :class="report.P3_M_class">{{ report.P3_M }}</td>
                  <td class="nopad">{{ report.MO_M }}</td>
                  <td >{{ parseInt(report.PR_M)+parseInt(report.P1_M)+parseInt(report.P2_M)+parseInt(report.P3_M)+parseInt(report.MO_M) }}</td>
                  </tr>
                  <tr v-if="this.loadingTXT != 'No data found'"><td></td><td class="nopad"><strong>Total</strong></td><td class="nopad">{{male_party_count}}</td><td class="nopad">{{PR_M_COUNT}} </td><td class="nopad">{{P1_M_COUNT}}</td><td class="nopad">{{P2_M_COUNT}}</td><td class="nopad">{{P3_M_COUNT}}</td><td class="nopad">{{MO_M_COUNT}}</td><td>&nbsp;</td></tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 mb-5>
            <h1 class="headline">Districtwise Female </h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" id=""  border=1>
                <thead>
                <tr>
                <th width="10%" rowspan="2"><strong>Dist ID</strong></th>
                <th width="25%" rowspan="2"><strong>District</strong></th>
                <th width="15%" rowspan="2"><strong>Actual Requirement of<br> Polling Personnel<br> of each category</strong></th>

                <th width="50%" colspan="6"><strong>Available Female</strong></th>
                </tr>
                <tr>

                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>Total</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}" title="Click to See Subdivisionwise Report">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.female_party }}</td>

                  <td class="nopad" :class="report.PR_F_class">{{ report.PR_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.P1_F }}</td>
                  <td class="nopad" :class="report.P2_F_class">{{ report.P2_F }}</td>
                  <td class="nopad" :class="report.P3_F_class">{{ report.P3_F }}</td>
                  <td class="nopad" >{{ report.MO_F }}</td>
                  <td>{{ parseInt(report.PR_F)+parseInt(report.P1_F)+parseInt(report.P2_F)+parseInt(report.P3_F)+parseInt(report.MO_F) }}</td>
                  </tr>
                  <tr v-if="this.loadingTXT != 'No data found'"><td></td><td class="nopad"><strong>Total</strong><td class="nopad">{{female_party_count}}</td><td class="nopad">{{PR_F_COUNT}} </td><td class="nopad">{{P1_F_COUNT}}</td><td class="nopad">{{P2_F_COUNT}}</td><td class="nopad">{{P3_F_COUNT}}</td><td class="nopad">{{MO_F_COUNT}}</td><td>&nbsp;</td></tr>

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
    }
  },
  computed:{
     getmisdata:function(){
       return this.$store.getters.getMisreport
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
               this.$store.dispatch('storeMISreport', response.data)
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
      if(this.getmisdata != ''){
      this.getmisdata.forEach(item => { //console.log(item)
              item.PR_M_class=this.createclass(item.PR_M,item.male_party)
              item.P1_M_class=this.createclass(item.P1_M,item.male_party)
              item.P2_M_class=this.createclass(item.P2_M,item.male_party)
              item.P3_M_class=this.createclass(item.P3_M,item.male_party)
              item.PR_F_class=this.createclass(item.PR_F,item.female_party)
              item.P1_F_class=this.createclass(item.P1_F,item.female_party)
              item.P2_F_class=this.createclass(item.P2_F,item.female_party)
              item.P3_F_class=this.createclass(item.P3_F,item.female_party)
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
              this.reports.push(item)
            });

    }
    else{
        this.initialize()
    }
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

