<template>
  <div id="pageDashboard">
      <section>
        <v-container grid-list-md align-center>
          <v-layout row wrap fill-height>
            <v-flex xs12><h1 class="headline mb-2">Settings</h1></v-flex>
            <v-flex xs12>
            <v-tabs grow v-model="active" color="primary" dark slider-color="yellow" max="100%" class="mb-5" >
              <v-tab  ripple >
               Subdivisions
              </v-tab>
              <v-tab  ripple>
               Assembly Constituencies
              </v-tab>
              <v-tab  ripple>
               Block/ Municipality(s)
              </v-tab>

              <v-tab-item >
                <v-card flat>

                  <v-card-text>
                    <v-layout row wrap fill-height>
                    <v-flex xs2>
                    <v-text-field
                        slot="input"
                        v-model="subdiv_id"
                        label="Subdivision ID"
                        v-validate="'required'"
                        data-vv-name="subdiv_id"
                        :error-messages="errors.collect('subdiv_id')"
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                      <v-text-field
                        slot="input"
                        v-model="subdiv_name"
                        label="Subdivision Name"
                        counter
                        maxlength="50"
                        v-validate="'required'"
                        data-vv-name="subdiv_name"
                        :error-messages="errors.collect('subdiv_name')"
                      ></v-text-field>
                      </v-flex>
                        <v-flex xs3>
                      <v-btn color="primary" @click="add_subdiv" :loading="adding_sub">Add</v-btn>
                      </v-flex>
                    </v-layout>
                  <v-data-table  :headers="headers_subdiv"  :items="subdivisions" class="elevation-1 my-5">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.id }}</td>
                      <td >
                        <v-edit-dialog
                      :return-value.sync="props.item.name"
                      lazy
                      @save="update_subdiv(props.item.id,props.item.name)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ props.item.name }}
                      <v-text-field
                        slot="input"
                        v-model="props.item.name"
                        label="Edit"
                        single-line
                        counter
                        maxlength="50"
                      ></v-text-field>
                    </v-edit-dialog>
                        </td>

                    </template>

                     </v-data-table>

                  </v-card-text>

                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card flat>

                  <v-card-text>
                    <v-layout row wrap fill-height>
                    <v-flex xs1>
                    <v-text-field
                        slot="input"
                        v-model="ac_id"
                        label="AC ID"
                        v-validate="'required'"
                        data-vv-name="ac_id"
                        :error-messages="errors.collect('ac_id')"
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                      <v-text-field
                        slot="input"
                        v-model="ac_name"
                        label="AC Name"
                        counter
                        maxlength="50"
                        v-validate="'required'"
                        data-vv-name="ac_name"
                        :error-messages="errors.collect('ac_name')"
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                      <subdivision-list
                        v-model="subdivision_id"
                        v-validate="'required'"
                        data-vv-name="subdivision_id"
                        :error="errors.collect('subdivision_id')"
                      ></subdivision-list>
                      </v-flex>
                      <v-flex xs3>
                        <pc-list
                          v-model="pc_id"
                          v-validate="'required'"
                          data-vv-name="pc_id"
                          :error="errors.collect('pc_id')"
                        ></pc-list>
                      </v-flex>
                        <v-flex xs2>
                      <v-btn color="primary" @click="add_ac" :loading="adding_ac">Add</v-btn>
                      </v-flex>
                    </v-layout>
                  <v-data-table  :headers="headers_ac"  :items="acs" class="elevation-1 my-5">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.id }}</td>
                      <td >
                        <v-edit-dialog
                      :return-value.sync="props.item.name"
                      lazy
                      @save="update_ac(props.item.id,props.item.name)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ props.item.name }}
                      <v-text-field
                        slot="input"
                        v-model="props.item.name"
                        label="Edit"
                        single-line
                        counter
                        maxlength="50"
                      ></v-text-field>
                    </v-edit-dialog>
                        </td>

                    </template>

                     </v-data-table>

                  </v-card-text>

                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card flat>

                  <v-card-text>
                    <v-layout row wrap fill-height>
                    <v-flex xs2>
                    <v-text-field
                        slot="input"
                        v-model="block_id"
                        label="Block/Municipality ID"
                        v-validate="'required'"
                        data-vv-name="block_id"
                        :error-messages="errors.collect('block_id')"
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                      <v-text-field
                        slot="input"
                        v-model="block_name"
                        label="Block/Municipality Name"
                        counter
                        maxlength="50"
                        v-validate="'required'"
                        data-vv-name="block_name"
                        :error-messages="errors.collect('block_name')"
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                      <subdivision-list
                        v-model="block_subdivision_id"
                        v-validate="'required'"
                        data-vv-name="block_subdivision_id"
                        :error="errors.collect('block_subdivision_id')"
                      ></subdivision-list>
                      </v-flex>
                        <v-flex xs3>
                      <v-btn color="primary" @click="add_block" :loading="adding_block">Add</v-btn>
                      </v-flex>
                    </v-layout>
                  <v-data-table  :headers="headers_blockmuni"  :items="blocks" class="elevation-1 my-5">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.id }}</td>
                      <td >
                        <v-edit-dialog
                      :return-value.sync="props.item.name"
                      lazy
                      @save="update_block(props.item.id,props.item.name)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    > {{ props.item.name }}
                      <v-text-field
                        slot="input"
                        v-model="props.item.name"
                        label="Edit"
                        single-line
                        counter
                        maxlength="50"
                      ></v-text-field>
                    </v-edit-dialog>
                        </td>

                    </template>

                     </v-data-table>

                  </v-card-text>

                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
          </v-layout>
        </v-container>
      </section>
  </div>
