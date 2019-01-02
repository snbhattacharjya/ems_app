<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-btn color="info" :to="'/office/list'">Back</v-btn>

      <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>Macro Statistic</v-toolbar-title>
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
      :items="macros"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
    >
      <template slot="items" slot-scope="props">
        <!-- <td>{{ props.item.sl }}</td> -->
        <td >{{ props.item.post_stat }}</td>
        <td >{{ props.item.designation }}</td>
        <td >{{ props.item.qualification }}</td>
        <td >{{props.item.remarks}}</td>
        <td>{{ props.item.MinBasic }}-{{ props.item.MaxBasic }}</td>
        <td>{{ props.item.MinGrade }}-{{ props.item.MaxGrade }}</td>
        <td>{{ props.item.MinPayLevel }}-{{ props.item.MaxPayLevel }}</td>
        <td>{{ props.item.MinAge }}-{{ props.item.MaxAge }}</td>
        <td>{{ props.item.TotalAvialable }}</td>
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
    name:'MacrolevelPpstat',

    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        // { text: 'Sl', value: 'sl',align: 'left', sortable: false},
        { text: 'Post Status', align: 'left', sortable: false, value: 'post_stat'},
        { text: 'Designation', value: 'designation',align: 'left', sortable: false,},
        { text: 'Qualification', value: 'qualification',align: 'left',sortable: false, },
        { text: 'Remarks', value: 'remarks', sortable: false },
        { text: 'Basic Pay', value: 'MinBasic,MaxBasic',align: 'left',sortable: false, },
        { text: 'Garde Pay', value: 'MinGarde,MaxGarde',align: 'left',sortable: false, },
        { text: 'Pay Level', value: 'MinPayLevel,MaxPaylevel',align: 'left',sortable: false, },
        { text: 'Age', value: 'MinAge,MaxAge',align: 'left',sortable: false, },
        { text: 'Total(Available)', value: 'TotalAvialable',align: 'left',sortable: false, }
      ],
      macros: [],
      count:1,
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
        axios.get('/macrolevel_statistics')
        .then((response, data) => {
          if(response.data['available'].length === 0){
            this.tableloading=false
          }
         else{
            response.data['available'].forEach(item => {
                item['sl']=this.count
                if(item['post_stat']==''){item['post_stat']='NA'}
                this.macros.push(item)
                this.count++
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
