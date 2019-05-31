<template>
  <div id="pageDashboard">
    <v-container fluid>
      <v-layout row wrap>
          <v-card-title primary-title class="layout"><div class="headline">Contact</div></v-card-title>
          <v-card-text><v-divider class="mb-5"></v-divider>
          <a href="mailto:ceo-election-wb@nic.in">ceo-election-wb@nic.in</a>

          <v-flex xs12 class="my-5" v-if="this.getuser.level == 12 || this.getuser.level == 8 || this.getuser.level ==2">
            <v-tabs
      v-model="active"
      color="primary"
      dark
      slider-color="yellow"
      grow
    >
      <v-tab ripple>
        List of Contact Personnel(DEO)
      </v-tab>
      <v-tab ripple>
        List of Contact Personnel(ADMPP)
      </v-tab>
      <v-tab ripple>
        List of Contact Personnel(OC-PP)
      </v-tab>
      <v-tab-item>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of Contact Personnel(DEO)</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
                <v-text-field
                    v-model="search_deo"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>

            </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="personnels_deo"
            :search="search_deo"
            class="elevation-1"
            :loading="tableloading"
              >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.districts }}</td>
              <td >{{ props.item.name }} </td>
              <!-- <td >{{ props.item.user_id }} </td> -->
              <td >{{ props.item.email }}</td>
              <td >{{ props.item.mobile }}</td>

            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-tab-item>
      <v-tab-item>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of Contact Personnel(ADMPP)</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
                <v-text-field
                    v-model="search_admpp"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>

            </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="personnels_admpp"
            :search="search_admpp"
            class="elevation-1"
            :loading="tableloading"
              >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.districts }}</td>
              <td >{{ props.item.name }} </td>
              <!-- <td >{{ props.item.user_id }} </td> -->
              <td >{{ props.item.email }}</td>
              <td >{{ props.item.mobile }}</td>

            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-tab-item>
      <v-tab-item>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of Contact Personnel(OC-PP)</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
                <v-text-field
                    v-model="search_ocpp"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>

            </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="personnels_ocpp"
            :search="search_ocpp"
            class="elevation-1"
            :loading="tableloading"
              >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.districts }}</td>
              <td >{{ props.item.name }} </td>
              <!-- <td >{{ props.item.user_id }} </td> -->
              <td >{{ props.item.email }}</td>
              <td >{{ props.item.mobile }}</td>

            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-tab-item>
    </v-tabs>
          </v-flex>
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
      search_deo: '',
      search_admpp: '',
      search_ocpp: '',
      tableloading:false,
      headers: [
        { text: 'District', value: 'districts',align: 'left',sortable: true, },
        { text: 'Name', align: 'left', sortable: true, value: 'name'},
        // { text: 'User ID', align: 'left', sortable: true, value: 'user_id'},
        { text: 'Email', value: 'email',align: 'left',sortable: true, },
        { text: 'Mobile', value: 'mobile',align: 'left', sortable: true,},

      ],
      personnels_deo:[],
      personnels_admpp:[],
      personnels_ocpp:[],

  }),
  computed: {
    getuser(){
          return this.$store.getters.getUser
       },
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
            response.data['DEO'].forEach(item => {
                this.personnels_deo.push(item)
              })
            response.data['ADM'].forEach(item => {
                this.personnels_admpp.push(item)
              })
            response.data['PPCELL'].forEach(item => {
                this.personnels_ocpp.push(item)
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
