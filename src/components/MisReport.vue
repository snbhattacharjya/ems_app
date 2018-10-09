<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report As On {{ new Date().toLocaleString() }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'MIS Report - Districtwise',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
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
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.male_party }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.PR_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.P1_M }}</td>
                  <td class="nopad" :class="report.P2_M_class">{{ report.P2_M }}</td>
                  <td class="nopad" :class="report.P3_M_class">{{ report.P3_M }}</td>
                  <td class="nopad">{{ report.MO_M }}</td>
                  <td>{{ parseInt(report.PR_M)+parseInt(report.P1_M)+parseInt(report.P2_M)+parseInt(report.P3_M) }}</td>
                  </tr>
                  <tr><td>Total</td><td>Total</td><td>Total</td><td>Total -  </td><td>Total</td><td>Total</td><td>Total</td><td>Total</td><td>Total</td></tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12>
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
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.female_party }}</td>

                  <td class="nopad" :class="report.PR_F_class">{{ report.PR_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.P1_F }}</td>
                  <td class="nopad" :class="report.P2_F_class">{{ report.P2_F }}</td>
                  <td class="nopad" :class="report.P3_F_class">{{ report.P3_F }}</td>
                  <td class="nopad" >{{ report.MO_F }}</td>
                  <td>{{ parseInt(report.PR_F)+parseInt(report.P1_F)+parseInt(report.P2_F)+parseInt(report.P3_F) }}</td>
                  </tr>
                  <tr><td>Total</td><td>Total</td><td>Total</td><td>Total</td><td>Total</td><td>Total</td><td>Total</td><td>Total</td><td>Total</td></tr>

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
      tableloading:false,
      item_class:'',


    }
  },
  computed:{
     getmisdata:function(){
       return this.$store.getters.getMisreport
     }
  },
  methods:{
    createclass:function(item,compare){
      if(compare > item){this.item_class='red--text'}
      else if(compare <= item){this.item_class='green--text'}
      else{ this.item_class='green--text' }

      return this.item_class
    },
    initialize:function(){
      this.tableloading=true
        axios.get('/report')
          .then((response, data) => {this.$store.dispatch('storeMISreport', response.data)
          item.PR_M_COUNT=0
          response.data.forEach(item => { //console.log(item)
              item.PR_M_class=this.createclass(item.PR_M,item.male_party)
              item.P1_M_class=this.createclass(item.P1_M,item.male_party)
              item.P2_M_class=this.createclass(item.P2_M,item.male_party)
              item.P3_M_class=this.createclass(item.P3_M,item.male_party)
              item.PR_F_class=this.createclass(item.PR_F,item.female_party)
              item.P1_F_class=this.createclass(item.P1_F,item.female_party)
              item.P2_F_class=this.createclass(item.P2_F,item.female_party)
              item.P3_F_class=this.createclass(item.P3_F,item.female_party)
              item.PR_M_COUNT+=parseInt(PR_M)
              this.reports.push(item)
            });
            console.log('Count - '+reports)
            this.tableloading=false

          })
          .catch(error => {
            console.log(error)
          })
    }

  },

  created(){
      if(this.getmisdata != ''){
     this.reports=this.getmisdata
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

