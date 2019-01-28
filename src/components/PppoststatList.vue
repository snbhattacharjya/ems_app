<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">

      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>Rule Lists</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-btn color="primary" :to="'/pppoststat'">Add New Rule</v-btn>
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
                <strong>Garde Pay/Pay Level :</strong> {{ props.item.GradePay }} / {{ props.item.PayLevel }}<br>
                <strong>Qualification :</strong>{{props.item.NotQualification==0 ? 'Include- ' : 'Exclude- '}}{{ props.item.Qualification }}<br>
                <strong>Employee Group :</strong> {{ props.item.Emp_group }}<br>
                <strong>Designation :</strong> {{props.item.NotDesignation==0 ? 'Include- ' : 'Exclude- '}}{{ props.item.Designation }}<br>
                <strong>Remarks :</strong> {{props.item.NotRemarks==0 ? 'Include- ' : 'Exclude- '}}{{ props.item.Remarks }}<br>
                <strong>Gender :</strong> {{ props.item.Gender }}<br>
                <strong>Age :</strong> {{ props.item.Age }}<br>
              </td>
              <td class="justify-center">
                <v-btn color="info" flat v-bind:id="props.item.RuleID" @click="queryrule(props.item.RuleID,$event)"><v-icon small class="mr-2">query_builder</v-icon> Query</v-btn><br>
                <v-btn :loading="applying_rule" color="success" flat v-bind:id="props.item.RuleID" @click="applyrule(props.item.RuleID,$event)"><v-icon small class="mr-2">check</v-icon> Apply</v-btn>
                <v-btn :loading="revoking_rule" color="error" flat v-bind:id="props.item.RuleID" @click="revokerule(props.item.RuleID,$event)"><v-icon small class="mr-2">undo</v-icon> Revoke</v-btn><br>
                <v-btn :loading="deleting_rule" color="error" flat v-bind:id="props.item.RuleID" @click="deleterule(props.item.RuleID,$event)"><v-icon small class="mr-2">delete_forever</v-icon> Delete</v-btn>


                <!-- <v-btn color="warning" flat v-bind:id="props.item.RuleID" @click="shortlistrule(props.item.RuleID,$event)"><v-icon small class="mr-2">star</v-icon> Sortlist</v-btn> -->
              </td>
              <td>
                <strong>Last Applied Date : </strong> <span class="" id="lastApplieddate">{{formatdate(props.item.AppliedDate)=='Invalid date' ? 'Not Applied yet' : formatdate(props.item.AppliedDate)}}</span><br>
                <strong>Records Affected : </strong> <span class=""  id="lastappliedrecords">{{props.item.RecordsAffected}}</span><br>
                <strong>Last Revoke Date : </strong> <span class=""  id="lastRevokedate">{{formatdate(props.item.RevokedDate)=='Invalid date' ? 'Not Applied yet' : formatdate(props.item.RevokedDate)}}</span><br>
                <strong>Records Affected : </strong> <span class=""  id="lastRevokerecords">{{props.item.RecordsRevoked}}</span>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
          <v-snackbar v-if="this.willaffect != ''" v-model="affect" :multi-line="false" :timeout=0 :value=show_message color="success" :bottom=true>{{ this.willaffect }}<v-btn dark flat @click="affect = false">Close</v-btn>
          </v-snackbar>

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
      willaffect:'',
      affect:false,
      rule:'',
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
         this.willaffect=''
         this.affect=false
         this.affect=true
         this.willaffect='Applying Rule ID : '+id+'.......'
           axios.get('/grantrules/'+id)
        .then((response, data) => {
          if(response.data.length === 0){
           this.willaffect='No records to apply'

          }
         else{
           this.willaffect='Rule ID : '+id+' Applied successfully'

           this.initialize_ruels()

         }
            })
        .catch(error => {
          console.log(error)

        })

      },
       revokerule:function(id,$event){
         this.willaffect=''
         this.affect=false
         this.affect=true
         this.willaffect='Revoking Rule ID : '+id+'.......'
           axios.get('/revokerule/'+id)
        .then((response, data) => {
          if(response.data['RecordsRevoked'] === 0){
              this.willaffect='No records to revoke'
            }
         else{
           this.willaffect='Rule ID : '+id+' Revoked successfully'

              this.initialize_ruels()

         }
            })
        .catch(error => {
          console.log(error)

        })

      },
       queryrule:function(id,$event){
         this.willaffect=''
         this.affect=false
         this.rule=id
         this.willaffect="Getting value for Rule ID : "+id+" ..........."
         this.affect=true
        axios.get('/queryrule/'+id)
        .then((response, data) => {

         this.rule=id
         if(response.data['query']['queryval'] != 0){
         this.willaffect="Rule ID:"+id+" will affect "+response.data['query']['queryval']+" rows"
         }
         else if(response.data['query']['queryval'] === 0){
           this.willaffect="Rule ID:"+id+" will not affect any rows"
         }else{
           this.willaffect="Rule ID:"+id+" is having some problem"
         }
         this.affect=true

            })
        .catch(error => {
          console.log(error)
          this.willaffect=''
         this.affect=false
        })

      },
      deleterule:function(id,$event){
        if(confirm('Are yoy sure to delete Rule ID - '+id+' ?')){
         this.willaffect=''
         this.affect=false
         this.affect=true
         this.willaffect='Deleting Rule ID : '+id+'.......'
           axios.get('/deleterule/'+id)
        .then((response, data) => {
           this.willaffect='Rule ID : '+id+' '+response.data
           this.initialize_ruels()
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
