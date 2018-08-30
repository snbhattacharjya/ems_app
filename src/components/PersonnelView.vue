<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
      <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>All Personnel</v-toolbar-title>
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
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td >{{ props.item.id }}</td>
        <td >{{ props.item.address }}</td>
        <td >{{ props.item.mobile }}</td>
        <td >{{ props.item.pin }}</td>
        <td class="justify-center layout px-0">
          <v-btn flat :to="'/personnel/'+props.item.id+ '/edit'"><v-icon small class="mr-2">edit</v-icon></v-btn>
          <v-btn flat :to="'/personnel/'+props.item.id+ '/delete'"><v-icon small> delete</v-icon></v-btn>
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
      headers: [
        {
          text: 'Personnel Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'Address', value: 'adress',align: 'left', },
        { text: 'Mobile', value: 'mobile',align: 'left', },
        { text: 'Pin', value: 'pin',align: 'left', },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      personnels: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: 0,
        address: 0,
        mobile: 0,
        pin: 0
      },
      defaultItem: {
        name: '',
        id: 0,
        address: 0,
        mobile: 0,
        pin: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

        axios.get('/personnel')
        .then((response, data) => {
        response.data.forEach(item => {
            this.personnels.push(item)
          });
        })
        .catch(error => {
          console.log(error)
        })
      },

      editItem (item) {
        this.editedIndex = this.personnels.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.personnels.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.personnels.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.personnels[this.editedIndex], this.editedItem)
        } else {
          this.personnels.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
