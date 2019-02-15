<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-btn color="info" :to="'/district_wise_pp_status'">Back</v-btn>
        <download-csv
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
      <v-toolbar-title>Office List Of {{this.district}} (Not started yet)</v-toolbar-title>
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
        <td>{{ props.item.id }}</td>
        <td >{{ props.item.name }}({{ props.item.identification_code }})</td>
        <td >{{ props.item.address }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{props.item.post_office}}</td>
        <td>{{ props.item.pin }}</td>
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
    name:'OfficenotStartedbydistrict',
    components: {'download-csv': JsonCSV},
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      district:'',
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office Name', align: 'left', sortable: true, value: 'name'},
        { text: 'Address', value: 'address',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Post Office', value: 'post_office', sortable: true },
        { text: 'Pin', value: 'pin',align: 'left', }
      ],
      offices: [],
      office_csv:[],
      dataFile: 'office_not_started_export.csv',
        labels: {
          id: 'Office ID',
          identification_code:'Identification Code',
          name: 'Office Name',
          mobile:'Mobile',
          email: 'email',
          address: 'Address',
          post_office: 'Post Office',
          subdivision: 'Subdivision',
          block: 'Block/Municipality',
          policestations: 'Police Station',
          pin: 'PIN'
          
        },
        csvfields : ['id','identification_code','name','mobile','email','address','post_office','subdivision','block','policestations','pin'],
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
        axios.get('/officenotstartedbydistrict/'+this.$route.params.id)
        .then((response, data) => {
          if(response.data['officelist'].length === 0){
            this.tableloading=false
            this.btn_txt='No Data to Download'
          }
         else{
            response.data['officelist'].forEach(item => {
                this.offices.push(item)
                this.office_csv.push(item)
              })
              this.district=response.data['district'][0]['name']
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
