<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>



      <v-layout row wrap  >
      <v-flex xs3>
          <v-select
          :items="users"
          v-model="user_type"
          item-text= "name"
          item-value= "id"
          prepend-icon="list"
          label="Select User type"
          v-validate="'required'"
          :error-messages="errors.collect('user_type')"
          data-vv-name="user_type"
          autocomplete
          >
        </v-select>
      </v-flex>
      <v-flex xs3>
         <v-select
                :items="districts"
                v-model="district_id"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select district"
                autocomplete
                >
              </v-select>
      </v-flex>
      <v-flex v-show="this.user_type==10" xs12>
                <v-select
                :items="office_users"
                v-model="office_user"
                item-text= "name"
                item-value= "user_id"
                prepend-icon="list"
                label="Select Office User"

                autocomplete
                >
              </v-select>
            </v-flex>
      <v-flex xs1>
        <v-btn color="primary" @click="getuser" :disabled="loading" :loading="loading">Show User</v-btn>
      </v-flex>


      <v-flex  xs12 v-if="show_user">
        <v-switch v-for="(item, index) in items" :key="index"  v-model="item.is_active"  :label="item.name+' ('+item.user_id+')'"  color="success"  @change="update_user_permission(item.id,$event)" ></v-switch>
      </v-flex>
      <v-snackbar v-model="updated" :multi-line="false"  :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="updated = false">Close</v-btn>
          </v-snackbar>
           <v-progress-circular  indeterminate  color="primary" v-if="updating==true"></v-progress-circular>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>
  export default {
    name:'UserManagement',
    data: () => ({
      user_type:'',
      users:[
        {'name':'DEO','id':'03'},
        {'name':'ADM','id':'05'},
        {'name':'SDO','id':'06'},
        {'name':'BDO','id':'07'},
        {'name':'PPCELL','id':'08'},
        {'name':'OFFICE','id':'10'},
      ],
      user:[],
      office_users:[],
      office_user:'',
      show_user:false,
      user_active:false,
      items:[],
      districts:[],
      district_id:'',
      loading:false,
      updated:false,
      updating:false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
    }),

    $_veeValidate: {
      validator: 'new'
    },
    computed: {


    },

    mounted() {

    },

    created () {
      this.getdistrict()

    },
    watch:{
      district_id:function(val){
        if(this.user_type!='' && this.user_type==10){
          axios.post('/getuser',{
                           district_id:this.district_id,
                           user_type:this.user_type,
                           mode:''
                            })
              .then((response, data) => {
                if(response.data.length>0){
                  this.office_users=[]
                    response.data.forEach(item => {
                      item['name']=item['user_id']+'-'+item['name']
                      this.office_users.push(item)
                    })
                }
              })
        }

        },
        user_type:function(val){
          this.show_user=false

          if(this.user_type!='' && this.user_type==10){
          axios.post('/getuser',{
                           district_id:this.district_id,
                           user_type:this.user_type,
                           mode:''
                            })
              .then((response, data) => {
                if(response.data.length>0){
                  this.office_users=[]
                    response.data.forEach(item => {
                      item['name']=item['user_id']+'-'+item['name']
                      this.office_users.push(item)
                    })
                }
              })
          }
        }

    },
    methods: {
      getdistrict:function(){
        axios.get('/getdistrict')
      .then((response, data) => { //console.log(response.data['available'])
       response.data.forEach(item => { //console.log(item)
          this.districts.push(item)
        })
      })
      .catch(error => {
        console.log(error)
      })
      },
      getuser:function(){

        this.$validator.validate()
          .then(result => {
            if(result){
              this.loading=true
              this.show_user=false
              this.user=[]
              this.items=[]
              if(this.user_type!=10){
              axios.post('/getuser',{
                           district_id:this.district_id,
                           user_type:this.user_type,
                           mode:'admin_user'
                            })
              .then((response, data) => {
                if(response.data.length>0){

                    response.data.forEach(item => {
                      item.is_active==1? item['is_active']=true: item['is_active']=false
                      this.items.push(item)
                      })

                      this.show_user=true
                      this.loading=false
                }
                else{
                  this.loading=false
                  this.show_user=false
                  this.show_message = true
                  this.message_type = 'error'
                  this.message_icon = 'check_circle'
                  this.message_text = 'User not found'
                  this.updated =true
                }
                  })
              .catch(error => {
                console.log(error)
              })
              }else if(this.user_type==10){
                      if(this.office_user==''){
                        alert('Please select Office users from list')
                      }else{
                         axios.post('/getuser',{
                           district_id:this.district_id,
                           user_type:this.user_type,
                           user_id:this.office_user,
                           mode:'office_user'
                            })
                            .then((response, data) => {
                              if(response.data.length>0){

                                  response.data.forEach(item => {
                                    item.is_active==1? item['is_active']=true: item['is_active']=false
                                    this.items.push(item)
                                    })
                                    this.show_user=true
                                    this.loading=false
                              }
                              else{
                                this.loading=false
                                this.show_user=false
                                this.show_message = true
                                this.message_type = 'error'
                                this.message_icon = 'check_circle'
                                this.message_text = 'User not found'
                                this.updated =true
                              }
                                })
                            .catch(error => {
                              console.log(error)
                            })
                      }
                  }
            }
          })

      },
      update_user_permission:function(id,$event){
        //return alert(id+'///'+$event)
        this.updating=true
        axios.post('/updateuser',{
              district:this.district_id,
              user_type:this.user_type,
              active: $event==true? 1:0,
              user_id: this.user_type==10? this.office_user:id
              })
              .then((response, data) => {
                  this.show_message = true
                  this.message_type = 'success'
                  this.message_icon = 'check_circle'
                  this.message_text = response.data
                  this.updated =true
                  this.updating=false

                  })
              .catch(error => {
                console.log(error)
              })
       }

    }
  }
</script>
