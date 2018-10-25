<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">

      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>Rule Lists</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table :headers="headers" :items="rules" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.RuleID }}</td>
              <td>{{ props.item.PostStatFrom }}</td>
              <td>{{ props.item.PostStatTo }}</td>
              <td>
                <strong>Office Category :</strong> {{ props.item.OfficeCategory }}<br>
                <strong>Office :</strong> {{ props.item.Office }}<br>
                <strong>Basic Pay :</strong> {{ props.item.BasicPay }}<br>
                <strong>Garde Pay/Pay Level :</strong> {{ props.item.GardePay }}<br>
                <strong>Qualification :</strong>{{ props.item.Qualification }}<br>
                <strong>Designation :</strong> {{ props.item.Designation }}<br>
                <strong>Remarks :</strong> {{ props.item.Remarks }}<br>
                <strong>Gender :</strong> {{ props.item.Gender }}<br>
                <strong>Age :</strong> {{ props.item.Age }}<br>
              </td>
              <td class="justify-center">
                <v-btn flat :to="'/pprules/'+props.item.RuleID+ '/apply'">Apply</v-btn>
                <v-btn flat :to="'/pprules/'+props.item.RuleID+ '/revoke'">Revoke</v-btn>
              </td>
              <td></td>
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
    name: 'PppoststatusList',
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      isdisabled:true,
      disable_save: false,
      headers: [
        { text: 'Rule ID', value: 'RuleID',align: 'left', },
        { text: 'From Post Status', value: 'PostStatFrom',align: 'left', },
        { text: 'To Post Status',align: 'left',value: 'PostStatTo'},
        { text: 'Rule Defination', value: '',sortable: false ,align: 'left', },
        { text: 'Actions', value: '',align: 'left', sortable: false},
        { text: 'Rule Details', value: '',align: 'left', sortable: false},

      ],
      rules: [],

    }),
    components: {

    },
    $_veeValidate: {
      validator: 'new'
    },
    computed: {
       getuser:function(){
          return this.$store.getters.getUser
       },
    },

    mounted() {

    },

    created () {

        this.initialize_ruels()


    },

    methods: {



      initialize_ruels () {
        this.tableloading=true
        axios.post('/rules')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
           this.rules=[]
            response.data['rules'].forEach(item => {
                this.rules.push(item)

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
