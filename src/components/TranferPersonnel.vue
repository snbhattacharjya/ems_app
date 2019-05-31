<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
        <v-alert v-if="personnel_transfered" v-model="alert" dismissible type="success">
        {{ this.personnel_transfered }}
        </v-alert>

      <v-flex  xs12>
        <template v-if="this.getuser.level == 12">
                <office-list
                  v-model="office_id_from"
                  v-validate="'required'"
                  :error-messages="errors.collect('office_id')"
                  data-vv-name="office_id"
                  :selected="office_id"

                ></office-list>
              </template>
        <v-toolbar flat color="white">
         <v-toolbar-title>Intra District Personnel Tranfer</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.office_id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.bank_account_no }}</td>
              <td >{{ props.item.email }}</td>
              <td >{{ props.item.mobile }}</td>
              <td >{{ props.item.block }}</td>
              <td >{{ props.item.tempblock }}</td>
              <td class="justify-center layout px-0">
                <v-btn flat color="primary" title="Click to Transfer" @click="inittransfer(props.item.id)" ><v-icon class="mr-2">transfer_within_a_station</v-icon></v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>

      </v-flex>
      <v-dialog
      v-model="dialog"
      max-width="490"
      persistent=true
    >
      <v-card>
        <v-card-title class="headline">Provide Memo Details</v-card-title>

        <v-card-text>
         <v-text-field
                prepend-icon="confirmation_number"
                name="memo_no"
                label="Memo No Details(*)"
                type="text"
                v-model="memo_no"
                counter
                maxlength="30"
                v-validate="'required'"
                :error-messages="errors.collect('memo_no')"
                data-vv-name="memo_no"
              ></v-text-field>
                              <v-menu
                  ref="memo_date_menu"
                  :close-on-content-click="false"
                  v-model="memo_date_menu"
                  :nudge-right="40"
                  :return-value.sync="memo_date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    readonly
                    prepend-icon="event"
                    name="memo_date"
                    label="Memo Date(*)"
                    type="text"
                    v-model="memo_date"
                    v-validate="'required'"
                    :error-messages="errors.collect('memo_date')"
                    data-vv-name="memo_date"
                  ></v-text-field>
                  <v-date-picker v-model="memo_date"
                  :min="moment().subtract(5,'years').format('YYYY-MM-DD')"
                  :max="moment().add(0,'years').format('YYYY-MM-DD')"
                  @input="$refs.memo_date_menu.save(memo_date)"
                  ></v-date-picker>
                </v-menu>

                <office-list
                  v-model="office_id_to"
                  v-validate="'required'"
                  :error-messages="errors.collect('office_id_to')"
                  data-vv-name="office_id_to"
                  :selected="office_id_to"
                ></office-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"

            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="green darken-1"

            @click="dotransfer"
          >
            Transfer
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>
 import OfficeList from '@/components/OfficeList'
  export default {
    name:'TransferPersonnel',
    components: {
      OfficeList,

    },
    data: () => ({
      id:'',
      dialog: false,
      search: '',
      tableloading:false,
      memo_no:'',
      memo_date:'',
      memo_date_menu:'',
      isdisabled:true,
      disable_save: false,
      personnel_transfered:'',
      deleting:false,
      alert:false,
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office ID', value: 'office_id',align: 'left',sortable: false },
        { text: 'Personnel Name',align: 'left',value: 'name'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Bank Account No', value: 'bank_account_no',align: 'left', sortable: false},
        { text: 'Email', value: 'email',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Office Block', value: 'block',align: 'left', },
        { text: 'Present Block', value: 'tempblock',align: 'left', },
        { text: 'Actions', value: '', sortable: false },
      ],
      personnels: [],
      searchInput: '',
      office_id_to:'',
      office_id_from: '',
    }),

    $_veeValidate: {
      validator: 'new'
    },
    computed: {
       getuser:function(){
          return this.$store.getters.getUser
       },
       getpersonnel:function(){
          return this.$store.getters.getpersonnel
       },
    },
    watch:{
      office_id_from:function(val){
        if(val!=''){
          this.initialize()
        }
      }
    },
    mounted() {

    },

    created () {
      if(window.sessionStorage.getItem('is_personnel_transfered')!='null'){
        this.personnel_created=window.sessionStorage.getItem('is_personnel_transfered')
        this.alert=true
        window.sessionStorage.setItem('is_personnel_transfered',null)
      }
      else{
        this.alert=false
        window.sessionStorage.setItem('is_personnel_transfered',null)
      }
      if(this.getuser.level == 10){
        this.initialize()
      }



    },

    methods: {

      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
        this.snackbar =true
      },
      initialize () {
        this.tableloading=true
        if(this.getuser.level == 10){
          axios.post('/transferlist',{mode:'intra',office_id_from:this.getuser.user_id})
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.personnels=[]
          }
         else{
           this.personnels=[]
            response.data.forEach(item => {
                this.personnels.push(item)
              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
        }
        if(this.getuser.level == 12){
          axios.post('/transferlist',{mode:'intra',office_id_from: this.office_id_from})
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.personnels=[]
          }
         else{
           this.personnels=[]
            response.data.forEach(item => {
                this.personnels.push(item)
              })

              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
        }


      },
      inittransfer:function(val){
        this.$validator.reset()
        this.id=val
        this.dialog=true

      },
      dotransfer:function(){
        this.$validator.validate()
          .then(result => {
            if(result){
              if(confirm('Are you sure to Transfer Personnel - '+this.id+' ? Please confirm.')){
                this.deleting=true
                if(this.getuser.level == 12){
                  axios.post('/dotransfer',{mode:'intra',personnel_id:this.id,memo_no:this.memo_no.replace(/"/g, "").replace(/'/g, ""),memo_date:this.memo_date,office_id_from:this.office_id_from,office_id_to:this.office_id_to})
                    .then((response, data) => {
                    this.dialog=false
                    this.initialize()
                    alert('Personnel transfered successfully')
                  })
                  .catch(error => {
                    console.log(error.response.data)
                    this.tableloading=false
                  })
                }

                else if(this.getuser.level == 10){
                  axios.post('/dotransfer',{mode:'intra',personnel_id:this.id,memo_no:this.memo_no.replace(/"/g, "").replace(/'/g, ""),memo_date:this.memo_date,office_id_to:this.office_id_to})
                  .then((response, data) => {
                  this.dialog=false
                  this.initialize()
                  alert('Personnel transfered successfully')
                  })
                  .catch(error => {
                    console.log(error.response.data)

                    this.tableloading=false
                  })
                }
                  }

            }else{

            }

          })

      }


    }
  }
</script>
