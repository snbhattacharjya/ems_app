<template>
<v-container fluid>
    <v-layout align-center justify-center>


      <v-flex xs12>
        <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Sharing of Polling Personnel Data</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
          <v-form>
          <v-layout row wrap  >
            <v-flex xs6>
              <v-select
                :items="districts"
                v-model="district_from"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select District(From which data will be shared)"
                v-validate="'required'"
                data-vv-name="district_from"
                :error-messages="errors.collect('district_from')"
                autocomplete
                :search-input.sync="searchInput_from"
                >
              </v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                :items="districts"
                v-model="district_to"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select District(To which data will be shared)"
                v-validate="'required'"
                data-vv-name="district_to"
                :error-messages="errors.collect('district_to')"
                autocomplete
                :search-input.sync="searchInput_to"
                >
              </v-select>
            </v-flex>
            <v-flex xs4 class="mt-3">
              <v-select
                :items="polling_posts"
                v-model="post"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select Polling Post"
                v-validate="'required'"
                data-vv-name="post"
                :error-messages="errors.collect('post')"

                >
              </v-select>
              <v-select
                  :items="genders"
                  item-text= "name"
                  item-value= "id"
                  prepend-icon="list"
                  label="Gender(*)"
                  v-model="gender"
                  v-validate="'required'"
                  data-vv-name="gender"
                  :error-messages="errors.collect('gender')"
                  @change="getdata"
                >
                </v-select>
            </v-flex>
            <v-flex xs4 class="ml-3 mt-3">
              <table class="v-datatable v-table dark" border=1>
                <thead>
                  <tr>
                  <td class="nopad">Available</td>
                  <td class="nopad">Required<br>(with 20% reserved)</td>
                  <td class="nopad">Available<br>for Share</td>
                  </tr>
                </thead>
                <tr>
                  <td class="nopad">{{this.posts_available}}</td>
                  <td class="nopad">{{Math.round(parseInt(this.posts_required)*1.2,0)}}</td>
                  <td class="nopad">{{this.posts_available>this.posts_required ? this.posts_available-Math.round(parseInt(this.posts_required)*1.2,0) : 'NA'}}</td>
                </tr>
              </table>
            </v-flex>
            <v-flex xs3 class="ml-3 mt-3" >
              <v-text-field
                  prepend-icon="input"
                  name="share_pp"
                  label="Input Number of PP to share"
                  type="text"
                  counter
                  maxlength="5"
                  v-model="share_pp"
                  v-validate="'required'"
                  data-vv-name="share_pp"
                  :error-messages="errors.collect('share_pp')"
                  :disabled="this.posts_available==0 || this.share_pp==''"
                ></v-text-field>
            </v-flex>
          </v-layout>
            </v-form>
          </v-card-text>

          <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="primary" @click="add_sharing" :disabled="this.posts_available==0 || this.share_pp=='' || disable_save" :loading="loading">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>Share List as per WBCEO Office</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
