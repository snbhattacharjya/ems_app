<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex x12 v-if="this.getuser.level != 10">
      <v-layout row wrap  >
      <v-flex xs4>
          <v-select
          :items="subdivisions"
          v-model="subdivision_id"
          item-text= "name"
          item-value= "id"
          prepend-icon="list"
          label="Select Subdivision(Required)"

          @change="getOfficelist"
          >
        </v-select>
      </v-flex>
      <v-flex xs7>
        <v-select
        :items="offices"
        v-model="office_id"
        item-text= "name"
        item-value= "id"
        prepend-icon="list"
        label="Select Office(Required)"
        :disabled="isdisabled"
        autocomplete
        :search-input.sync="searchInput"
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
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.qualification }}</td>
              <td >{{ props.item.gender }}</td>
              <td >{{ props.item.basic_pay }}</td>
              <td >{{ props.item.grade_pay !=0 ? props.item.grade_pay : props.item.pay_level!=''? 'LEVEL '+props.item.pay_level : '' }}</td>
              <td >

                  <v-select
                    :items="poststats"
                    v-model="props.item.post_stat"
                    item-text= "id"
                    item-value= "id"
                    prepend-icon=""
                    >
                    </v-select>
              </td>
              <td class="justify-center layout px-0">
                <v-btn flat @click="update_post_staatus(props.item.id,props.item.office_id,props.item.post_stat)">Update</v-btn>

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
    name:'PoststatusbulkUpdate',
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
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Personnel Name',align: 'left',value: 'name'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Qualification', value: 'qualification',align: 'left', },
        { text: 'Gender', value: 'gender',align: 'left', },
        { text: 'Basic Pay', value: 'basic_pay',align: 'left', },
        { text: 'Grade pay/Pay Level', value: '',align: 'left', },
        { text: 'Post status', value: 'post_stat',},
        { text: 'Actions', value: 'name', sortable: false },
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
      if(this.getuser.level != 10){this.getsubdivision()}
      else{
        this.initialize_personnel()
        this.loadpoststatus()
      }

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
      pp($event){
        alert(this.post_state)
      },
      getsubdivision(){
          axios.get('/subdivisions')
          .then((response, data) => {
          response.data.forEach(item => {
              this.subdivisions.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
      },
      dofilter(){
        //console.log('SUB - '+this.subdivision_id)
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
        console.log('creating filter....')
        this.tableloading=true
        axios.get('/personnelbyoffice/'+this.office_id,{
          //office_id: this.office_id
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
      initialize_personnel () {
        //console.log('creating filter....')
        this.tableloading=true
        axios.get('/personnelbyoffice/'+this.getuser.user_id,{
          //office_id: this.office_id
        })
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
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
      },
      getOfficelist(){
        //console.log('SUB - '+this.subdivision_id)
        axios.get('/offices/'+this.subdivision_id)
          .then((response, data) => {
            this.isdisabled=false
            this.offices=[]
          response.data.forEach(item => {
            item.name=item.id+' - '+item.name
              this.offices.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
      },
      update_post_staatus(personnel_id,office_id,post_stat){
        axios.post('/savepoststatmanual',{
          office_id:office_id,
          personnel_id:personnel_id,
          poststat:post_stat
        })
          .then((response, data) => {
            if(response.data='Successfully Updated'){
              this.show_message = true
              this.message_type = 'success'
              this.message_icon = 'check_circle'
              this.message_text = 'Post Status for  - '+personnel_id+' updated Successfully to -'+post_stat
              this.snackbar =true
            }
          })
          .catch(error => {
            console.log(error)
          })
      }


    }
  }
</script>
