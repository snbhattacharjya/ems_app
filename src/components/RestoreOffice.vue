<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
       <v-alert v-if="restored" v-model="alert" dismissible type="success">
        Office restored successfully
        </v-alert>
      <v-layout row wrap  class="">
        <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>Trashed Offices</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>

      <v-spacer></v-spacer>
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
      :items="offices"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td >{{ props.item.name }}</td>
        <td >{{ props.item.address }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{ props.item.pin }}</td>
        <td class="justify-center layout px-0">
          <v-btn title="Click to restore office" flat><v-icon  class="mr-2" @click="restore_office(props.item.id)">restore_from_trash</v-icon></v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
      </v-flex>
      </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    data: () => ({
      alert: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office Name', align: 'left',  value: 'name'},
        { text: 'Address', value: 'adress',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Pin', value: 'pin',align: 'left', },
        { text: 'Actions', value: 'name', sortable: false },
      ],
      offices: [],
      restored:false
    }),

    computed: {
      getuser(){
          return this.$store.getters.getUser
       },
    },

    watch: {

    },

    created () {
        this.initialize()
    },

    methods: {
      initialize () {
        this.tableloading=true
        axios.get('/gettrashedOffice')
        .then((response, data) => {
          if(response.data.length === 0){
          this.offices=[]
          this.tableloading=false}
         else{
           this.offices=[]
            response.data.forEach(item => {
                this.offices.push(item)
              })
              this.tableloading=false
         }
            })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },
      restore_office:function(val) {
        if(confirm('Are you sure to Restore office - '+val+' ?')){
        this.tableloading=true
        this.deleting=true
        axios.get('/isrestore/'+val)
        .then((response, data) => {
            this.initialize()
            this.restored=true
            this.alert=true
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
