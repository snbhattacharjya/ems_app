<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>

      <v-layout row wrap  class="">
        <v-text-field
                prepend-icon="search"
                name="office_search"
                label="Search"
                type="text"
                v-model="office_search"
                persistent-hint
                hint="Search by Office ID or Mobile or Name"
                clearable
                @keydown.enter="search_office"
              ></v-text-field>
              <v-btn color="primary" @click="search_office" :loading="searching">Search Office</v-btn>
      <v-flex xs12>
        <v-alert v-if="not_found" v-model="alert" dismissible type="error">
        Not Found
        </v-alert>
        <v-card class="my-5" :loading="tableloading" v-if="offices.length>0">
        <template v-for="(office, index) in offices" >
        <v-list :key="index">
          <v-list-tile >
            <v-list-tile-action><v-icon >business</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{office.name}}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">ID :{{office.id}} | Mobile :{{office.mobile}} | PIN :{{office.pin}} | Email :{{office.email}}</v-list-tile-sub-title>

            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon  @click="delete_office(office.id)" :loading="deleting" title="Click to delete office" class="mr-2">delete_forever</v-icon>
            </v-list-tile-action>

          </v-list-tile>
          <hr class="v-divider mt-3 theme--light">

        </v-list>
</template>
        </v-card>
      </v-flex>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    data: () => ({
      tableloading: false,
      deleting:false,
      searching:false,
      office_search: '',
      offices: [],
      not_found:false,
      alert:false
    }),

    computed: {
      getuser(){
          return this.$store.getters.getUser
       },
    },

    watch: {
      office_search:function(val){
        if(this.office_search == null || this.office_search==''){
          this.offices=[]
        }
      }
    },

    created () {

    },

    methods: {
      search_office () {
        this.alert=false
        this.not_found=false
        this.tableloading=true
        if(this.office_search.length>0 && this.office_search.trim()!=''){
          this.searching=true
          axios.get('/issearch/'+this.office_search)
          .then((response, data) => {
            if(response.data.length === 0){
              this.tableloading=false
              this.searching=false
              this.not_found=true
              this.alert=true
            }
          else{
            this.offices=[]
              response.data.forEach(item => {
                  this.offices.push(item)
                })
                this.tableloading=false
                this.searching=false
          }
              })
          .catch(error => {
            console.log(error)
            this.tableloading=false
            this.searching=false
          })

        }
        else{

        }

      },
      delete_office:function(val) {
        if(confirm('Are you sure to delete office - '+val+' ? Please confirm no Personnel data are available for this office.')){
        this.tableloading=true
        this.deleting=true
        axios.get('/isdelete/'+val)
        .then((response, data) => {
            this.offices=[]
            })
        this.deleting=false
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
        }
      },



    }
  }
</script>
