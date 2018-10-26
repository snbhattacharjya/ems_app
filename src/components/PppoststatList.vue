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
                <v-btn :loading="applying_rule" color="success" flat v-bind:id="props.item.RuleID" @click="applyrule(props.item.RuleID,$event)"><v-icon small class="mr-2">check</v-icon> Apply</v-btn>
                <v-btn :loading="revoking_rule" color="error" flat v-bind:id="props.item.RuleID" @click="revokerule(props.item.RuleID,$event)"><v-icon small class="mr-2">undo</v-icon> Revoke</v-btn>
                <v-btn color="info" flat v-bind:id="props.item.RuleID" @click="queryrule(props.item.RuleID,$event)"><v-icon small class="mr-2">query_builder</v-icon> Query</v-btn>
                <v-btn color="warning" flat v-bind:id="props.item.RuleID" @click="shortlistrule(props.item.RuleID,$event)"><v-icon small class="mr-2">star</v-icon> Sortlist</v-btn>
              </td>
              <td>
                <strong>Last Applied Date : </strong> <span class="" id="lastApplieddate">{{formatdate(props.item.AppliedDate)}}</span><br>
                <strong>Records Affected : </strong> <span class=""  id="lastappliedrecords">{{props.item.RecordsAffected}}</span><br>
                <strong>Last Revoke Date : </strong> <span class=""  id="lastRevokedate">{{formatdate(props.item.RevokedDate)}}</span><br>
                <strong>Records Affected : </strong> <span class=""  id="lastRevokerecords">{{props.item.RecordsRevoked}}</span>
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
import moment from 'moment'
  export default {
    name: 'PppoststatusList',
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      isdisabled:true,
      disable_save: false,
      headers: [
        { text: 'Rule ID', value: 'RuleID',align: 'left',width: '50px'},
        { text: 'From Post Status', value: 'PostStatFrom',align: 'left',width: '50px' },
        { text: 'To Post Status',align: 'left',value: 'PostStatTo',width: '50px'},
        { text: 'Rule Defination', value: '',sortable: false ,align: 'left',width: '200px' },
        { text: 'Actions', value: '',align: 'left', sortable: false,width: '100px'},
        { text: 'Rule Details', value: '',align: 'left', sortable: false,width: '200px'},

      ],
      rules: [],
      applying_rule: false,
      revoking_rule:false,
      lastApplieddate:'',
      lastappliedrecords:'',
      lastRevokedate:'',
      lastRevokerecords:'',


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
        axios.get('/rules')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
           this.rules=[]
            response.data['rules'].forEach(item => {
                this.rules.push(item)
                // this.lastApplieddate=item.AppliedDate
                // this.lastappliedrecords=item.RecordsAffected
                // this.lastRevokedate=item.RevokedDate
                // this.lastRevokerecords=item.RecordsRevoked
              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },
      applyrule:function(id,$event){
        if(this.applying_rule === false){

           axios.get('/grantrules/'+id)
        .then((response, data) => {
          if(response.data.length === 0){


          }
         else{
           this.initialize_ruels()

         }
            })
        .catch(error => {
          console.log(error)

        })
        }
      },
       revokerule:function(id,$event){
        if(this.revoking_rule === false){

           axios.get('/revokerule/'+id)
        .then((response, data) => {
          if(response.data.length === 0){

            }
         else{
              this.initialize_ruels()

         }
            })
        .catch(error => {
          console.log(error)

        })
        }
      },
      formatdate:function(date){
        return moment(date).format('DD/MM/YYYY h:mm a')
      }


    }
  }
</script>
