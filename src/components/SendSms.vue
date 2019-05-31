<template>
<v-container fluid>
    <v-layout row wrap fill-height>
      <v-flex xs12>
        <v-tabs grow v-model="active" color="primary" dark slider-color="yellow" max="100%" class="elevation-6 mb-5" >
                <v-tab  ripple >
                Send SMS
                </v-tab>
                <v-tab  ripple >
                SMS List
                </v-tab>
                <v-tab-item >
                  <v-card flat>
                    <v-card-text>
                      <v-form>
                        <v-select
                        v-if="this.getuser.level==2"
                          :items="users_ceo"
                          v-model="user_type"
                          item-text= "name"
                          item-value= "id"
                          prepend-icon="list"
                          label="Select User type"
                          v-validate="'required'"
                          :error-messages="errors.collect('user_type')"
                          data-vv-name="user_type"
                          @change="getuserlist"
                          >
                        </v-select>
                        <v-select
                        v-if="this.getuser.level==12"
                          :items="users_district"
                          v-model="user_type"
                          item-text= "name"
                          item-value= "id"
                          prepend-icon="list"
                          label="Select User type"
                          v-validate="'required'"
                          :error-messages="errors.collect('user_type')"
                          data-vv-name="user_type"
                          @change="getuserlist"
                          >
                        </v-select>
                        <v-layout row wrap>
                        <v-flex xs10>
                        <v-autocomplete
                          :items="lists"
                          v-model="user_list"
                          item-text= "name"
                          item-value= "user_id"
                          prepend-icon="list"
                          label="Select User"
                          v-validate="'required'"
                          :error-messages="errors.collect('user_list')"
                          data-vv-name="user_list"
                          :disabled="disable_list"
                          multiple
                          :loading="loading_user_list"
                          :placeholder="loading_user_list_txt"
                          >
                        </v-autocomplete>
                        </v-flex>
                        <v-flex xs2>
                        <v-checkbox :disabled="disable_select" v-model="select_all" label="Select All"></v-checkbox>
                        </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex xs6>
                          <v-textarea
                            id="sms"
                            prepend-icon="message"
                            name="sms"
                            ref="sms"
                            label="New Message"
                            type="text"
                            counter
                            maxlength="160"
                            v-model="sms"
                            auto-grow
                            v-validate="'required|max:160'"
                            data-vv-name="sms"
                            :error-messages="errors.collect('sms')"
                          ></v-textarea>
                          </v-flex>
                          <v-flex xs5 ml-5>
                            <label>Preview Message</label>
                          <v-textarea
                            id="preview_sms"
                            prepend-icon=""
                            name="preview_sms"
                            ref="preview_sms"
                            label="**WBELEC"
                            type="text"
                            v-model="sms"
                            readonly=true
                            outline
                            auto-grow

                          ></v-textarea>
                          </v-flex>
                        </v-layout>
                          <v-btn color="primary" @click="send_sms"  :disabled="disable_save">Send</v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item >
                  <v-card flat>
                    <v-card-text>
                      <v-data-table :headers="headers" :items="message_list" :search="search" class="elevation-1" >
                        <template   slot="items" slot-scope="props">
                          <td width="10%">{{ props.item.sl }}</td>
                          <td width="25%">{{ props.item.user_level.full_designation }}<br>{{ props.item.sms_to }}</td>
                          <td width="15%">{{ props.item.sms_from }}</td>
                          <td width="50%">{{ props.item.message }}<br><span class="grey--text">{{  moment(props.item.updated_at).format('MMMM Do YYYY, h:mm:ss a') }}</span></td>

                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                          Your search for "{{ search }}" found no results.
                        </v-alert>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
        </v-tabs>
      </v-flex>



    </v-layout>
    <v-snackbar v-model="snackbar" :multi-line="false"  :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
  </v-container>
</template>
<script>


  export default{
    name: 'SendSms',
    data (){
      return {
        active: null,
        user_type:'',
        users_district:[
          {'name':'ADM','id':'05'},
          {'name':'SDO','id':'06'},
          {'name':'BDO','id':'07'},
          {'name':'PPCELL','id':'08'},
          {'name':'OFFICE','id':'10'},
        ],
        users_ceo:[
          {'name':'DEO','id':'12'},
        ],
        lists:[],
        user_list:'',
        loading_user_list:false,
        loading_user_list_txt:'',
        select_all:false,
        disable_select:true,
        sms:'',
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        disable_save: true,
        disable_list:false,
        snackbar: false,
        message_list:[],
        headers: [
        { text: 'SL', value: 'i',align: 'left',sortable: false },
        { text: 'SMS To', value: 'sms_to',align: 'left',sortable: true },
        { text: 'SMS From', value: 'sms_from',sortable:true},
        { text: 'Message Details',align: 'left',value: 'message',sortable: true},
      ],
        dictionary: {

          custom: {
            user_type: {
              required: 'Please select User type'
            },
            sms: {
              required: 'New password is required',
              max:'SMS must be maximum 160 characters '
            }
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
      this.getsms()
    },
    watch:{
      sms:function(val){
        if(val.trim().length>0){
          this.disable_save=false
        }else{
          this.disable_save=true
        }
      },


      select_all:function(val){

        if(val==true){
          this.disable_list=true
          this.user_list=[]
        }else{
          this.disable_list=false
          this.select_all=false
        }

      }
    },
    methods:{
      getsms:function(){
        axios.post('/getallsms',{mode:this.getuser.level})
        .then((response, data) => {
          if(response.data.length>0){
            this.message_list=[]
            var c=1
            response.data.forEach(item => {
                item['sl']=c
                this.message_list.push(item)
                c++
              })
          }
         })
        .catch(error => {
          console.log(error)
        })
      },
      send_sms:function(){
         axios.post('/sendsms',{msg:this.sms,all:this.select_all,users:this.user_list,level:this.user_type,count:this.lists.length})
        .then((response, data) => {
          if(response.data.status==200){
            this.showMessage(response.data.msg)
            this.sms=''
            this.user_list=''
            this.select_all=false
            this.$validator.reset()
            this.getsms()
          }
         })
        .catch(error => {
          console.log(error)
        })
      },
      getuserlist:function(val){
        this.loading_user_list_txt="Loading ........"
        axios.post('/getuserlistbytype',{level:val,mode:this.getuser.level})
        .then((response, data) => {
          if(response.data.length === 0){
          this.lists=[]
          this.loading_user_list_txt="No data available"
          this.disable_select=true
          }
         else{
           this.loading_user_list=true
           this.loading_user_list_txt="Loading ........"
           this.lists=[]
            response.data.forEach(item => {
                item['name']=item['user_id']+'-'+item['name']
                this.lists.push(item)
              })
              this.loading_user_list_txt=response.data.length+" user(s) available"
              this.loading_user_list=false
              this.disable_select=false
         }
            })
        .catch(error => {
          console.log(error)
        })
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