</template>

<script>
import SubdivisionList from '@/components/SubdivisionList'
import AcList from '@/components/AssemblyList'
import PcList from '@/components/PcList'
export default {
  name: 'Settings',
  components: {
          'subdivision-list': SubdivisionList,
          'ac-list': AcList,
          'pc-list': PcList
  },
  data () {
    return {
      alert:true,
      headers_ac: [
        { text: 'ID', value: 'id',align: 'left',sortable: true },
        { text: 'Name', value: '',sortable:true},

      ],
      headers_subdiv: [
        { text: 'ID', value: 'id',align: 'left',sortable: true },
        { text: 'Name', value: '',sortable:true},
      ],
      headers_blockmuni: [
        { text: 'ID', value: 'id',align: 'left',sortable: true },
        { text: 'Name', value: '',sortable:true},
      ],
      subdivisions:[],
      subdiv_id:'',
      subdiv_name:'',
      adding_sub:false,
      acs:[],
      ac_id:'',
      ac_name:'',
      subdivision_id:'',
      pc_id:'',
      adding_ac:false,
      blocks:[],
      block_id:'',
      block_name:'',
      block_subdivision_id:'',
      addding_block:false,

    }

  },
  $_veeValidate: {
      validator: 'new'
    },
  beforeUpdate() {


  },
  computed: {

  },
  created () {
    this.getsubdivision()
    this.getac()
    this.getblockmuni()
  },
  methods:{
     getsubdivision:function(){
          axios.get('/subdivisions')
          .then((response, data) => {
            this.subdivisions=[]
          response.data.forEach(item => {
              this.subdivisions.push(item)
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      add_subdiv:function(){
        if(this.subdiv_id!='' && this.subdiv_name!=''){
        this.adding_sub=true
          axios.post('/addsubdivision',{id:this.subdiv_id,name:this.subdiv_name})
          .then((response, data) => {
            this.$validator.reset()
            this.subdiv_id=''
            this.subdiv_name=''
            this.adding_sub=false
            this.getsubdivision()
            alert(response.data)


          })
          .catch(error => {
            if(error.response.data.message=='The given data was invalid.'){
              alert('The id has already been taken.')
            }
            this.adding_sub=false
            console.log(error)
          })
          this.adding_sub=false
        }else{
          this.errors.add(
                  {
                    field: 'subdiv_name',
                    msg: 'Name is required'
                  }
                )
          this.errors.add(
                 {
                    field: 'subdiv_id',
                    msg: 'ID is required'
                  }
          )
        }
      },
      update_subdiv:function(id,name){
        if(name!=''){

          axios.post('/editsubdivision',{id:id,name:name})
          .then((response, data) => {
            this.$validator.reset()
            this.subdiv_id=''
            this.subdiv_name=''
            this.getsubdivision()
            alert(response.data)


          })
          .catch(error => {
            if(error.response.data.message=='The given data was invalid.'){
              alert('The id has already been taken.')
            }
            console.log(error)
          })
        }else{
          this.getsubdivision()
          alert('Name is required')

        }
      },
      getac:function(){
          axios.get('/assemblies')
          .then((response, data) => {
            this.acs=[]
          response.data.forEach(item => {
              this.acs.push(item)
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      add_ac:function(){

        if(this.ac_id!='' && this.ac_name!='' && this.subdivision_id!='' && this.pc_id!=''){
          this.$validator.reset()
        this.adding_ac=true
          axios.post('/addac',{id:this.ac_id,name:this.ac_name,subdivision_id:this.subdivision_id,pc_id:this.pc_id})
          .then((response, data) => {
            this.$validator.reset()
            this.ac_id=''
            this.ac_name=''
            this.adding_ac=false
            this.getac()
            alert(response.data)
          })
          .catch(error => {
            if(error.response.data.message=='The given data was invalid.'){
              alert('The id has already been taken.')
            }
            this.adding_ac=false
            console.log(error)
          })
          this.adding_ac=false
        }else{
          this.errors.add(
                  {
                    field: 'ac_name',
                    msg: 'Name is required'
                  }
                )
          this.errors.add(
                 {
                    field: 'ac_id',
                    msg: 'ID is required'
                  }
          )
          this.errors.add(
                 {
                    field: 'subdivision_id',
                    msg: 'Subdivision is required'
                  }
          )
          this.errors.add(
                 {
                    field: 'pc_id',
                    msg: 'PC is required'
                  }
          )
        }
      },
      update_ac:function(id,name){
        if(name!=''){

          axios.post('/updateac',{ac_id:id,ac:name})
          .then((response, data) => {
            this.$validator.reset()
            this.ac_id=''
            this.ac_name=''
            this.getsubdivision()
            alert(response.data)


          })
          .catch(error => {
            if(error.response.data.message=='The given data was invalid.'){
              alert('The id has already been taken.')
            }
            console.log(error)
          })
        }else{
          this.getac()
          alert('Name is required')

        }
      },
      getblockmuni:function(){
          axios.get('/blockmunis')
          .then((response, data) => {
            this.blocks=[]
          response.data.forEach(item => {
              this.blocks.push(item)
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      add_block:function(){
        if(this.block_id!='' && this.block_name!='' && this.block_subdivision_id!=''){
        this.adding_sub=true
          axios.post('/addblock',{id:this.block_id,name:this.block_name,subdivision_id:this.block_subdivision_id})
          .then((response, data) => {
            this.$validator.reset()
            this.block_id=''
            this.block_name=''
            this.adding_sub=false
            this.getblockmuni()
            alert(response.data)


          })
          .catch(error => {
            if(error.response.data.message=='The given data was invalid.'){
              alert('The id has already been taken.')
            }
            this.adding_sub=false
            console.log(error)
          })
          this.adding_sub=false
        }else{
          this.errors.add(
                  {
                    field: 'block_name',
                    msg: 'Name is required'
                  }
                )
          this.errors.add(
                 {
                    field: 'block_id',
                    msg: 'ID is required'
                  }
          )
          this.errors.add(
                 {
                    field: 'block_subdivision_id',
                    msg: 'Subdivision ID is required'
                  }
          )
        }
      },
      update_block:function(id,name){
        if(name!=''){
          axios.post('/updateblock',{id:id,name:name})
          .then((response, data) => {
            this.$validator.reset()
            this.block_id=''
            this.block_name=''
            this.getblockmuni()
            alert(response.data)
          })
          .catch(error => {
            if(error.response.data.message=='The given data was invalid.'){
              alert('The id has already been taken.')
            }
            console.log(error)
          })
        }else{
          this.getblockmuni()
          alert('Name is required')

        }
      },
  },
  watch:{


  }

}

</script>

