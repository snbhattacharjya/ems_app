<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>All Users</v-toolbar-title>
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
      :items="users"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.user_id }}</td>
        <td >{{ props.item.name }}</td>
        <td >{{ props.item.designation }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{ props.item.email }}</td>
        <td class="justify-center layout px-0" style="display:none;">
          <v-btn flat :to="'/user/'+props.item.user_id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn>
          <v-btn flat :to="'/user/'+props.item.user_id+ '/delete'"><v-icon small> delete</v-icon></v-btn>
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
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'ID', value: 'user_id',align: 'left', },
        { text: 'Name',align: 'left',sortable: false,value: 'name'},
        { text: 'Designation', value: 'designation',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Email', value: 'email',align: 'left', }
        //{ text: 'Actions', value: 'name', sortable: false }
      ],
      users: [],

    }),

    computed: {

    },

    watch: {

    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.tableloading=true
        axios.get('/alluser')
        .then((response, data) => {
         if(response.data.length === 0){this.tableloading=false}
         else{
          response.data.forEach(item => {
              this.users.push(item)
            })
            this.tableloading=false
         }
          })
        .catch(error => {
          console.log(error)
          this.tableloading=false
        })
      },


    }
  }
</script>
