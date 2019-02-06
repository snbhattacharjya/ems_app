<template>
  <div id="pageDashboard">
      <section>
        <v-container grid-list-md align-center>
          <v-layout row wrap fill-height>
            <v-flex xs12><h1 class="headline mb-2" >Exemption</h1></v-flex>
            <v-flex xs12>
            <v-tabs grow v-model="active" color="primary" dark slider-color="yellow" max="100%" class="mb-5" >
              <v-tab  ripple >
               Remark Wise
              </v-tab>
              <v-tab  ripple>
               Office Wise
              </v-tab>
              <v-tab  ripple>
               Personnel Wise
              </v-tab>
              <v-tab  ripple>
               Designation Wise
              </v-tab>
              <v-tab  ripple>
               Age Wise(>59)
              </v-tab>
              <v-tab ripple>
                List Of Exempted Personnel(s)
              </v-tab>
              <v-tab-item >
                <v-card flat>

                  <v-card-text>

                    <v-select
                    :items="subdivisions"
                    v-model="subdivision_id"
                    item-text= "name"
                    item-value= "id"
                    prepend-icon="list"
                    label="Select Subdivision"
                    v-validate="'required'"
                    :error-messages="errors.collect('subdivision_id')"
                    data-vv-name="subdivision_id"
                    :disabled="disble_subdiv"
                    >
                    </v-select>
                    <!-- <v-select
                      :items="block_munis"
                      v-model="block_muni_id"
                      item-text= "name"
                      item-value= "id"
                      prepend-icon="list"
                      label="Block or Municipality(*)"
                      autocomplete
                      :search-input.sync="searchInput"
                      @input="$emit('input',$event)"
                      :disabled="disble_block_muni"
                    >
                    </v-select>-->
                    <v-select
                    :items="remarks"
                    v-model="remark_id"
                    item-text= "name"
                    item-value= "id"
                    prepend-icon="list"
                    label="Select Remarks for Exemption(*)"
                    @input="$emit('input',$event)"
                    :hint="remarks_hint"
                    persistent-hint
                     :disabled="disble_remark"
                     clearable

                  >
                  </v-select>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-data-table  v-model="selected_remarks" :search="search" select-all :headers="headers" hide-actions :items="remark_personnels" class="elevation-1 my-5" :loading="tableloading_remark" :disabled="disble_remark">
                    <template slot="items" slot-scope="props">
                      <tr v-if="props.item.exempted == 'Yes'" class="red--text">
                        <td></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                      <tr v-else>
                      <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td v-if="props.item.exemp_date!=null" >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td></td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                    </template>

                     </v-data-table>
                  <v-textarea
                    prepend-icon="announcement"
                    name="exemption_reason_remark"
                    label="Provide Reason for Exemption(*)"
                    type="text"
                    v-model="exemption_reason_remark"
                    counter
                    maxlength="100"
                    :disabled="disble_remark_reason"
                    v-validate="'required|alpha_spaces'"
                    :error-messages="errors.collect('exemption_reason_remark')"
                    data-vv-name="exemption_reason_remark"
                  ></v-textarea>
                  <v-btn color="primary" @click="do_remark_exemption" :disabled="disble_remark_reason" :loading="doing_remark_exemption" >Submit for Exemption</v-btn>
                  </v-card-text>

                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card flat>
                  <v-card-text>
                      <v-text-field
                      autocomplete="off"
                      prepend-icon="search"
                      name="office_id"
                      label="Search Office by ID(*)"
                      type="text"
                      v-model="office_id"
                      persistent-hint
                      :hint="office_hint"
                      counter
                      maxlength="10"
                    >
                    </v-text-field>
                    <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                    <v-data-table v-model="selected" select-all :search="search" hide-actions :headers="headers" :items="office_personnels" class="elevation-1 my-5" :loading="tableloading_office" :disabled="disble_office">
                    <template slot="items" slot-scope="props">

                      <tr v-if="props.item.exempted == 'Yes'" class="red--text">
                      <td></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                      <tr v-else>
                      <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td v-if="props.item.exemp_date!=null" >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td></td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>

                    </template>

                     </v-data-table>
                    <v-textarea
                    prepend-icon="announcement"
                    name="exemption_reason_office"
                    label="Provide Reason for Exemption(*)"
                    type="text"
                    v-model="exemption_reason_office"
                    counter
                    maxlength="100"
                    :disabled="disble_office"
                     v-validate="'required|alpha_spaces'"
                    :error-messages="errors.collect('exemption_reason_office')"
                    data-vv-name="exemption_reason_office"
                  ></v-textarea>
                  <v-btn color="primary" @click="do_office_exemption" :disabled="disble_office" :loading="doing_office_exemption" >Submit for Exemption</v-btn>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card flat>
                  <v-card-text>
                      <v-text-field
                      autocomplete="off"
                      prepend-icon="search"
                      name="personnel_id"
                      label="Search Personnel by ID(*)"
                      type="text"
                      v-model="personnel_id"
                      persistent-hint
                      :hint="personnel_hint"
                      counter
                      maxlength="11"
                    >
                    </v-text-field>

                    <v-data-table  :headers="headers" hide-actions :items="personnels" class="elevation-1 my-5" :loading="tableloading_personnel" :disabled="disble_personnel">
                    <template slot="items" slot-scope="props">
                      <tr v-if="props.item.exempted == 'Yes'" class="red--text">
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                      <tr v-else>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td v-if="props.item.exemp_date!=null" >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td></td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                    </template>

                     </v-data-table>
                    <v-textarea
                    prepend-icon="announcement"
                    name="exemption_reason_personnel"
                    label="Provide Reason for Exemption(*)"
                    type="text"
                    v-model="exemption_reason_personnel"
                    counter
                    maxlength="100"
                    :disabled="disble_personnel"
                    v-validate="'required|alpha_spaces'"
                    :error-messages="errors.collect('exemption_reason_personnel')"
                    data-vv-name="exemption_reason_personnel"
                  ></v-textarea>
                  <v-btn color="primary" @click="do_personnel_exemption" :disabled="disble_personnel" :loading="doing_personnel_exemption" >Submit for Exemption</v-btn>
                  </v-card-text>
                </v-card>
              </v-tab-item>
               <v-tab-item >
                <v-card flat>
                  <v-card-text>
                      <v-text-field
                      autocomplete="off"
                      prepend-icon="search"
                      name="personnel_desig"
                      label="Search Personnel by Designation(*)"
                      type="text"
                      v-model="personnel_desig"
                      persistent-hint
                      :hint="personnel_desig_hint"
                      counter
                      maxlength="50"
                    >
                    <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary"  @click="personnel_desig_serarch" >Load Personnel</v-btn></v-slide-x-reverse-transition>
                    </v-text-field>

                    <v-data-table v-model="selected_desig"  :headers="headers" select-all hide-actions :items="personnels_desig" class="elevation-1 my-5" :loading="tableloading_personnel_desig" :disabled="disble_personnel_desig">
                    <template slot="items" slot-scope="props">
                      <tr v-if="props.item.exempted == 'Yes'" class="red--text">
                      <td></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                      <tr v-else>
                        <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td v-if="props.item.exemp_date!=null" >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td></td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                    </template>

                     </v-data-table>
                    <v-textarea
                    prepend-icon="announcement"
                    name="exemption_reason_personnel_desig"
                    label="Provide Reason for Exemption(*)"
                    type="text"
                    v-model="exemption_reason_personnel_desig"
                    counter
                    maxlength="100"
                    :disabled="disble_personnel_desig"
                    v-validate="'required|alpha_spaces'"
                    :error-messages="errors.collect('exemption_reason_personnel_desig')"
                    data-vv-name="exemption_reason_personnel_desig"
                  ></v-textarea>
                  <v-btn color="primary" @click="do_personnel_desig_exemption" :disabled="disble_personnel_desig" :loading="doing_personnel_desig_exemption" >Submit for Exemption</v-btn>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item >
                <v-card flat>
                  <v-card-text>
                    <v-data-table v-model="selected_age"  :headers="headers" select-all hide-actions :items="personnels_age" class="elevation-1 my-5" >
                    <template slot="items" slot-scope="props">
                      <tr v-if="props.item.exempted == 'Yes'" class="red--text">
                      <td></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                      <tr v-else>
                        <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >{{ props.item.exempted }}</td>
                      <td v-if="props.item.exemp_date!=null" >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td></td>
                      <td >{{ props.item.exemp_reason }}</td>
                      </tr>
                    </template>

                     </v-data-table>
                    <v-textarea
                    prepend-icon="announcement"
                    name="exemption_reason_personnel_age"
                    label="Provide Reason for Exemption(*)"
                    type="text"
                    v-model="exemption_reason_personnel_age"
                    counter
                    maxlength="100"
                    :disabled="disble_personnel_age"
                    v-validate="'required|alpha_spaces'"
                    :error-messages="errors.collect('exemption_reason_personnel_age')"
                    data-vv-name="exemption_reason_personnel_age"
                  ></v-textarea>
                  <v-btn color="primary" @click="do_personnel_age_exemption" :disabled="disble_personnel_age" :loading="doing_personnel_age_exemption" >Submit for Exemption</v-btn>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card-flat>
                  <v-card-text>
                    <v-flex xs12>
                      <h2>Bulk Revoke Of Exempted Personnel(s)</h2><br>
                      <v-select
                            v-model="type"
                            :items="types"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="call_received"
                            label="Exemption Type"
                            v-validate="'required'"
                            :error-messages="errors.collect('type')"
                            data-vv-name="type"
                          >
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary"  @click="revokeexcemption_bulk" :loading="loading_revokeexcemption_bulk">Submit</v-btn></v-slide-x-reverse-transition></v-select>
                    </v-flex>
                    <v-toolbar flat color="white">
                <v-toolbar-title>Personnel List</v-toolbar-title>
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
                    <v-data-table  :headers="headers" :search="search" :items="exempted_personnels" class="elevation-1 " :loading="tableloading_exempted_personnel">
                    <template slot="items" slot-scope="props">
                      <tr>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td>{{props.item.officename}}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>
                      <td >{{ props.item.remark }}</td>
                      <td >
                        By - {{props.item.exemp_type==1 ? 'Office' :''}}{{props.item.exemp_type==2 ? 'Personnel' :''}}{{props.item.exemp_type==3 ? 'Remark' :''}}
                      </td>
                      <td >{{  moment(props.item.exemp_date).format('DD/MM/YYYY h:mm a') }}</td>
                      <td >{{ props.item.exemp_reason }}</td>
                      <td><v-btn flat color="error" @click="revoke(props.item.id,props.item.office_id)"><v-icon small class="mr-2">undo</v-icon>Revoke</v-btn></td>
                      </tr>

                    </template>

                     </v-data-table>
                  </v-card-text>
                </v-card-flat>
              </v-tab-item>
            </v-tabs>
          </v-flex>
          </v-layout>
        </v-container>
      </section>
  </div>
