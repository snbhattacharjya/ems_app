<template>
  <div id="pageDashboard">
    <v-container fluid>
      <v-layout row wrap>
          <v-card-title primary-title class="layout"><div class="headline">Contact</div></v-card-title>
          <v-card-text><v-divider class="mb-5"></v-divider>
          <a href="mailto:ceo-election-wb@nic.in">ceo-election-wb@nic.in</a>
          <v-toolbar flat color="white">
      <v-toolbar-title>List of Contact Personnel</v-toolbar-title>
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
            :items="personnels"
            :search="search"
            class="elevation-1"
            :loading="tableloading"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.districts }}</td>
              <td >{{ props.item.name }} </td>
              <td >{{ props.item.user_id }} </td>
              <td >{{ props.item.email }}</td>
              <td >{{ props.item.mobile }}</td>

            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>

          </v-card-text>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  components: {

  },
  data: () => ({
    search: '',
      tableloading:false,
      headers: [
        { text: 'District', value: 'districts',align: 'left',sortable: true, },
        { text: 'Name', align: 'left', sortable: true, value: 'name'},
        { text: 'User ID', align: 'left', sortable: true, value: 'user_id'},
        { text: 'Email', value: 'email',align: 'left',sortable: true, },
        { text: 'Mobile', value: 'mobile',align: 'left', sortable: true,},

      ],
      personnels:[],

  }),
  computed: {

  },
  created () {
      this.initialize()
  },
  methods: {
      initialize () {
        this.tableloading=true
        axios.get('/getcontact')
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
          }
         else{
            response.data.forEach(item => {
                this.personnels.push(item)
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


};
</script>
