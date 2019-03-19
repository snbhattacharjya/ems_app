<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>



      <v-layout row wrap  >
      <v-flex xs4>
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
          >
        </v-select>
      </v-flex>
      <v-flex xs4>
         <v-select
                :items="districts"
                v-model="district_id"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select district"
                >
              </v-select>
      </v-flex>

      <v-flex xs1>
        <v-btn color="primary" @click="getuser" :disabled="loading" :loading="loading">Show User</v-btn>
      </v-flex>


      <v-flex  xs12 v-if="show_user">
        <v-switch  v-model="user_active" :label="`User Active : ${user_active.toString()}`" color="success"  @change="update_user_permission(user_type,user.active)" ></v-switch>
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
      ],
      user:[],
      show_user:false,
      user_active:false,
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
              axios.get('/getuser/'+this.district_id+'/'+this.user_type,{
              })
              .then((response, data) => {
                if(response.data.length>0){
                  response.data.forEach(item => {
                     this.user_active= item.is_active==1? true: false
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
          })
      },
      update_user_permission:function(user_type,active){
        this.updating=true
        axios.post('/updateuser',{
              district:this.district_id,
              user_type:user_type,
              active: active==true? 1:0
              })
              .then((response, data) => {
                  this.show_message = true
                  this.message_type = 'success'
                  this.message_icon = 'check_circle'
                  this.message_text = response.data
                  this.updated =true
                  this.updating=false
                  this.user_active= active==1? true: false
                  })
              .catch(error => {
                console.log(error)
              })
      }

    }
  }
</script>
