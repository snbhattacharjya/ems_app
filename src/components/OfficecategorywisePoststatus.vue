<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >

          <v-flex xs12 >
            <h1 class="headline">Office Category wise Post Status Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Serial<br> No</strong></th>
                <th width="20%"><strong>Office Category</strong></th>
                <th width="15%" ><strong>PR (Available)</strong></th>
                <th width="15%" ><strong>P1 (Available)</strong></th>
                <th width="15%" ><strong>P2 (Available)</strong></th>
                <th width="15%" ><strong>P3 (Available)</strong></th>
                <th width="15%" ><strong>MO (Available)</strong></th>
                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.PR }}</td>
                  <td class="nopad">{{ report.P1}}<br></td>
                  <td class="nopad">{{ report.P2 }}<br></td>
                  <td class="nopad">{{ report.P3}}<br></td>
                  <td class="nopad">{{ report.MO }}<br></td>

                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>

                    <td class="nopad">{{this.dist_total_PR}}</td>
                    <td class="nopad">{{this.dist_total_P1}}</td>
                    <td class="nopad">{{this.dist_total_P2}}</td>
                    <td class="nopad">{{this.dist_total_P3}}</td>
                    <td class="nopad">{{this.dist_total_MO}}</td>
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
      reports:[],
      district:'',
      search: '',
      count:1,
      tableloading:false,
      disable_save:false,
      loadingtxt:'Loading...',
      dist_old:'',
      dist_total_PR:0,
      dist_total_P1:0,
      dist_total_P2:0,
      dist_total_P3:0,
      dist_total_MO:0,

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
          this.reports=[]
          this.count=1
          this.loadingtxt='Loading...'
            axios.get('/poststatusWise_pp')
              .then((response, data) => {
                if(response.data['available'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['available'].forEach(item => { //console.log(item)
                      item['sl']=this.count
                      if(!item.PR){item.PR=0}
                      if(!item.P1){item.P1=0}
                      if(!item.P2){item.P2=0}
                      if(!item.P3){item.P3=0}
                      if(!item.MO){item.MO=0}
                      this.dist_total_PR += parseInt(item.PR)
                      this.dist_total_P1 += parseInt(item.P1)
                      this.dist_total_P2 += parseInt(item.P2)
                      this.dist_total_P3 += parseInt(item.P3)
                      this.dist_total_MO += parseInt(item.MO)
                      this.reports.push(item)

                      this.count++
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

