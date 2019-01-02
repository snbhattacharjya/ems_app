<template>
  <div id="pageDashboard">
    <v-container fluid>


      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'Polling Personnel Management System',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>

          <v-flex xs12 mb-5>
            <h1 class="headline mb-3">Subdivisionwise Polling Personnel Progress Report</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" id=""  border=1>
                <thead>
                <tr>
                <th width="5%"><strong>Sl<br> No</strong></th>
                <th width="20%"><strong>Subdivision &<br>Block/Municipality</strong></th>
                <th width="5%" ><strong>Office<br>Total</strong></th>
                <th width="7%" ><strong>Office <br>Updated</strong></th>
                <th width="7%" ><strong>PP1<br>Progress</strong></th>
                <th width="7%" ><strong>Total <br>Staff PP1</strong></th>
                <th width="5%" ><strong>Male<br> PP1</strong></th>
                <th width="7%" ><strong>Female<br> PP1</strong></th>
                <th width="5%" ><strong>Male<br> PP2</strong></th>
                <th width="7%" ><strong>Female<br> PP2</strong></th>
                <th width="7%" ><strong>Total<br> PP2</strong></th>
                <th width="9%" ><strong>Number<br> of Office<br>Started<br>PP2<br>Entry</strong></th>
                <th width="9%" ><strong>PP2<br>Progress</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.sl">
                  <td class="nopad" >{{ report.sl }}</td>
                  <td class="nopad">{{ report.subdivision_id }}-{{ report.subdivision }}<br>{{ report.block_munis_id }}-{{ report.block }}</td>
                  <td class="nopad">{{ report.totalOffice }}</td>
                  <td class="nopad" >{{ report.updateOffice }}</td>
                  <td class="nopad" >{{ parseFloat((report.updateOffice/report.totalOffice)*100).toFixed(2) }}%</td>
                  <td class="nopad" >{{ report.totalStuff }}</td>
                  <td class="nopad" >{{ report.totalMale }}</td>
                  <td class="nopad" >{{ report.female_staff }}</td>
                  <td class="nopad" >{{ report.malepp2 ? report.malepp2 : 0 }}</td>
                  <td class="nopad" >{{ report.femalepp2 ? report.femalepp2 : 0 }}</td>
                  <td class="nopad" >{{ report.malepp2 && report.femalepp2 ? parseInt(report.malepp2)+parseInt(report.femalepp2) : 0 }}</td>
                  <td class="nopad" >{{ report.pp2started ? parseInt(report.pp2started) : 0 }}</td>
                  <td class="nopad" >{{ report.malepp2 && report.femalepp2 ? parseFloat(((parseFloat(report.malepp2)+parseFloat(report.femalepp2))/report.totalStuff)*100).toFixed(2) : 0 }}%</td>
                  </tr>
                  <tr>
                    <td class="nopad"  colspan=2><strong>Total</strong></td>
                    <td class="nopad" >{{this.totalOffice_count}}</td>
                    <td class="nopad" >{{this.updateOffice_count}}</td>
                    <td class="nopad" >{{parseFloat((parseInt(this.updateOffice_count)/parseInt(this.totalOffice_count))*100).toFixed(2)}}%</td>
                    <td class="nopad" >{{this.totalStuff_count}}</td>
                    <td class="nopad" >{{this.totalMale_count}}</td>
                    <td class="nopad" >{{this.female_staff_count}}</td>
                    <td class="nopad" v-if="parseInt(this.pp2male_count)>=0">{{this.pp2male_count}}</td>
                    <td class="nopad" v-if="parseInt(this.pp2female_count)>=0">{{this.pp2female_count}}</td>
                    <td class="nopad" v-if="parseInt(this.pp2male_count)+parseInt(this.pp2female_count)>=0">{{parseInt(this.pp2male_count)+parseInt(this.pp2female_count)}}</td>
                    <td class="nopad" v-if="parseInt(this.pp2start_count)>=0">{{this.pp2start_count}}</td>
                    <td class="nopad" v-if="parseInt(this.pp2start_count)>=0">{{parseFloat((parseFloat(parseInt(this.pp2male_count)+parseInt(this.pp2female_count))/parseFloat(this.totalStuff_count))*100).toFixed(2)}}%</td>
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
  name: 'ProgessReport',
  props: {

  },
  data(){
    return {
      reports:[],
      search: '',
      loadingTXT: 'Loading...',
      tableloading:false,
      item_class:'',
      count:1,
      totalOffice_count:0,
      updateOffice_count:0,
      totalStuff_count:0,
      totalMale_count:0,
      female_staff_count:0,
      pp2male_count:0,
      pp2female_count:0,
      pp2start_count:0
    }
  },
  computed:{
     getmisdata:function(){
       return this.$store.getters.getMisreport
     },
     getUser:function(){
          return this.$store.getters.getUser
       },
  },
  methods:{

    initialize:function(){
      this.tableloading=true
        axios.get('/personelProgressReport')
          .then((response, data) => {
            if(response.data.length != 0 || response.data!=''){
            response.data.forEach(item => { //console.log(item)
               item['sl']=this.count
               if(!item['totalOffice']){item['totalOffice']=0}
               if(!item['updateOffice']){item['updateOffice']=0}
               if(!item['totalStuff']){item['totalStuff']=0}
               if(!item['totalMale']){item['totalMale']=0}
               if(!item['female_staff']){item['female_staff']=0}

               this.totalOffice_count+=parseInt(item.totalOffice)
               this.updateOffice_count+=parseInt(item.updateOffice)
               this.totalStuff_count+=parseInt(item.totalStuff)
               this.totalMale_count+=parseInt(item.totalMale)
               this.female_staff_count+=parseInt(item.female_staff)
               if(item.malepp2 && item.femalepp2 && item.pp2started){
                this.pp2male_count+=parseInt(item.malepp2)
                this.pp2female_count+=parseInt(item.femalepp2)
                this.pp2start_count+=parseInt(item.pp2started)
               }
               this.reports.push(item)
               this.count++
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

