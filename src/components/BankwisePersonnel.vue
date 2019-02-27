<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>

      <v-layout row wrap  class="my-5">

      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>All Banks</v-toolbar-title>
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
      <template   slot="items" slot-scope="props">
        <td>{{ props.item.ifsc }}</td>
        <td>{{ props.item.bank_name }}</td>
        <td >{{ props.item.noofperonnel }}</td>
        <td  class="justify-center layout px-0">
          <v-btn flat :to="'/bank/'+props.item.ifsc+ '/list'"><v-icon small class="mr-2">edit</v-icon> See List</v-btn>
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
    name:'BankwisePersonnel',
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'Branch IFSC', value: 'ifsc',align: 'left', },
        { text: 'Bank Name', value: 'bank_name',align: 'left', },
        { text: 'Number of Personnel', align: 'left',  value: 'noofperonnel'},
        { text: 'Actions', value: '', sortable: false },

      ],
      offices: [],
      office_created:'',
      alert:false,

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
        axios.get('/bankWisePersonnelReport')
        .then((response, data) => {
          if(response.data.length === 0){this.tableloading=false}
         else{
            response.data.forEach(item => {
              if(item['bank_name']==undefined){item['bank_name']='Not Found'}
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
