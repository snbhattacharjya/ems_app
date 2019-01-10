<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >

          <v-flex xs12 >
            <h1 class="headline">Office Category wise Post Status Report(Male) </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-3" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Sl.<br> No</strong></th>
                <th width="20%"><strong>Office Category</strong></th>
                <th width="15%" ><strong>Not<br> Assigned</strong></th>
                <th width="15%" ><strong>AEO <br>(Available)</strong></th>
                <th width="15%" ><strong>PR <br>(Available)</strong></th>
                <th width="15%" ><strong>P1 <br>(Available)</strong></th>
                <th width="15%" ><strong>P2 <br>(Available)</strong></th>
                <th width="15%" ><strong>P3 <br>(Available)</strong></th>
                <th width="15%" ><strong>MO <br>(Available)</strong></th>
                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports_male" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.NA }}</td>
                  <td class="nopad">{{ report.AEO }}</td>
                  <td class="nopad">{{ report.PR }}</td>
                  <td class="nopad">{{ report.P1}}<br></td>
                  <td class="nopad">{{ report.P2 }}<br></td>
                  <td class="nopad">{{ report.P3}}<br></td>
                  <td class="nopad">{{ report.MO }}<br></td>

                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>
                    <td class="nopad">{{this.dist_total_NA_M}}</td>
                    <td class="nopad">{{this.dist_total_AEO_M}}</td>
                    <td class="nopad">{{this.dist_total_PR_M}}</td>
                    <td class="nopad">{{this.dist_total_P1_M}}</td>
                    <td class="nopad">{{this.dist_total_P2_M}}</td>
                    <td class="nopad">{{this.dist_total_P3_M}}</td>
                    <td class="nopad">{{this.dist_total_MO_M}}</td>
                  </tr>

                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Office Category wise Post Status Report(Female) </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-3" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Sl.<br> No</strong></th>
                <th width="20%"><strong>Office Category</strong></th>
                <th width="15%" ><strong>Not<br> Assigned</strong></th>
                <th width="15%" ><strong>AEO <br>(Available)</strong></th>
                <th width="15%" ><strong>PR <br>(Available)</strong></th>
                <th width="15%" ><strong>P1 <br>(Available)</strong></th>
                <th width="15%" ><strong>P2 <br>(Available)</strong></th>
                <th width="15%" ><strong>P3 <br>(Available)</strong></th>
                <th width="15%" ><strong>MO <br>(Available)</strong></th>
                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports_female" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.NA }}</td>
                  <td class="nopad">{{ report.AEO }}</td>
                  <td class="nopad">{{ report.PR }}</td>
                  <td class="nopad">{{ report.P1}}<br></td>
                  <td class="nopad">{{ report.P2 }}<br></td>
                  <td class="nopad">{{ report.P3}}<br></td>
                  <td class="nopad">{{ report.MO }}<br></td>

                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>
                    <td class="nopad">{{this.dist_total_NA_F}}</td>
                    <td class="nopad">{{this.dist_total_AEO_F}}</td>
                    <td class="nopad">{{this.dist_total_PR_F}}</td>
                    <td class="nopad">{{this.dist_total_P1_F}}</td>
                    <td class="nopad">{{this.dist_total_P2_F}}</td>
                    <td class="nopad">{{this.dist_total_P3_F}}</td>
                    <td class="nopad">{{this.dist_total_MO_F}}</td>
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
  name: 'OfficecategorywisePoststatus',
  props: {

  },
  data(){
    return {
      reports_male:[],
      reports_female:[],
      district:'',
      search: '',
      count_m:1,
      count_f:1,
      tableloading:false,
      disable_save:false,
      loadingtxt:'Loading...',
      dist_old:'',
      dist_total_NA_M:0,
      dist_total_AEO_M:0,
      dist_total_PR_M:0,
      dist_total_P1_M:0,
      dist_total_P2_M:0,
      dist_total_P3_M:0,
      dist_total_MO_M:0,
      dist_total_NA_F:0,
      dist_total_AEO_F:0,
      dist_total_PR_F:0,
      dist_total_P1_F:0,
      dist_total_P2_F:0,
      dist_total_P3_F:0,
      dist_total_MO_F:0,

    }
  },
   computed: {
       getUser:function(){
          return this.$store.getters.getUser
       },
    },

  methods:{
     show:function(){


          this.tableloading=true
          this.disable_save=true
          this.reports_male=[]
          this.reports_female=[]
          this.count=1
          this.loadingtxt='Loading...'
            axios.get('/poststatusWise_pp')
              .then((response, data) => {
                if(response.data['availableMale'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['availableMale'].forEach(item => {
                      item['sl']=this.count_m
                      if(!item.NA){item.NA=0}
                      if(!item.AEO){item.AEO=0}
                      if(!item.PR){item.PR=0}
                      if(!item.P1){item.P1=0}
                      if(!item.P2){item.P2=0}
                      if(!item.P3){item.P3=0}
                      if(!item.MO){item.MO=0}
                      this.dist_total_NA_M += parseInt(item.NA)
                      this.dist_total_AEO_M += parseInt(item.AEO)
                      this.dist_total_PR_M += parseInt(item.PR)
                      this.dist_total_P1_M += parseInt(item.P1)
                      this.dist_total_P2_M += parseInt(item.P2)
                      this.dist_total_P3_M += parseInt(item.P3)
                      this.dist_total_MO_M += parseInt(item.MO)
                      this.reports_male.push(item)

                      this.count_m++
                    })

                    response.data['availableFemale'].forEach(item => {
                      item['sl']=this.count_f
                      if(!item.NA){item.NA=0}
                      if(!item.AEO){item.AEO=0}
                      if(!item.PR){item.PR=0}
                      if(!item.P1){item.P1=0}
                      if(!item.P2){item.P2=0}
                      if(!item.P3){item.P3=0}
                      if(!item.MO){item.MO=0}
                      this.dist_total_NA_F += parseInt(item.NA)
                      this.dist_total_AEO_F += parseInt(item.AEO)
                      this.dist_total_PR_F += parseInt(item.PR)
                      this.dist_total_P1_F += parseInt(item.P1)
                      this.dist_total_P2_F += parseInt(item.P2)
                      this.dist_total_P3_F += parseInt(item.P3)
                      this.dist_total_MO_F += parseInt(item.MO)
                      this.reports_female.push(item)

                      this.count_f++
                    })


                    this.tableloading=false
                    this.disable_save=false
                }
              })
              .catch(error => {
                console.log(error)
              })


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
     this.district= this.getUser.district[0]
     this.show()

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

