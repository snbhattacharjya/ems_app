<template>
<v-container fluid>

    <v-layout row wrap  class="my-5">
      <v-flex xs12>
        <v-toolbar flat color="white">
      <v-toolbar-title>Share List</v-toolbar-title>
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
      :items="share_data"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td >{{ props.item.from_district }}</td>
        <td >{{ props.item.to_district }}</td>
        <td >{{ props.item.category }}</td>
        <td >{{ props.item.no_of_personnel }}</td>
        <td >{{props.item.no_of_personnel_shared==null ? 0 : props.item.no_of_personnel_shared}}</td>

        <td>
          <v-btn v-if="props.item.no_of_personnel<=props.item.no_of_personnel_shared" color="success" flat><v-icon small class="mr-2">check</v-icon>Done</v-btn>
          <v-text-field v-else

                  name="pptoshare"
                  label="Input Number of PP you want to share"
                  type="text"
                  maxlength="5"
                  v-model="props.item.pptoshare"
                  autocomplete="off"
                  >
                  </v-text-field>
        </td>
        <td>
          <v-btn v-if="props.item.no_of_personnel!=props.item.no_of_personnel_shared" :loading="is_query" color="info" @click="get_status(props.item.category)"><v-icon small class="mr-2">query_builder</v-icon> Query</v-btn>
          <v-btn v-if="props.item.no_of_personnel!=props.item.no_of_personnel_shared" :loading="is_share" color="green" @click="update_share(props.item.id,props.item.category,props.item.pptoshare)"><v-icon small class="mr-2">share</v-icon>Share</v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
      </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  export default{
    name: 'DataSharingceo',
    data (){
      return {
        is_query:false,
        is_share:false,
        tableloading:false,
        loading:false,
        disable_save:false,
        valid: true,
        share_data:[],
        pptoshare:'',
        post:'',
        search:'',
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        headers: [
        { text: 'ID', value: 'id',align: 'left', },
        { text: 'District(From)', align: 'left',  value: 'from_district'},
        { text: 'District(To)', value: 'to_district',align: 'left', },
        { text: 'Post Status', value: 'category',align: 'left', },
        { text: 'Personnel \n assigned', value: 'no_of_personnel',align: 'left', },
        { text: 'Personnel shared', value: 'no_of_personnel_shared',align: 'left', },
        { text: 'Number of PP to share', value: '',align: 'left',sortable: false  },
        { text: 'Action', value: '',align: 'left',sortable: false  },
      ],
        dictionary: {

          custom: {
             district_from: {
              required: 'District is required'
            },
            district_to: {
              required: 'District is required'
            },
          }
        }
      }
    },
    $_veeValidate: {
      validator: 'new'
    },
    beforeUpdate() {


    },
    created(){
      this.get_sharing()
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)

    },

    methods:{
      get_sharing:function(){
        this.share_data=[]
        this.tableloading=true
        axios.get('/getdeoshareinstruction')
        .then((response, data) => {
        response.data.forEach(item => {
            item['pptoshare']=''
            this.share_data.push(item)
          })
        })
        .catch(error => {
          console.log(error)
        })
        this.tableloading=false
      },
      get_status:function(cat){
        this.is_query=true
        this.posts_available=0
        this.posts_required=0
        axios.get('/getcategorywisedistrictrequirement/'+cat)
        .then((response, data) => {
            var req=0
            let avl=response.data['available'][0]['available']==null ? 0 : parseInt(response.data['available'][0]['available'])
            if(cat=='MO'){
            var req=parseInt(response.data['requirement'][0]['MaleMoRequirement'])+parseInt(response.data['requirement'][0]['FemaleMoRequirement'])
            }
            else if(cat=='AEO'){
            var req=parseInt(response.data['requirement'][0]['MaleAeoRequirement'])+parseInt(response.data['requirement'][0]['FemaleAeoRequirement'])
            }
            else{
            var req=parseInt(response.data['requirement'][0]['MalePartyRequirement'])+parseInt(response.data['requirement'][0]['FemalePartyRequirement'])
            }
            req=Math.round(req*1.2,0)
            alert('Available PP('+cat+') - '+avl+'\nRequired PP('+cat+') - '+req+' (with 20%)\nAvailable for share('+cat+') -'+(avl-req))
        })
        .catch(error => {
          console.log(error)
        })
        this.is_query=false

      },
      update_share:function(id,cat,val){
        if(val!=''){
          this.is_share=true

            //do share
            axios.post('/processtosharedata',{
              id:id,
              no_of_personnel:val
            })
            .then((response, data) => {
            alert(response.data)
            this.get_sharing()
            })
            .catch(error => {
              alert(error.response.data)
              console.log(error)
            })
            this.is_share=false

        }else{
          alert('Please input number for share PP !')
          this.is_share=false
        }
      },


    },
    computed:{
       getuser:function(){
          return this.$store.getters.getUser
       },
    },



  }
</script>
<style scoped>
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>
