<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>Office List(Personnel not enlisted)</v-toolbar-title>
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
        <td >{{ props.item.name }}({{ props.item.identification_code }})</td>
        <td >{{ props.item.address }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{props.item.post_office}}</td>
        <td>{{ props.item.pin }}</td>
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
    name:'OfficeStaus',
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Office Name', align: 'left', sortable: false, value: 'name'},
        { text: 'Address', value: 'adress',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Post Office', value: 'post_office', sortable: false },
        { text: 'Pin', value: 'pin',align: 'left', }
      ],
      offices: [],


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
        axios.get('/officeentrystatus')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
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


    }
  }
</script>
