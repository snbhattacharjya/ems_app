<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
        <v-flex xs9><h1 class="headline" >PP2 Report As On {{ new Date().toLocaleString() }}</h1></v-flex><v-flex xs3><v-btn fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css' })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <!-- <h1 class="headline">Districtwise Male</h1> -->
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead><tr>
              <td>Field Name</td>
              <td>Details</td>
              </tr></thead>
              <tbody>
              <tr>
              <td>Office Name</td>
              <td>Incometax Office</td>
              </tr>
              <tr>
              <td>Office Name</td>
              <td>Incometax Office</td>
              </tr><tr>
              <td>Office Name</td>
              <td>Incometax Office</td>
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
  name: 'PrintPP2Data',

  data(){
    return {
      reports:[],
      search: '',
      tableloading:false,



    }
  },

  methods:{


  },

  created(){
    this.tableloading=true
    axios.get('/report')
      .then((response, data) => {
       response.data.forEach(item => {

          this.reports.push(item)
        });
        this.tableloading=false
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
.application .theme--light.v-table thead th, .theme--light .v-table thead th,.v-table thead tr:first-child{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

