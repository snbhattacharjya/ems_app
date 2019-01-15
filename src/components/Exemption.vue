<template>
  <div id="pageDashboard">
      <section>
        <v-container grid-list-md align-center>
          <v-layout row wrap fill-height>
            <v-flex xs12><h1 class="headline mb-2" >Exemption</h1></v-flex>
            <v-flex xs12>
            <v-tabs v-model="active" color="primary" dark slider-color="yellow" max="100%" class="mb-5">
              <v-tab  ripple >
               Remark Wise
              </v-tab>
              <v-tab  ripple>
               Office Wise
              </v-tab>
              <v-tab  ripple>
               Personnel Wise
              </v-tab>
              <v-tab-item >
                <v-card flat>

                  <v-card-text>
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
                  >
                  </v-select>
                  <v-textarea
                    prepend-icon="announcement"
                    name="exemption_reason_remark"
                    label="Provide Reason for Exemption(*)"
                    type="text"
                    v-model="exemption_reason_remark"
                    counter
                    maxlength="100"
                    :disabled="disble_remark"
                  ></v-textarea>
                  <v-btn color="primary" @click="do_remark_exemption" :disabled="disble_remark" :loading="doing_remark_exemption" >Submit for Exemption</v-btn>
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
                    <v-data-table v-model="selected" select-all hide-actions :headers="headers" :items="office_personnels" class="elevation-1 my-5" :loading="tableloading_office" :disabled="disble_office">
                    <template slot="items" slot-scope="props">
                      <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>

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
                      <td>{{ props.item.id }}</td>
                      <td >{{ props.item.office_id }}</td>
                      <td >{{ props.item.name }}</td>
                      <td >{{ props.item.designation }}</td>
                      <td >{{ props.item.mobile }}</td>

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
                  ></v-textarea>
                  <v-btn color="primary" @click="do_personnel_exemption" :disabled="disble_personnel" :loading="doing_personnel_exemption" >Submit for Exemption</v-btn>
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
export default {
  name: 'Exemption',
  data () {
    return {
      exemption_reason_remark:'',
      doing_remark_exemption:false,
      disble_remark:true,
      remark_id:'',
      remarks: [],
      remarks_hint:'Select any Remark to search',
      exemption_reason_office:'',
      doing_office_exemption:false,
      disble_office:true,
      office_id:'',
      office_hint:'Input any Office ID to search',
      headers: [
        { text: 'ID', value: 'id',align: 'left',sortable: false },
        { text: 'Office ID', value: 'office_id',align: 'left',sortable: false },
        { text: 'Personnel Name',align: 'left',value: 'name',sortable: false},
        { text: 'Designation', value: 'designation',align: 'left',sortable: false },
        { text: 'Mobile', value: 'mobile',align: 'left',sortable: false },
      ],
      office_personnels: [],
      selected: [],
      selected_personnel:[],
      tableloading_office:false,
      personnels: [],
      personnel_id:'',
      personnel_hint:'Input any Personnel ID to search',
      tableloading_personnel:false,
      exemption_reason_personnel:'',
      doing_personnel_exemption:false,
      disble_personnel:true,
      active: null,
    }
  },
  beforeUpdate() {
    this.$store.dispatch('storeremark')
    this.remarks=this.getremark
  },
  computed: {
    getremark:function(){
     return this.$store.getters.getremark
   }
  },
  created () {

  },
  methods:{
    do_remark_exemption:function(){
      if(this.remark_id!='' && this.exemption_reason_remark!=''){
      this.doing_remark_exemption=true
      axios.post('/doexception',{
          mode:'remarks',
          remark_id: this.remark_id,
          reason:this.exemption_reason_remark
          })
          .then((response, data) => {
             this.exemption_reason_remark=''
             this.doing_remark_exemption=false
             this.disble_remark=true
             this.remarks_hint=' Personnel Exempted by this remark'

          })
          .catch(error => {
            console.log(error)
            this.remarks_hint='Sorry !! seems there are some server problem'
            this.disble_remark=false
          })
      }else{
        alert('Please select Remark and provide reason for reamrk')
      }
    },
    do_office_exemption:function(){
      if(this.office_id!='' && this.selected.length!=0 && this.exemption_reason_office!=''){
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
              }
            else{
              this.office_personnels=[]
              this.office_hint=this.selected_personnel.length+' Personnel Exempted by this remark'
              this.exemption_reason_office=''
              this.doing_office_exemption=false
              this.tableloading_office=false
              this.disble_office=true

            }
          })
          .catch(error => {
            console.log(error)
            this.office_hint='Sorry !! seems there are some server problem'
            this.disble_office=false
          })
      }else{
        alert('Please select Personnel and provide reason for reamrk')
      }
    },

    do_personnel_exemption:function(){
      if(this.personnel_id!='' && this.exemption_reason_personnel!=''){
      this.doing_personnel_exemption=true
      axios.post('/doexception',{
          mode:'personnel',
          personnel_id: this.personnel_id,
          reason:this.exemption_reason_personnel
          })
          .then((response, data) => {
            if(response.data.length<=0){
              this.personnel_hint='Sorry !!No Personnel Exempted by this ID'
              }
            else{
              this.personnels=[]
              this.exemption_reason_personnel=''
              this.personnel_hint='Personnel Exempted by this ID'
              this.doing_personnel_exemption=false
              this.tableloading_personnel=false
              this.disble_personnel=true

            }
          })
          .catch(error => {
            console.log(error)
            this.personnel_hint='Sorry !! seems there are some server problem'
            this.disble_personnel=false
          })
      }else{
        alert('Please Input Personnel and provide reason for reamrk')
      }
    },

  },
  watch:{
    remark_id:function(val){
      this.remarks_hint=''
      if(val!=''){
        axios.post('/getpersonnnelforexcemption',{
          mode:'remarks',
          remark_id: this.remark_id
          })
          .then((response, data) => {
            if(response.data.count<=0){
              this.remarks_hint='Sorry !!No Personnel found by this Remark'
              this.disble_remark=true
              }
            else{
              this.remarks_hint=response.data.count+' Personnel found by this Remark'
              this.disble_remark=false

            }
          })
          .catch(error => {
            console.log(error)
            this.remarks_hint='Sorry !! seems there are some server problem'
          })
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
              this.personnel_hint='Personnel found by this ID'
              this.disble_personnel=false
              this.personnels=response.data['excemptionList']

            }
          })
          .catch(error => {
            console.log(error)
            this.personnel_hint='Sorry !! seems there are some server problem'
          })
      }
    }
  }

}

</script>