<v-btn v-if="this.share_data.length > 0" id="printbtn" fab dark small color="primary" @click="print"><v-icon dark>print</v-icon></v-btn>      <v-spacer></v-spacer>
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
      :items="share_data"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
      id="tableprint"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td >{{ props.item.from_district }}</td>
        <td >{{ props.item.to_district }}</td>
        <td >{{ props.item.category }}</td>
        <td >{{ props.item.gender }}</td>
        <td v-if="props.item.no_of_personnel>props.item.no_of_personnel_shared" >

          <v-edit-dialog
                      :return-value.sync="props.item.no_of_personnel"
                      lazy
                      large
                      @save="update_share(props.item.id,props.item.no_of_personnel)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ props.item.no_of_personnel }} <v-icon small id="clk2e" class="ml-5" color="info" title="Click to Edit">edit</v-icon>
                      <v-text-field
                        slot="input"
                        v-model="props.item.no_of_personnel"

                        label="Edit"
                        single-line

                      ></v-text-field>
                    </v-edit-dialog>
        </td>
        <td v-else>{{ props.item.no_of_personnel }}</td>
        <td >{{props.item.no_of_personnel_shared==null ? 0 : props.item.no_of_personnel_shared}}</td>
        <td>Created - {{moment(props.item.created_at).format('DD/MM/YYYY h:mm a')}}<br> Last Updated - {{moment(props.item.updated_at).format('DD/MM/YYYY h:mm a')}}</td>
        <td>
          <v-btn v-if="props.item.no_of_personnel_shared==null" :loading="is_share" color="error" @click="delete_share(props.item.id)"><v-icon small class="mr-2">delete</v-icon>Delete</v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
      </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  export default{
    name: 'DataSharingceo',
    data (){
      return {
        tableloading:false,
        loading:false,
        disable_save:false,
        valid: true,
        share_data:[],
        districts:[],
        district:'',
        district_from:'',
        district_to:'',
        polling_posts:[],
        post:'',
        posts_available:0,
        posts_required:0,
        share_pp:'',
        searchInput_to:'',
        searchInput_from:'',
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        search:'',
        gender:'',
       genders: [
          {
            id: 'M',
            name: 'Male'
          },
          {
            id: 'F',
            name: 'Female'
          }
        ],
        headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'District(From)', align: 'left',  value: 'from_district'},
        { text: 'District(To)', value: 'to_district',align: 'left', },
        { text: 'Post Status', value: 'category',align: 'left', },
        { text: 'Gender', value: 'gender',align: 'left', },
        { text: 'Personnel assigned by CEO', value: 'no_of_personnel',align: 'left', },
        { text: 'Personnel shared TO', value: 'no_of_personnel_shared',align: 'left', },
        { text: 'Datetime Details', value: '',align: 'left',sortable: false },
        { text: 'Action', value:'',}

      ],
        dictionary: {

          custom: {
             district_from: {
              required: 'District is required'
            },
            district_to: {
              required: 'District is required'
            },
          }
        }
      }
    },
    $_veeValidate: {
      validator: 'new'
    },
    beforeUpdate() {


    },
    created(){
      this.alldistrict()
      this.allposts()
      this.get_sharing()
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)

    },
    watch:{
      district_to:function(val){
        if(this.district_from == val){
          this.district_to=''
          //alert('Both District can not be same')
          this.errors.add(
                  {
                    field: 'district_to',
                    msg: 'Both District can not be same'
                  }
                )
        }

      },
      district_from:function(val){
        if(this.district_to == val){
          this.district_from=''
          //alert('Both District can not be same')
          this.errors.add(
                  {
                    field: 'district_from',
                    msg: 'Both District can not be same'
                  }
                )
        }

      },
      share_pp:function(val){
        if(val> (this.posts_available-Math.round(parseInt(this.posts_required)*1.2,0))){
          alert('Number is more than personnel availabe for share')
          this.disable_save=true
          this.errors.add(
                  {
                    field: 'share_pp',
                    msg: 'Number is more than personnel availabe for share'
                  }
                )
        }
        else if(val==0){
          //alert('Number can not be Zero for share')
          this.disable_save=true
          this.errors.add(
                  {
                    field: 'share_pp',
                    msg: 'Number can not be Zero for share'
                  }
                )
        }
        else{
          this.disable_save=false
        }
      }
    },
    methods:{
      delete_share:function(id){
        if(confirm('Are you sure ?')){

          axios.post('/deleteshareinstruction',{sharing_id:id})
          .then((response, data) => {
          this.get_sharing()
          alert(response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
      },
      update_share:function(sharing_id,assign_polling_personnel){
        if(confirm('Are you sure ?')){
          axios.post('/updateshareinstruction',{
            sharing_id:sharing_id,
            // from_district:from_district,
            // to_district:to_district,
            // category:category,
            // gender:gender,
            assign_polling_personnel:assign_polling_personnel
            })
          .then((response, data) => {
          this.get_sharing()
          alert(response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
      },
       open () {
        this.show_message = false
          this.message_type = ''
          this.message_icon = ''
          this.message_text = ''
          this.snackbar =false
      },
      print:function(){
        //alert(this.share_data.length)
        printJS({printable:this.share_data, header: 'Polling Personnel Management System - Share List as per WBCEO Office', properties: ['id','from_district','to_district','category','gender','no_of_personnel','no_of_personnel_shared'], type: 'json'})
      },
      get_sharing:function(){
        this.share_data=[]
        this.tableloading=true
        axios.get('/instructlist')
        .then((response, data) => {
        response.data.forEach(item => {
            this.share_data.push(item)
          })
        })
        .catch(error => {
          console.log(error)
        })
        this.tableloading=false
      },
      add_sharing:function(){
        if(confirm('Are you sure ?')){
        this.loading = true
        this.$validator.validate()
        .then(result =>{
            if(result){
              axios.post('/instructforshare',{
                from_district:this.district_from,
                to_district:this.district_to,
                category:this.post,
                assign_polling_personnel:this.share_pp,
                gender:this.gender
              })
              .then((response, data) => {
                this.share_pp=''
                this.posts_available=0
                this.posts_required=0
                alert(response.data)
                this.get_sharing()

              })
              .catch(error => {
                console.log(error)
              })
              this.loading = false
            }
        })
        .catch(error => {
          this.loading = false
        })
        }
      },
      alldistrict:function(){
        axios.get('/getdistrict')
      .then((response, data) => {
       response.data.forEach(item => {
          this.districts.push(item)
        })
      })
      .catch(error => {
        console.log(error)
      })
      },
      allposts:function(){
      axios.get('/pollingPost')
      .then((response, data) => {
       response.data.forEach(item => {
          this.polling_posts.push(item)
        })
      })
      .catch(error => {
        console.log(error)
      })
      },
      getdata:function(){
        if(this.district_from!='' && this.district_to!='' && this.gender!='' && this.district_from!=this.district_to){
          this.posts_available='loading..'
          this.posts_required='loading..'
          axios.post('/getsharerequiremnet',{
            from_district:this.district_from,
            to_district:this.district_to,
            category:this.post,
            gender:this.gender
          })
          .then((response, data) => {
            var req=0
            let avl=response.data['available'][0]['available']==null ? 0 : parseInt(response.data['available'][0]['available'])
            if(this.post=='MO'){
              if(this.gender=='M'){var req=parseInt(response.data['requirement'][0]['MaleMoRequirement'])}
              else if(this.gender=='F'){var req=parseInt(response.data['requirement'][0]['FemaleMoRequirement'])}
              else{var req=0}

            }
            else if(this.post=='AEO'){
              if(this.gender=='M'){var req=parseInt(response.data['requirement'][0]['MaleAeoRequirement'])}
              else if(this.gender=='F'){var req=parseInt(response.data['requirement'][0]['FemaleAeoRequirement'])}
              else{var req=0}
            }
            else{
            if(this.gender=='M'){var req=parseInt(response.data['requirement'][0]['MalePartyRequirement'])}
              else if(this.gender=='F'){var req=parseInt(response.data['requirement'][0]['FemalePartyRequirement'])}
              else{var req=0}
            }

            this.posts_available=avl
            this.posts_required=req
            this.share_pp= avl>req ? avl-Math.round(parseInt(req)*1.2,0) : ''

          })
          .catch(error => {
            console.log(error)
          })
        }else{
          this.post=null
          this.$validator.reset()
          alert('Please select both distric first and then post status and gender also')

        }

      },

      showError:function(error){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = error
        this.snackbar =true
      },
      showMessage:function(msg){
        this.show_message = true
        this.message_type = 'success'
        this.message_icon = 'success'
        this.message_text = msg
        this.snackbar =true
      },

    },
    computed:{
       getuser:function(){
          return this.$store.getters.getUser
       },
    },



  }
</script>
<style scoped>
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>
