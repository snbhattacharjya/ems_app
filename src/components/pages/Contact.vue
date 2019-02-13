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


    </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="personnels"
            class="elevation-1"
            :loading="tableloading"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td >{{ props.item.name }}({{ props.item.identification_code }})</td>
              <td >{{ props.item.address }}</td>
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
        { text: 'District', value: '',align: 'left',sortable: false, },
        { text: 'DEO', align: 'left', sortable: false, value: ''},
        { text: 'ADMPP', value: '',align: 'left',sortable: false, },
        { text: 'OC-PP', value: '',align: 'left', sortable: false,},

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
        axios.get('/officeentrystatus')
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
