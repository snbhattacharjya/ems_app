<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >

          <v-flex xs12 >
            <h1 class="headline">Office Category wise Group Status Report(Male) </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-3" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Sl.<br> No</strong></th>
                <th width="20%"><strong>Office Category</strong></th>
                <th width="15%" ><strong>Group A <br>(Available)</strong></th>
                <th width="15%" ><strong>Group B <br>(Available)</strong></th>
                <th width="15%" ><strong>Group C <br>(Available)</strong></th>
                <th width="15%" ><strong>Group D <br>(Available)</strong></th>
                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports_male" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.A_M }}</td>
                  <td class="nopad">{{ report.B_M }}</td>
                  <td class="nopad">{{ report.C_M }}</td>
                  <td class="nopad">{{ report.D_M}}</td>


                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>
                    <td class="nopad">{{this.dist_total_A_M}}</td>
                    <td class="nopad">{{this.dist_total_B_M}}</td>
                    <td class="nopad">{{this.dist_total_C_M}}</td>
                    <td class="nopad">{{this.dist_total_D_M}}</td>

                  </tr>
                  <!-- <tr>
                    <td colspan="5" class="nopad"><strong>Total(Male)</strong></td>
                    <td class="nopad">{{this.dist_total_A_M+this.dist_total_B_M+this.dist_total_C_M+this.dist_total_D_M}}</td>


                  </tr> -->

                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Office Category wise Group Status Report(Female) </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-3" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Sl.<br> No</strong></th>
                <th width="20%"><strong>Office Category</strong></th>
                <th width="15%" ><strong>Group A <br>(Available)</strong></th>
                <th width="15%" ><strong>Group B <br>(Available)</strong></th>
                <th width="15%" ><strong>Group C <br>(Available)</strong></th>
                <th width="15%" ><strong>Group D <br>(Available)</strong></th>
                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports_female" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.A_F }}</td>
                  <td class="nopad">{{ report.B_F }}</td>
                  <td class="nopad">{{ report.C_F }}</td>
                  <td class="nopad">{{ report.D_F}}</td>

                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>
                    <td class="nopad">{{this.dist_total_A_F}}</td>
                    <td class="nopad">{{this.dist_total_B_F}}</td>
                    <td class="nopad">{{this.dist_total_C_F}}</td>
                    <td class="nopad">{{this.dist_total_D_F}}</td>
                  </tr>
                  <!-- <tr>
                    <td colspan="5" class="nopad"><strong>Total(Female)</strong></td>
                    <td class="nopad">{{this.dist_total_A_F+this.dist_total_B_F+this.dist_total_C_F+this.dist_total_D_F}}</td>


                  </tr> -->

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
  name: 'OfficecategorywiseGroup',
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
      dist_total_A_M:0,
      dist_total_B_M:0,
      dist_total_C_M:0,
      dist_total_D_M:0,
      dist_total_A_F:0,
      dist_total_B_F:0,
      dist_total_C_F:0,
      dist_total_D_F:0,


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
            axios.get('/groupwisepp')
              .then((response, data) => {
                if(response.data['ávailable'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['ávailable'].forEach(item => {
                      item['sl']=this.count_m
                      if(!item.A_M){item.A_M=0}
                      if(!item.B_M){item.B_M=0}
                      if(!item.C_M){item.C_M=0}
                      if(!item.D_M){item.D_M=0}

                      this.dist_total_A_M += parseInt(item.A_M)
                      this.dist_total_B_M += parseInt(item.B_M)
                      this.dist_total_C_M += parseInt(item.C_M)
                      this.dist_total_D_M += parseInt(item.D_M)

                      this.reports_male.push(item)

                      this.count_m++
                    })

                    response.data['ávailable'].forEach(item => {
                      item['sl']=this.count_f
                      if(!item.A_F){item.A_F=0}
                      if(!item.B_F){item.B_F=0}
                      if(!item.C_F){item.C_F=0}
                      if(!item.D_F){item.D_F=0}

                      this.dist_total_A_F += parseInt(item.A_F)
                      this.dist_total_B_F += parseInt(item.B_F)
                      this.dist_total_C_F += parseInt(item.C_F)
                      this.dist_total_D_F += parseInt(item.D_F)
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

