<template>
<v-container fluid>
    <v-layout align-center justify-center>


      <v-flex xs12>
        <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Sharing of Polling Personnel Data</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
          <v-form>
          <v-layout row wrap  >
            <v-flex xs6>
              <v-select
                :items="districts"
                v-model="district_from"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select District(From which data will be shared)"
                v-validate="'required'"
                data-vv-name="district_from"
                :error-messages="errors.collect('district_from')"
                >
              </v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                :items="districts"
                v-model="district_to"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select District(To which data will be shared)"
                v-validate="'required'"
                data-vv-name="district_to"
                :error-messages="errors.collect('district_to')"
                >
              </v-select>
            </v-flex>
            <v-flex xs3>
              <v-select
                :items="polling_posts"
                v-model="post"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select Polling Post"
                v-validate="'required'"
                data-vv-name="post"
                :error-messages="errors.collect('post')"
                @change="getdata"
                >
              </v-select>
            </v-flex>
            <v-flex xs3 class="ml-3">
              <table class="v-datatable v-table dark" border=1>
                <thead>
                  <tr>
                  <td class="nopad">Available</td>
                  <td class="nopad">Required</td>
                  </tr>
                </thead>
                <tr>
                  <td class="nopad">1524</td>
                  <td class="nopad">456</td>
                </tr>
              </table>
            </v-flex>
            <v-flex xs3 class="ml-3">
              <v-text-field
                  prepend-icon="input"
                  name="share_pp"
                  label="Input Number of PP to share"
                  type="text"
                  v-model="share_pp"
                  v-validate="'required'"
                  data-vv-name="share_pp"
                  :error-messages="errors.collect('share_pp')"

                ></v-text-field>
            </v-flex>
          </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="primary">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>


  export default{
    name: 'DataSharing',
    data (){
      return {
        valid: true,
        districts:[],
        district:'',
        district_from:'',
        district_to:'',
        polling_posts:[],
        post:'',
        pp_share:'',
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",

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
      this.alldistrict()
      this.allposts()
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)

    },
    watch:{
      district_to:function(val){
        if(this.district_from == val){
          this.district_to=''
          //alert('Both District can not be same')
          this.errors.add(
                  {
                    field: 'district_to',
                    msg: 'Both District can not be same'
                  }
                )
        }
      }
    },
    methods:{
      alldistrict:function(){
        axios.get('/getdistrict')
      .then((response, data) => {
       response.data.forEach(item => {
          this.districts.push(item)
        })
      })
      .catch(error => {
        console.log(error)
      })
      },
      allposts:function(){
      axios.get('/pollingPost')
      .then((response, data) => {
       response.data.forEach(item => {
          this.polling_posts.push(item)
        })
      })
      .catch(error => {
        console.log(error)
      })
      },
      getdata:function(){
        if(this.district_from!='' && this.district_to!='' && this.district_from!=this.district_to){
          axios.get('/districRequirement')
          .then((response, data) => {
          response.data.forEach(item => {

            })
          })
          .catch(error => {
            console.log(error)
          })
        }else{
          this.post=null
          this.$validator.reset()
          alert('Please select both distric first and then post status')

        }

      },
      showError:function(error){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = error
        this.snackbar =true
      },
      showMessage:function(msg){
        this.show_message = true
        this.message_type = 'success'
        this.message_icon = 'success'
        this.message_text = msg
        this.snackbar =true
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
