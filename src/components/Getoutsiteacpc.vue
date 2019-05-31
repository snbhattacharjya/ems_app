<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap v-if="this.getuser.level == 12 ||this.getuser.level == 3 ||this.getuser.level == 5 ||this.getuser.level == 6 ||this.getuser.level == 7 ||this.getuser.level == 8 " >
        <v-btn color="primary" :to="'/office_not_statred'">Office Not yet Started</v-btn>
        <v-btn color="primary" :to="'/office_status_zero'">Office Status(0% updated PP2)</v-btn>
        <v-btn color="primary" :to="'/office_partials'">Office Partial Updated(PP2)</v-btn>
        <v-btn color="primary" :to="'/office_status_complete'">Office Status(100% updated PP2)</v-btn>
        <v-btn v-if="this.getuser.level == 6 || this.getuser.level == 7 ||this.getuser.level == 8 || this.getuser.level == 5" color="info" :to="'/pollingpersonnel_progress_report'">Polling Personnel Progress Report</v-btn>
        <v-btn v-if="this.getuser.level == 5" color="primary" :to="'/misreport/district'">Districtwise PP2 Requirement</v-btn>
        <v-btn v-if="this.getuser.level == 12 || this.getuser.level == 8 || this.getuser.level == 5" color="primary" :to="'/remarkwise_report'">Remarkwise Personnel Report(PP2)</v-btn>
        <v-btn v-if="this.getuser.level == 12 ||this.getuser.level == 8 || this.getuser.level == 5" color="primary" :to="'/office_category_wise_pp_status'">Office category wise entry Report(PP2)</v-btn>
        <v-btn v-if="this.getuser.level == 12 ||this.getuser.level == 8  || this.getuser.level == 5" color="primary" :to="'/office_category_wise_post_status'">Office category wise Post Status Report(PP2)</v-btn>
        <v-btn v-if="this.getuser.level == 12 ||this.getuser.level == 8  || this.getuser.level == 5" color="primary" :to="'/office_category_wise_group_status'">Office category wise Group Status Report(PP2)</v-btn>
        <v-btn v-if="this.getuser.level == 12 ||this.getuser.level == 8 || this.getuser.level == 5" color="primary" :to="'/office_institute_wise_group_status'">Office institute wise Group Status Report(PP2)</v-btn>
        <v-btn v-if="this.getuser.level == 12 ||this.getuser.level == 8 || this.getuser.level == 5" color="primary" :to="'/getoutsiteacpc'">Personnel Out Side of Ac</v-btn>
        <!-- <v-btn v-if="this.getuser.level == 12" color="info" :to="'/macro_level_pp_statistic'">Macro Level PP Statistic</v-btn> -->
        <v-btn v-if="this.getuser.level == 12" color="info" :to="'/office_delete'">Delete Office</v-btn>
        <v-btn v-if="this.getuser.level == 12" color="info" :to="'/office_restore'">Restore Office</v-btn>



        </v-layout>
      <v-layout row wrap  class="my-5">
        <!-- <v-alert v-if="office_created" v-model="alert" dismissible type="success">
        {{ this.office_created }}
        </v-alert> -->

<v-flex  xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>Post Stat Out Side Of AC with Number</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table v-if="this.getuser.level==12"
 :headers="headers_count" :items="countwithpoststat"  class="elevation-1" :loading="tableloading" hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.post_stat }}</td>
              <td >{{ props.item.count_row }}</td>

            </template>

          </v-data-table>
          <v-data-table v-else
 :headers="headers_count" :items="countwithpoststat" :search="search" class="elevation-1" :loading="tableloading" hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.post_stat }}</td>
              <td >{{ props.item.count_row }}</td>

            </template>

          </v-data-table>
      </v-flex>



      <v-flex  xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel Out Side Of AC</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table v-if="this.getuser.level==12"
 :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td>{{props.item.ac_perm_id}}</td>
              <td>{{props.item.post_stat}}</td>
              <td >{{ props.item.bank_account_no }}</td>
              <td >{{ props.item.mobile }}</td>
              <td>{{ props.item.updated_at=== null ?  "Not Updated": moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')  }}</td>

            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
          <v-data-table v-else
 :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.bank_account_no }}</td>
              <td >{{ props.item.mobile }}</td>
              <td>{{ props.item.updated_at=== null ?  "Not Updated": moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')  }}</td>
              <td class="justify-center layout px-0">
                <!-- <v-btn flat :to="'/personnel/'+props.item.id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn> -->
                <!-- <v-btn flat :to="'/personnel/'+props.item.id+ '/delete'"><v-icon small> delete</v-icon></v-btn> -->
              </td>
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

  export default {
    props: {
    user_level: {
      type: String,
      required: false
    },
    },
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
       headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office ID', value: 'office_id',align: 'left',sortable: false },
        { text: 'Personnel Name',align: 'left',value: 'name'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Bank Account No', value: 'bank_account_no',align: 'left', sortable: false},
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Updated at', value: 'updated_at',  },

      ],
      headers_count: [
        { text: 'Post Stat', value: 'post_stat',align: 'left',sortable: false },
        { text: 'No of Personnel', value: 'count_row',align: 'left',sortable: false },



      ],
      personnels: [],
      countwithpoststat:[],
    }),

    computed: {
      getuser(){
          return this.$store.getters.getUser
       },
    },

    watch: {

    },

    created () {
      this.getacpcinitialize()
      this.initialize()

    },

    methods: {
      initialize () {
        this.tableloading=true
        axios.get('/getoutsiteacpc')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
            response.data['list'].forEach(item => {
                this.personnels.push(item)
              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },
     getacpcinitialize(){
          this.tableloading=true
        axios.get('/getoutsiteacpc')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
            response.data['count'].forEach(item => {
                this.countwithpoststat.push(item)
              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })

     }




    }
  }
</script>
