<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-btn color="info" :to="'/office/list'">Back</v-btn> <download-csv
                        :data="office_csv"
                        :name="dataFile"
                        :labels="labels"
                        :fields="csvfields"

                >
                    <v-btn color="info" :loading="tableloading" class="button"><v-icon>receipt</v-icon>{{this.btn_txt}}</v-btn>
                </download-csv>
      <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>Office List(Partial updated PP2)</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="offices"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.officeId }}</td>
        <td >{{ props.item.officeName }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{ props.item.totalStuff }}</td>
        <td >{{ props.item.personelenty }}</td>
        <td >{{props.item.progress}}%</td>

      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
      </v-flex>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>
import JsonCSV from 'vue-json-csv'
  export default {
    name:'OfficePartial',
    components: {'download-csv': JsonCSV},
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'ID', value: 'officeId',align: 'left', },
        { text: 'Office Name', align: 'left',  value: 'officeName'},
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Total Staff', value: 'totalStuff',align: 'left', },
        { text: 'Personnel Entered', value: 'personelenty',align: 'left', },
        { text: 'Progress', value: 'progress', },

      ],
      offices: [],
      office_csv:[],
      dataFile: 'office_partial_export.csv',
        labels: {
          officeId: 'Office ID',
          officeName: 'Office Name',
          identification_code:'Identification Code',
          mobile:'Mobile',
          email: 'email',
          address: 'Address',
          post_office: 'Post Office',
          subdivision: 'Subdivision',
          block: 'Block/Municipality',
          policestations: 'Police Station',
          pin: 'PIN',
          totalStuff: 'Total Staff',
          personelenty: 'Personnel Entered',
          progress: 'Progress(%)'
        },
        csvfields : ['officeId','officeName','identification_code','mobile','email','address','post_office','subdivision','block','policestations','pin','totalStuff','personelenty','progress'],
        btn_txt:'Download as CSV'

    }),

    computed: {

    },

    watch: {

    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.tableloading=true
        axios.get('/officepartialentrystatus')
        .then((response, data) => {
          if(response.data['totalpartialoffice'].length === 0){
            this.tableloading=false
            this.btn_txt='No Data to Download'
            }
         else{
            response.data['officelist'].forEach(item => {
                this.offices.push(item)
                item['progress']=((parseInt(item.personelenty)/parseInt(item.totalStuff))*100).toFixed(2)
                this.office_csv.push(item)

              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },


    }
  }
</script>
