<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex x12 v-if="this.getuser.level != 10">
      <v-layout row wrap  >

      <v-flex xs6>
        <v-select
          :items="poststats"
          v-model="post_stat_id"
          item-text= "name"
          item-value= "id"
          prepend-icon="list"
          label="Select Post Status(Required)"
          v-validate="'required'"
          :error-messages="errors.collect('post_stat_id')"
          data-vv-name="post_stat_id"
          >
        </v-select>
      </v-flex>
      <v-flex xs1>
        <v-btn color="primary" @click="dofilter" :disabled="disable_save">Show</v-btn>
      </v-flex>
      </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-toolbar flat color="white">
         <v-toolbar-title>All Personnel</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search"  label="Search"  single-line  hide-details></v-text-field>
        </v-toolbar>
          <v-data-table :headers="headers" :items="personnels" :search="search" class="elevation-1" :loading="tableloading">
            <template slot="items" slot-scope="props">

              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.poststatcount }}</td>

              <td>{{props.item.post_stat}}</td>
              <td >

                  <v-select
                    :items="poststats"
                    v-model="props.item.post_stat_to"
                    item-text= "id"
                    item-value= "id"
                    prepend-icon=""

                    >
                    </v-select>
              </td>
              <td class="justify-center layout px-0">
                <v-btn flat color="info" @click="update_post_staatus(props.item.post_stat,props.item.post_stat_to,props.item.designation)">Update</v-btn>

              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-flex>
      <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    name:'PoststatusbulkUpdatebydesignation',
    data: () => ({
      dialog: false,
      search: '',
      post_stat:'',
      snackbar: false,
      tableloading:false,
      subdivision_id: '',
      office_id:'',
      subdivisions: [],
      offices:[],
      isdisabled:true,
      disable_save: false,
      show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",

      poststats:[],
      headers: [

        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'No Of Personnel', value: 'poststatcount',align: 'left', },
        { text: 'Current Post status', value: 'post_stat',sortable: false},
        { text: 'Change Post status(To)', value: '',sortable: false},
        { text: 'Actions', value: '', sortable: false },
      ],
      personnels: [],
      searchInput: ''
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
      this.loadpoststatus()
    },

    methods: {
      loadpoststatus:function(){
      axios.get('/pollingPost')
      .then((response, data) => {

       response.data.forEach(item => {

          this.poststats.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
           dofilter(){
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.initialize() : this.showError()
            this.disable_save = false
          })
      },
      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
        this.snackbar =true
      },
      initialize () {

        this.tableloading=true
        axios.post('/getPPListByDistinctDesignation',{
          post_stat: this.post_stat_id
        })
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
              this.loadpoststatus()
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })

      },

      update_post_staatus(current_poststat,change_to_poststat,designation){
        if(change_to_poststat!=undefined){
        if(confirm('Are you confirm ?')){
        axios.post('/adhokeppstatus',{
          current_poststat:current_poststat,
          change_to_poststat:change_to_poststat,
          designation:designation

        })
          .then((response, data) => {
            if(response.data='Successfully Updated'){
              this.show_message = true
              this.message_type = 'success'
              this.message_icon = 'check_circle'
              this.message_text = 'Post Status updated Successfully to -'+change_to_poststat
              this.snackbar =true
              this.initialize()
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
        }else{
          alert('Please select a Post status to transfer')
        }
      }


    }
  }
</script>
