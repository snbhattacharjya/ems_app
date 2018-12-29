<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >

          <v-flex xs12 >
            <h1 class="headline">Office Category wise Personnel Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="5%" ><strong>Serial<br> No</strong></th>
                <th width="20%"><strong>Office Category</strong></th>
                <th width="15%" ><strong>No of Male(Available)</strong></th>
                <th width="15%" ><strong>No of Female(Available)</strong></th>
                <th width="15%" ><strong>No of Total<br> Personnel(Available)</strong></th>

                </tr>


                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.male }}</td>
                  <td class="nopad">{{ report.female}}<br></td>
                  <td class="nopad">{{ report.total }}<br></td>

                  </tr>
                  <tr>
                    <td colspan="2" class="nopad">Total</td>

                    <td class="nopad">{{this.dist_total_male}}</td>
                    <td class="nopad">{{this.dist_total_female}}</td>
                    <td class="nopad">{{this.dist_total_emp}}</td>

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
  name: 'OfficecategorywisePersonnel',
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
      dist_total_emp:0,
      dist_total_male:0,
      dist_total_female:0,

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
            axios.get('/officeCategoryWise_pp2')
              .then((response, data) => {
                if(response.data['available'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['available'].forEach(item => { //console.log(item)
                      item['sl']=this.count
                      item['total']=parseInt(item.male)+parseInt(item.female)
                      this.reports.push(item)
                      this.dist_total_emp += parseInt(item['total'])
                      this.dist_total_male += parseInt(item.male)
                      this.dist_total_female += parseInt(item.female)
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

