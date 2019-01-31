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
      <v-flex xs3 class="ml-3">
        <!-- <download-csv
                        :data="personnel_csv"
                        :name="personnelfilename"
                        :labels="personnel_labels"
                        :fields="personnel_csvfields"
                >
                <v-btn color="info" :loading="personnelloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_personnel}}</v-btn>
                </download-csv> -->
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
              <td>{{ props.item.office_id }}</td>
              <td>{{ props.item.office_category }}</td>
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.name }}</td>
              <td >{{ props.item.designation }}</td>
              <td >{{ props.item.basic_pay }}</td>
              <td >{{ props.item.grade_pay}} / {{props.item.pay_level}}</td>
              <td>{{props.item.age}}</td>
              <td>{{props.item.gender}}</td>
              <td>{{props.item.emp_group}}</td>
              <td>{{props.item.remark}}</td>
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
                <v-btn flat color="info" @click="update_post_staatus(props.item.id,props.item.office_id,props.item.post_stat)">Update</v-btn>

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
import JsonCSV from 'vue-json-csv'
  export default {
    name:'PoststatusbulkUpdatebycategory',
    components: {'download-csv': JsonCSV},
    data: () => ({
      dialog: false,
      search: '',
      post_stat:'',
      post_stat_id:'',
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
        { text: 'Office ID', value: 'office_id',align: 'left'},
        { text: 'Office Category', value: 'office_category',align: 'left'},
        { text: 'Personnel ID', value: 'id',align: 'left'},
        { text: 'Personnel', value: '',align: 'left' },
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Basic Pay', value: 'basic_pay',align: 'left', },
        { text: 'Grade pay/Pay Level', value: '',align: 'left', },
        { text: 'Age(in Years As on Today)',align: 'left',value: 'age'},
        { text: 'Gender',align: 'left',value: 'gender'},
        { text: 'Group',align: 'left',value: 'emp_group'},
        { text: 'Remark',align: 'left',value: 'remark'},
        { text: 'Post status', value: 'post_stat',sortable: false},
        { text: 'Actions', value: 'name', sortable: false },
      ],
      personnelloading:false,
      loadingTXT_personnel:'No DATA',
      personnelfilename:'Personnel.csv',
      personnel_labels: {
          id:'Personnel ID',
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          Age:'Age',
          email:'Email',
          emp_group:'Employee Group',
          gender: 'Gender',
          grade_pay: 'Grade Pay',
          mobile: 'Mobile',
          name: 'Name',
          office_id:'Office ID',
          pay_level:'Pay Level',
          phone: 'Phone',
          post_stat: 'Post Status',
          remark:'Remark'

        },
        personnel_csvfields : ['id','basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','phone','post_stat','remark'],

      personnels: [],
      personnel_csv:[],
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
        this.personnelloading=true
        this.loadingTXT_personnel='Loading....'
        this.tableloading=true
        axios.post('/getpersonnelbypoststat',{
          post_stat: this.post_stat_id
        })
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.personnels=[]
            this.personnel_csv=[]
            this.loadingTXT_personnel='No Data Found'
            this.personnelloading=false
          }
         else{
           this.personnels=[]
           this.personnel_csv=[]
            response.data.forEach(item => {

                this.personnels.push(item)
                this.personnel_csv.push(item)

              })
              this.personnelloading=false
              this.loadingTXT_personnel='Download as CSV'
              this.tableloading=false
              this.loadpoststatus()
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })

      },

      update_post_staatus(personnel_id,office_id,post_stat){
        if(post_stat!=undefined){
        if(confirm('Are you confirm ?')){
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
