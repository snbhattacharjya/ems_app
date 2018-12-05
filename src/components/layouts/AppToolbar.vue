<template>
  <div id="dashboard">
    <v-toolbar :clipped-left="true" color="primary" app dark>
      <v-toolbar-side-icon  id="menu"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-avatar color="primary"><img src="/static/Election_Commission_of_India_Logo.png" alt="avatar"></v-avatar>
        <router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black">WBPPMS</router-link>
      </v-toolbar-title>


      <v-spacer></v-spacer>
      <v-toolbar-title class="ml-0 mr-5">
        {{getElection[0].name}} - {{getElection[0].year}}
      </v-toolbar-title>
      <v-toolbar-title class="ml-5 mr-5">
        <!-- {{ moment(new Date()).format('DD/MM/YYYY h:mm a')}} -->
        <h5><v-icon>date_range</v-icon>{{this.date}} <v-icon>access_time</v-icon>{{this.time}}</h5>
      </v-toolbar-title>
        Code: {{getUser.user_id}} <br>District : {{getUser.district[0]}}
        <v-menu bottom left>

            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile
                v-for="(item, i) in items"
                :key="i"
                :to="item.path"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-icon @click="dialog = true">exit_to_app</v-icon>

    </v-toolbar>
    <app-drawer :mode="drawer" v-if="show"></app-drawer>
   <v-dialog
      v-model="dialog"
      max-width="290"
      persistent=true
    >
      <v-card>
        <v-card-title class="headline">WBPPMS</v-card-title>

        <v-card-text>
         {{this.msg}}
        </v-card-text>

        <v-card-actions v-show="this.show_action">
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"

            @click="logout"
          >
            Confirm
          </v-btn>
          <v-btn
            color="red darken-1"

            @click="dialog = false"
          >
            Cancel
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppDrawer from '@/components/layouts/AppDrawer'
  export default {
    data () {
      return {
        username: '',
        drawer:null,
        show:null,
        date:'',
        time:'',
        items: [
          {title: 'Profile', path: '/profile'},

        ],
        dialog: false,
        msg:'Are you sure to Sign out ? Please confirm.',
        show_action:true
      }
    },
    beforeUpdate(){
        // console.log('Pasword = '+this.getUser.change_password)
      if(this.getUser.change_password === 0){
        this.$router.replace("/change_password")
        this.show=false
        }
        else if(this.getUser.change_password === 1){
        this.show=true
        }
    },
    created(){
      setInterval(() => {
          this.timer()
        },1000)
    },
    components: {
      AppDrawer,
    },
    methods: {
      logout(){
        this.show_action=false
        this.msg='Logging out from system.........'
        this.$store.dispatch('destroyToken')

        setTimeout(() => {
        this.dialog=false
        this.msg=''
        this.$router.replace("/")
                },2000)


      },
      toogle(){
        if(this.show === false){this.show= true}
        else if(this.show === true){this.show = false}
      },
      timer(){
      var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
       var cd = new Date()
       this.date = this.zeroPadding(cd.getDate(), 2) + '-' +this.zeroPadding(cd.getMonth()+1, 2)  + '-' +this.zeroPadding(cd.getFullYear(), 4) + ' ' +  week[cd.getDay()]
       this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      },
      zeroPadding(num, digit) {
          var zero = ''
          for(var i = 0; i < digit; i++) {
              zero += '0'
          }
          return (zero + num).slice(-digit)
      }
    },
    computed: {
      getUser:function(){
        return this.$store.getters.getUser
      },
      getElection:function(){
        return this.$store.getters.getElection
      },
    }
  }
</script>

