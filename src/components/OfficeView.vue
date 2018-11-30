<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap v-if="this.getuser.level == 12 ||this.getuser.level == 3" >
        <v-btn color="primary" :to="'/office_status_zero'">Office Status(0% updated)</v-btn>
        <v-btn color="primary" :to="'/office_partials'">Office Partial Updated</v-btn>
        <v-btn color="primary" :to="'/office_status_complete'">Office Status(100% updated)</v-btn>
        </v-layout>
      <v-layout row wrap  class="my-5">

      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>All Offices</v-toolbar-title>
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
        <td >{{ props.item.name }}</td>
        <td >{{ props.item.address }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{ props.item.pin }}</td>
        <td class="justify-center layout px-0">
          <v-btn flat :to="'/office/'+props.item.id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn>
          <!--<v-btn flat :to="'/office/'+props.item.id+ '/delete'"><v-icon small> delete</v-icon></v-btn>-->
        </td>
        <td>{{ props.item.updated_at=== "-0001-11-30 00:00:00" ?  "Not Updated": moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')   }}</td>
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
    components: {'download-csv': JsonCSV},
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office Name', align: 'left', sortable: false, value: 'name'},
        { text: 'Address', value: 'adress',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Pin', value: 'pin',align: 'left', },
        { text: 'Actions', value: 'name', sortable: false },
        { text: 'Updated at', value: 'updated_at', sortable: false }
      ],
      offices: [],
      offices_csv: [],
      personnel_csv:[],
      dataFile: 'user_export.csv',
      personnel_dataFile: 'personnel_export.csv',
        labels: {
          rand_id: 'ID',
          name: 'Name',
          email: 'Email',
          mobile: 'Mobile',
          address: 'Address',
          post_office: 'Post Office',
          pin: 'PIN',
          ps: 'Police Staton',
          blk: 'Block/Municipality',
          subdiv: 'Subdivision',
          rand_password: 'Password'

        },
        personnel_labels: {
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          dob:'Date of Birth',
          email:'Email',
          emp_group:'Employee Group',
          gender: 'Gender',
          grade_pay: 'Grade Pay',
          mobile: 'Mobile',
          name: 'Name',
          office_id:'Office ID',
          pay_level:'Pay Level',
          permanent_address: 'Permanent Address',
          phone: 'Phone',
          post_stat: 'Post Status',
          present_address: 'Present Address',

        },
        csvfields : ['rand_id','name','email','mobile','address','post_office','pin','ps','blk','subdiv','rand_password'],
        personnel_csvfields : ['basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','permanent_address','phone','post_stat','present_address'],

    }),

    computed: {
      getuser(){
          return this.$store.getters.getUser
       },
    },

    watch: {

    },

    created () {
      this.initialize()
      this.getofficedata()
      this.getpersonneldata()
    },

    methods: {
      initialize () {
        this.tableloading=true
        axios.get('/offices')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
            response.data.forEach(item => {
                this.offices.push(item)
              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },
      getofficedata () {

        axios.get('/export/office')
        .then((response, data) => {
          if(response.data.length === 0){}
         else{
            response.data.forEach(item => {
                this.offices_csv.push(item)
              })

         }
            })
        .catch(error => {
          console.log(error)

        })
      },
      getpersonneldata () {

        axios.get('/export/personnel')
        .then((response, data) => {
          if(response.data.length === 0){}
         else{
            response.data.forEach(item => {
                this.personnel_csv.push(item)
              })

         }
            })
        .catch(error => {
          console.log(error)

        })
      },


    }
  }
</script>
