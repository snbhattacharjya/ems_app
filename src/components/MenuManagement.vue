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

      <v-flex xs1>
        <v-btn color="primary" @click="getmenu(user_type)" :disabled="loading" :loading="loading">Show Menu</v-btn>
      </v-flex>


      <v-flex  xs12>
        <v-card class="mb-5">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Menu list with permission</v-toolbar-title>
          </v-toolbar>
           <v-form>

<v-progress-circular  indeterminate  color="primary" v-if="updating==true"></v-progress-circular>
               <template v-for="item in menus">
              <v-list-group v-if="item.submenu !== 'null'" :key="item.top_menu_id" :group="item.top_menu_id" no-action="no-action">
                <v-list-tile slot="activator">
                  <v-list-tile-title>{{item.menu_name}}</v-list-tile-title>
                </v-list-tile>
                  <v-list-tile v-for="subItem in item.submenu" :key="subItem.menu_name" no-action="no-action">
                    <v-list-tile-action>
                    <v-switch v-model="subItem.active" color="success" @change="update_menu_permission(subItem.menu_id,user_type,subItem.active)" ></v-switch>

                    </v-list-tile-action>
                    <v-list-tile-title v-text="subItem.menu_name">
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list-group>

                <v-list-tile v-else no-action="no-action"  ripple="ripple"  rel="noopener" :key="item.top_menu_id" >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.menu_name }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
             </template>



           </v-form>

      </v-card>
      </v-flex>
      <v-snackbar v-model="updated" :multi-line="false"  :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="updated = false">Close</v-btn>
          </v-snackbar>

      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    name:'MenuManagement',
    data: () => ({
      user_type:'',
      users:[
        {'name':'DEO','id':'03'},
        {'name':'ADM','id':'05'},
        {'name':'SDO','id':'06'},
        {'name':'BDO','id':'07'},
        {'name':'PPCELL','id':'08'},
      ],
      menus:[],
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
       getuser:function(){
          return this.$store.getters.getUser
       },

    },

    mounted() {

    },

    created () {


    },

    methods: {
      getmenu:function(val){
        this.$validator.validate()
          .then(result => {
            if(result){
              this.loading=true
              this.menus=[]
              axios.get('/getmenu/'+val,{
              })
              .then((response, data) => {
                  response.data['menu'].forEach(item => {

                      item['active']= item.active==1? true: false
                      this.menus.push(item)
                    })
                    this.loading=false
                  })
              .catch(error => {
                console.log(error)
              })
            }
          })
      },
      update_menu_permission:function(menu_id,user_type,active){
        this.updating=true
        axios.post('/updatemenu',{
              menu_id:menu_id,
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
                  })
              .catch(error => {
                console.log(error)
              })
      }

    }
  }
</script>