</template>

<script>
export default {
  name: 'Exemption',

  data () {
    return {
      search: '',
      exempted_personnels:[],
      tableloading_exempted_personnel:false,
      exemption_reason_remark:'',
      doing_remark_exemption:false,
      disble_remark:true,
      disble_remark_reason:true,
      remark_id:'',
      remarks: [],
      type:'',
      types:[
        { name:'Office',id: '1'},
        { name:'Personnel',id: '2'},
        { name:'Remark',id: '3'},
        { name:'Designation',id: '5'},
        { name:'Age',id: '4'},
      ],
      block_muni_id:'',
      remarks_hint:'Select any Remark to search',
      exemption_reason_office:'',
      doing_office_exemption:false,
      disble_office:true,
      office_id:'',
      office_hint:'Input any Office ID to search',
      headers: [
        { text: 'ID', value: 'id',align: 'left',sortable: true },
        { text: 'Office ID', value: 'office_id',align: 'left',sortable: true },
        { text: 'Office Name', value: 'officename',sortable:true},
        { text: 'Personnel Name',align: 'left',value: 'name',sortable: true},
        { text: 'Designation', value: 'designation',align: 'left',sortable: true },
        { text: 'Mobile', value: 'mobile',align: 'left',sortable: true },
        { text: 'Remark', value: 'remark',align: 'left',sortable: true },
        { text: 'Exempted', value: 'exempted',align: 'left',sortable: false },
        { text: 'Exemption Date', value: 'exemp_date',align: 'left',sortable: false },
        { text: 'Exemption Reason', value: 'exemp_reason',align: 'left',sortable: false },
        { text: 'Action', value: '',align: 'left',sortable: false },
      ],
      remark_personnels: [],
      office_personnels: [],
      selected: [],
      selected_personnel:[],
      selected_remarks:[],
      selected_remark_personnel:[],
      tableloading_office:false,
      personnels: [],
      personnel_id:'',
      personnel_hint:'Input any Personnel ID to search',
      tableloading_personnel:false,
      tableloading_remark:false,
      exemption_reason_personnel:'',
      doing_personnel_exemption:false,
      disble_personnel:true,
      disble_block_muni:false,
      active: null,
      block_munis: [],
      searchInput: '',
      exempted_count:0,
      disble_subdiv:false,
      subdivision_id:'',
      subdivisions:[],
      active: null,
      loading_revokeexcemption_bulk:false,
      personnels_desig:[],
      personnel_desig:'',
      tableloading_personnel_desig:false,
      disble_personnel_desig:true,
      doing_personnel_desig_exemption:false,
      selected_desig:[],
      selected_personnel_desig:[],
      exemption_reason_personnel_desig:'',
      personnel_desig_hint:'',
      personnels_age:[],
      selected_personnel_age:[],
      personnel_desig_hint:'',
      doing_personnel_age_exemption:false,
      disble_personnel_age:false,
      exemption_reason_personnel_age:'',
      selected_age:[]
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
    this.loadpoststatus()
    this.getsubdivision()
    this.getremarkslist()
    this.getexemptedlist()
    this.getexemptedlistforage()
  },
  methods:{
    revokeexcemption_bulk:function(){
      if(confirm('Are you sure to revoke Exemption for - '+this.type+'?')){
      if(this.type!=''){
        this.loading_revokeexcemption_bulk=true
      axios.get('/revokeexcemptionbytype/'+this.type)
      .then((response, data) => {
        alert(response.data)
        this.getexemptedlist()
      })
      .catch(error => {
        console.log(error)
      })
      this.loading_revokeexcemption_bulk=false
      }else{
        alert('Please select Exemption type')
      }
      }
    },
    loadpoststatus:function(){
      axios.get('/pollingPost')
      .then((response, data) => {

       response.data.forEach(item => {

          this.poststats.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    revoke:function(id,office_id){
      if(confirm('Are you sure ?')){
      axios.post('/revokeexcemption',{
        personnel_id:id,
        office_id:office_id
      })
          .then((response, data) => {
            this.getexemptedlist()
            alert('Personnel Revoked successfully')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getremarkslist:function(){
      axios.get('/remarkforexcemption')
          .then((response, data) => {
          response.data.forEach(item => {
              this.remarks.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
    },
    getexemptedlist:function(){
      this.exempted_personnels=[]
      this.tableloading_exempted_personnel=true
      axios.get('/getexemptedlist')
          .then((response, data) => {
          response.data['excemptedList'].forEach(item => {
              this.exempted_personnels.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
          this.tableloading_exempted_personnel=false
    },
    getexemptedlistforage:function(){
      this.personnels_age=[]
      this.tableloading_age_exempted_personnel=true
      axios.get('/getexcemptionbyage')
          .then((response, data) => {
          response.data['excemptionList'].forEach(item => {
              this.personnels_age.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
          this.tableloading_exempted_personnel=false
    },
    getsubdivision(){
          axios.get('/subdivisions')
          .then((response, data) => {
          response.data.forEach(item => {
              this.subdivisions.push(item)
            });

          })
          .catch(error => {
            console.log(error)
          })
      },
    do_remark_exemption:function(){
      if(this.remark_id!='' && this.exemption_reason_remark!='' && this.selected_remarks.length!=''){
      if(confirm('Are you sure to do exemption based on above selection and criteria?')){
      this.doing_remark_exemption=true
      this.selected_remarks.forEach(item => {
        this.selected_remark_personnel.push(item.id)
      })
      axios.post('/doexception',{
          mode:'remarks',
          remark_id: this.remark_id,
          remark_personnl_selected:this.selected_remarks.length==this.remark_personnels.length ? 'ALL' : this.selected_remark_personnel,
          reason:this.exemption_reason_remark
          })
          .then((response, data) => {
             this.exemption_reason_remark=''
             this.doing_remark_exemption=false
             this.disble_remark=false
             this.disble_remark_reason=true
             this.remarks_hint=' Personnel Exempted by this remark'
             this.remark_personnels=[]
             this.selected_remark_personnel=[]
             this.selected_remarks=[]
             alert(this.remarks_hint)
            this.getexemptedlist()
          })
          .catch(error => {
            console.log(error)
            this.remarks_hint='Sorry !! seems there are some server problem'
            this.disble_remark=false
            alert(this.remarks_hint)
          })
      }
      }else{
        alert('Please select Remark and provide reason for reamrk')
      }
    },
    do_office_exemption:function(){
      if(this.office_id!='' && this.selected.length!=0 && this.exemption_reason_office!=''){
        if(confirm('Are you sure to do exemption based on above selection and criteria?')){
      this.doing_office_exemption=true

      this.selected.forEach(item => {
        this.selected_personnel.push(item.id)
      })
      axios.post('/doexception',{
          mode:'office',
          personnl_selected:this.selected.length==this.office_personnels.length ? 'ALL' : this.selected_personnel,
          office_id: this.office_id,
          reason:this.exemption_reason_office
          })
          .then((response, data) => {
            if(response.data.length<=0){
              this.office_hint='Sorry !!No Personnel Exempted by this remark'
              alert(this.office_hint)
              }
            else{
              this.office_personnels=[]
              this.office_hint=this.selected_personnel.length+' Personnel Exempted by this remark'
              this.exemption_reason_office=''
              this.doing_office_exemption=false
              this.tableloading_office=false
              this.disble_office=true
              this.selected_personnel=[]
              alert(this.office_hint)
              this.getexemptedlist()
            }
          })
          .catch(error => {
            console.log(error)
            this.office_hint='Sorry !! seems there are some server problem'
            this.disble_office=false
            alert(this.office_hint)
          })
        }
      }else{
        alert('Please select Personnel and provide reason for reamrk')
      }
    },

    do_personnel_exemption:function(){
      if(this.personnel_id!='' && this.exemption_reason_personnel!=''){
        if(confirm('Are you sure to do exemption based on above selection and criteria?')){
      this.doing_personnel_exemption=true
      axios.post('/doexception',{
          mode:'personnel',
          personnel_id: this.personnel_id,
          reason:this.exemption_reason_personnel
          })
          .then((response, data) => {
            if(response.data.length<=0){
              this.personnel_hint='Sorry !!No Personnel Exempted by this ID'
              alert(this.personnel_hint)
              }
            else{
              this.personnels=[]
              this.exemption_reason_personnel=''
              this.personnel_hint='Personnel Exempted by this ID'
              this.doing_personnel_exemption=false
              this.tableloading_personnel=false
              this.disble_personnel=true
              alert(this.personnel_hint)
              this.getexemptedlist()

            }
          })
          .catch(error => {
            console.log(error)
            this.personnel_hint='Sorry !! seems there are some server problem'
            this.disble_personnel=false
            alert(this.personnel_hint)
          })
        }
      }else{
        alert('Please Input Personnel and provide reason for reamrk')
      }
    },
    personnel_desig_serarch:function(){
      var val =this.personnel_desig

      this.personnel_desig_hint=''
      if(val==''){
        this.disble_personnel_desig=true
        this.personnels_desig=[]
        this.personnel_desig_hint="Input any Designation to search"
        this.doing_personnel_desig_exemption=false
        this.exemption_reason_personnel_desig=''
      }
      else if(val!=''){
        this.personnel_desig_hint='Searching for Personnel'
        axios.post('/getexcemptionbydesignation',{
          designation: this.personnel_desig
          })
          .then((response, data) => {
            if(response.data['excemptionList'].length<=0){
              this.personnel_desig_hint='Sorry !!No Personnel found by this Designation'
              }
            else{
              if(response.data['excemptionList'][0].exempted=='Yes'){
              this.personnel_desig_hint='Personnel already exempted by this Designation'
              this.disble_personnel_desig=true
              this.personnels_desig=response.data['excemptionList']
              }else{
              this.personnel_desig_hint=response.data['excemptionList'].length+' Personnel found by this Designation'
              this.disble_personnel_desig=false
              this.personnels_desig=response.data['excemptionList']
              }
              alert(this.personnel_desig_hint)
            }
          })
          .catch(error => {
            console.log(error)
            this.personnel_desig_hint='Sorry !! seems there are some server problem'
          })
      }

    },
    do_personnel_desig_exemption:function(){
      if(this.personnel_desig!='' && this.selected_desig.length!=0 && this.exemption_reason_personnel_desig!=''){
        if(confirm('Are you sure to do exemption based on above selection and criteria?')){
          this.doing_personnel_desig_exemption=true

          this.selected_desig.forEach(item => {
            this.selected_personnel_desig.push(item.id)
          })
         axios.post('/doexception',{
          mode:'designation',
          personnl_selected:this.selected_desig.length==this.personnels_desig.length ? 'ALL' : this.selected_personnel_desig,
          designation: this.personnel_desig,
          reason:this.exemption_reason_personnel_desig
          })
          .then((response, data) => {

              this.personnels_desig=[]
              this.personnel_desig_hint=this.selected_desig.length+' Personnel Exempted by this Designation'
              this.exemption_reason_personnel_desig=''
              this.doing_personnel_desig_exemption=false
              this.tableloading_personnel_desig=false
              this.disble_personnel_desig=true
              this.selected_personnel_desig=[]
              alert(this.personnel_desig_hint)
              this.getexemptedlist()

          })
          .catch(error => {
            console.log(error)
            this.personnel_desig_hint='Sorry !! seems there are some server problem'
            this.disble_personnel_desig=false
            alert(this.personnel_desig_hint)
          })
        }

      }

    },
    do_personnel_age_exemption:function(){
      if(this.selected_age.length!=0 && this.exemption_reason_personnel_age!=''){
        if(confirm('Are you sure to do exemption based on above selection and criteria?')){
          this.doing_personnel_age_exemption=true
          this.selected_age.forEach(item => {
            this.selected_personnel_age.push(item.id)
          })
         axios.post('/doexception',{
          mode:'age',
          personnl_selected:this.selected_age.length==this.personnels_age.length ? 'ALL' : this.selected_personnel_age,
          reason:this.exemption_reason_personnel_age
          })
          .then((response, data) => {

              this.personnels_age=[]
              this.personnel_desig_hint=this.selected_personnel_age.length+' Personnel Exempted by this Age'
              this.exemption_reason_personnel_age=''
              this.doing_personnel_age_exemption=false
              this.tableloading_personnel_age=false
              this.disble_personnel_age=false
              this.selected_personnel_age=[]
              alert(response.data)
              this.getexemptedlistforage()

          })
          .catch(error => {
            console.log(error)
            this.personnel_age_hint='Sorry !! seems there are some server problem'
            this.disble_personnel_age=false
            alert(this.personnel_age_hint)
          })
        }

      }

    },

  },
  watch:{
    subdivision_id:function(val){
      if(val==''){
        this.disble_remark=true
      }else{
        this.disble_remark=false
      }
    },
    remark_id:function(val){
      this.remarks_hint=''
      if(val==undefined && this.subdivision_id!=''){
        this.disble_block_muni=false
      }
      else if(val!='' && this.subdivision_id!=''){
        this.exempted_count=0
        this.disble_subdiv=true
        this.tableloading_remark=true
        axios.post('/getpersonnnelforexcemption',{
          mode:'remarks',
          subdivision_id:this.subdivision_id,
          remark_id: this.remark_id
          })
          .then((response, data) => {
            if(response.data.excemptionList.length<=0){
              this.remark_personnels=[]
              this.remarks_hint='Sorry !!No Personnel found by this Remark'
              this.disble_remark=false
              this.disble_remark_reason=true
              this.tableloading_remark=false
              alert(this.remarks_hint)
              }
            else{
              this.remark_personnels=[]
              this.remark_personnels=response.data.excemptionList
              this.remarks_hint=response.data.excemptionList.length+' Personnel found by this Remark'
              this.disble_remark=true

               response.data.excemptionList.forEach(item => {
                if(item['exempted']=='Yes'){
                  this.exempted_count++
                }
              })

              alert(this.remarks_hint)
              this.tableloading_remark=false
              this.disble_remark_reason=false
              if(response.data.excemptionList.length==this.exempted_count){
                this.disble_remark=false
                this.disble_remark_reason=true
              }
            }
          })
          .catch(error => {
            console.log(error)
            this.remarks_hint='Sorry !! seems there are some server problem'
          })
      }
      else{

        alert('Please select Block/Municipality first and then remark.')
      }
    },
    office_id:function(val){
      this.office_hint=''
      if(val==''){
        this.disble_office=true
        this.office_personnels=[]
        this.office_hint="Input any Office ID to search"
        this.doing_office_exemption=false
        this.exemption_reason_office=''
      }
      else if(val.length==10 && val!=''){
        this.exempted_count=0
        this.office_hint='Searching for Office'
        axios.post('/getpersonnnelforexcemption',{
          mode:'office',
          office_id: this.office_id
          })
          .then((response, data) => {
            if(response.data.count<=0){
              this.office_hint='Sorry !!No Personnel found for this Office'
              this.disble_office=true
              this.office_personnels=[]
              }
            else{
              this.office_hint=response.data.count+' Personnel found for this Office'
              this.disble_office=false
              this.tableloading_office=true
              this.office_personnels=response.data.excemptionList
              this.tableloading_office=false
              response.data.excemptionList.forEach(item => {
                if(item['exempted']=='Yes'){
                  this.exempted_count++
                }
              })
              if(response.data.excemptionList.length==this.exempted_count){
                this.disble_office=true
              }
            }
          })
          .catch(error => {
            console.log(error)
            this.office_hint='Sorry !! seems there are some server problem'
          })
      }
      else{
        this.disble_office=true
        this.office_personnels=[]
      }
    },
    personnel_id:function(val){
      this.personnel_hint=''
      if(val==''){
        this.disble_personnel=true
        this.personnels=[]
        this.personnel_hint="Input any Personnel ID to search"
        this.doing_personnel_exemption=false
        this.exemption_reason_personnel=''
      }
      else if(val.length==11 && val!=''){
        this.personnel_hint='Searching for Personnel'
        axios.post('/getpersonnnelforexcemption',{
          mode:'personnel',
          personnel_id: this.personnel_id
          })
          .then((response, data) => {
            if(response.data.length<=0){
              this.personnel_hint='Sorry !!No Personnel found by this ID'
              }
            else{
              if(response.data['excemptionList'][0].exempted=='Yes'){
              this.personnel_hint='Personnel already exempted by this ID'
              this.disble_personnel=true
              this.personnels=response.data['excemptionList']
              }else{
              this.personnel_hint='Personnel found by this ID'
              this.disble_personnel=false
              this.personnels=response.data['excemptionList']
              }
              alert(this.personnel_hint)
            }
          })
          .catch(error => {
            console.log(error)
            this.personnel_hint='Sorry !! seems there are some server problem'
          })
      }
    },

  }

}

</script>

