<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap fill-height>
                  <v-flex xs12>
                <v-card class="elevation-6 mb-5">
                  <v-toolbar dark color="blue-grey darken-3">
                    <v-toolbar-title>Set new rule for Personnel Categorization   </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form autocomplete="off">
                       <v-layout row wrap>
                         <v-flex xs6>
                          <v-select
                            v-model="poststat_from"
                            :items="poststats"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="call_received"
                            label="Post Status (From)"
                            v-validate="'required'"
                            :error-messages="errors.collect('poststat_from')"
                            data-vv-name="poststat_from"
                            :disabled="disable_offcat"
                          ></v-select>
                         </v-flex>
                         <v-flex xs6>
                          <v-select
                           v-model="poststat_to"
                            :items="poststats"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="call_made"
                            label="Post Status (To)"
                            v-validate="'required'"
                            :error-messages="errors.collect('poststat_to')"
                            data-vv-name="poststat_to"
                            :disabled="disable_offcat"
                          ></v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <!--<v-flex xs5>
                           <v-select
                            v-model="subdivision_id"
                            :items="subdivisions"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="list"
                            label="Select Subdivision"
                            v-validate="'required'"
                            :error-messages="errors.collect('subdivision_id')"
                            data-vv-name="subdivision_id"
                          ></v-select>
                         </v-flex>-->
                         <v-flex xs12>
                          <v-select
                            v-model="category_id"
                            :items="officecategories"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="list"
                            label="Select Office Category"
                            multiple
                            v-validate="'required'"
                            :error-messages="errors.collect('category_id')"
                            data-vv-name="category_id"
                            :disabled="disable_offcat"
                            autocomplete
                            :search-input.sync="search_office_cat"
                          >
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary" :disabled="disable_offcat" @click="loadoffices" :loading="loading_offcat">Load Office</v-btn></v-slide-x-reverse-transition>
                          </v-select>

                         </v-flex>

                         <v-flex xs12>
                          <v-select
                            v-model="office_id"
                            :items="offices"
                            item-text= "officename"
                            item-value= "officecode"
                            prepend-icon="list"
                            label="Select Office"
                            multiple
                            v-validate="'required'"
                            :error-messages="errors.collect('office_id')"
                            data-vv-name="office_id"
                            :disabled="disable_off"
                            autocomplete
                            :search-input.sync="search_office"
                          >
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary" :disabled="disable_off" @click="loadqualifications" :loading="loading_off">Next</v-btn></v-slide-x-reverse-transition>
                          </v-select>

                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                        <v-flex xs5>
                          <v-flex xs12 mb-0>
                          <v-subheader class="pl-0"><v-icon>payment</v-icon> Select Basic Pay range</v-subheader>
                          </v-flex>
                          <v-layout row wrap>

                            <v-flex xs5>
                              <v-text-field
                              v-model="basic_pay[0]"
                              class="mt-0"
                              :disabled="disble_qual"
                              single-line
                              type="text"
                              counter
                              maxlength="6"
                              v-validate="'required|numeric'"
                              :error-messages="errors.collect('basic_pay[0]')"
                              data-vv-name="basic_pay[0]"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <!-- <v-range-slider
                                  v-model="basic_pay"
                                  :max="50000"
                                  :min="0"
                                  :step="100"
                                  :thumb-size="50"
                                  thumb-label="always"
                                  :disabled="payment_show"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('basic_pay')"
                                  data-vv-name="basic_pay"
                                ></v-range-slider> -->
                                TO
                            </v-flex>
                            <v-flex xs5>
                              <v-text-field
                              v-model="basic_pay[1]"
                              class="mt-0"
                              :disabled="disble_qual"
                              single-line
                              type="text"
                              counter
                              maxlength="6"
                              v-validate="'required|numeric'"
                              :error-messages="errors.collect('basic_pay[1]')"
                              data-vv-name="basic_pay[1]"
                              ></v-text-field>
                            </v-flex>

                          </v-layout>
                        </v-flex>
                          <v-flex xs2>
                            <v-divider
                            class="mx-3"
                            inset
                            vertical
                          ></v-divider>
                          </v-flex>
                        <v-flex v-show="visible_grade" xs5>
                          <v-flex xs12 mb-0>
                          <v-subheader class="pl-0"><v-icon>payment</v-icon> Select Garde Pay range</v-subheader>
                          </v-flex>
                          <v-layout>
                            <v-flex xs5 >
                              <v-text-field
                              v-model="grade_pay[0]"
                              class="mt-0"
                              :disabled="disble_qual"
                              single-line
                              type="text"
                              counter
                              maxlength="6"
                              v-validate="'required|numeric'"
                              :error-messages="errors.collect('grade_pay[0]')"
                              data-vv-name="grade_pay[0]"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                              <!-- <v-range-slider
                                v-model="grade_pay"
                                :max="6000"
                                :min="1500"
                                :step="100"
                                :thumb-size="50"
                                thumb-label="always"
                                :disabled="payment_show"
                              ></v-range-slider> -->
                              TO
                            </v-flex>
                            <v-flex xs5 >
                              <v-text-field
                              v-model="grade_pay[1]"
                              class="mt-0"
                              :disabled="disble_qual"
                              single-line
                              type="text"
                              counter
                              maxlength="6"
                              v-validate="'required|numeric'"
                              :error-messages="errors.collect('grade_pay[1]')"
                              data-vv-name="grade_pay[1]"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                        </v-flex>
                        <v-flex v-show="visible_level"  xs5>
                          <v-flex xs12 mb-5>
                          <v-subheader class="pl-0"><v-icon>payment</v-icon> Select Pay Level range</v-subheader>
                          </v-flex>
                          <v-range-slider
                            v-model="pay_level"
                            :max="14"
                            :min="1"
                            :step="1"
                            thumb-label="always"
                            :disabled="payment_show"
                          ></v-range-slider>
                        </v-flex>

                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs7>
                           <v-layout>
                             <v-checkbox label="Exclude" v-model="exclude_qualification" :disabled="disble_qual" hide-details class="shrink mr-2"></v-checkbox>
                          <v-select
                            v-model="qualification_id"
                            :items="qualifications"
                            item-text= "QualificationName"
                            item-value= "QualificationCode"
                            prepend-icon="verified_user"
                            label="Select Qualification(s)"
                            multiple
                            :disabled="disble_qual"
                            v-validate="'required'"
                            :error-messages="errors.collect('qualification_id')"
                            data-vv-name="qualification_id"
                            autocomplete
                            :search-input.sync="search_qualification"
                          >
                          </v-select>
                           </v-layout>
                         </v-flex>
                         <v-flex xs5>
                           <v-select
                              :items="emp_groups"
                              prepend-icon="list"
                              label="Employee Group(*)"
                              v-model="emp_group"
                              multiple
                              :disabled="disble_qual"
                              v-validate="'required'"
                              data-vv-name="emp_group"
                              :error-messages="errors.collect('emp_group')"
                            >
                            <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary" :disabled="disble_qual" @click="loaddesignations" :loading="loading_designation">Next</v-btn></v-slide-x-reverse-transition>

                            </v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs12>
                           <v-layout>
                          <v-checkbox label="Exclude" v-model="exclude_designation" hide-details :disabled="disable_desig" class="shrink mr-2"></v-checkbox>
                          <v-select
                            v-model="designation"
                            :items="designations"
                            item-text= "Designation"
                            item-value= "Designation"
                            prepend-icon="account_box"
                            label="Select Designation(s)"
                            multiple
                            autocomplete
                            :search-input.sync="search_desig"
                            :disabled="disable_desig"
                            v-validate="'required'"
                            :error-messages="errors.collect('designation')"
                            data-vv-name="designation"
                          ></v-select>
                           </v-layout>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs6>
                          <v-select
                            v-model="gender"
                            :items="genders"
                            item-text= "name"
                            item-value= "val"
                            prepend-icon="perm_identity"
                            label="Select Gender"
                            v-validate="'required'"
                            :error-messages="errors.collect('gender')"
                            data-vv-name="gender"
                            :disabled="disable_agegrp"
                          ></v-select>
                         </v-flex>
                         <v-flex xs6>
                          <v-select
                            v-model="age"
                            :items="ages"
                            item-text= "name"
                            item-value= "val"
                            prepend-icon="recent_actors"
                            label="Select Age"
                            v-validate="'required'"
                            :error-messages="errors.collect('age')"
                            data-vv-name="age"
                            :disabled="disable_agegrp"
                          >
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"><v-btn color="primary" :disabled="disable_agegrp" @click="loadremarks" :loading="loading_remark">Next</v-btn></v-slide-x-reverse-transition>
                          </v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs12>
                           <v-layout>
                          <v-checkbox label="Exclude" v-model="exclude_remark"  hide-details class="shrink mr-2"></v-checkbox>
                          <v-select
                            v-model="remark_id"
                            :items="remarks"
                            item-text= "RemarksName"
                            item-value= "RemarksCode"
                            prepend-icon="announcement"
                            label="Select Remark(s)"
                            multiple
                            autocomplete
                            :search-input.sync="search_remark"
                          ></v-select>
                           </v-layout>
                         </v-flex>
                       </v-layout>

                       <v-btn color="primary" @click="throttledMethod()" :loading="setting_rule">Set Rule</v-btn>
                       <v-btn color="primary" :disabled="disable_reset" @click="resetrule">Reset</v-btn>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>

                  </v-card-actions>
                </v-card>

                  </v-flex>



              </v-layout>

            </v-container>

      </section>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'PppostStatus',
   components: {
    },
  data () {
    return {
      search_desig:'',
      search_office:'',
      search_office_cat:'',
      search_qualification:'',
      search_remark:'',
      loading_offcat: false,
      loading_off:false,
      loading_designation:false,
      loading_remark:false,
      setting_rule:false,
      subdivision_id:'ALL',
      category_id:'',
      disable_offcat: false,
      office_id:'',
      disable_off:true,
      qualification_id:'',
      disble_qual:true,
      designation:'',
      emp_group:'',
      disable_desig:true,
      disable_reset:false,
      gender:'',
      age:'',
      disable_agegrp:false,
      remark_id:'',
      exclude_qualification:0,
      exclude_designation:0,
      exclude_remark:0,
      poststat_from:'',
      poststat_to: '',
      visible_grade: true,
      visible_level:false,
      subdivisions: [],
      officecategories:[],
      offices:[],
      qualifications:[],
      designations:[],
      remarks:[],
      genders:[
        { name:'ALL',val: 'ALL'},
        { name:'MALE',val: 'M'},
        { name:'FEMALE',val: 'F'},
      ],
      ages:[
        //{ name:'LESS THAN 60',val: '<60'},
        { name:'LESS THAN 59',val: '<59'}
      ],
      emp_groups: [
          'ALL',
          'A',
          'B',
          'C',
          'D'
        ],
      poststats:[],
      basic_pay: [2100, 40400],
      grade_pay:[2100, 40400],
      pay_level:[10, 15],
      payment_show: false,
      dictionary: {
          custom: {
            office_id: {
              required: 'Office is required'
            },
            qualification_id: {
              required: 'Qualification is required'
            },
            subdivision_id: {
              required: 'Subdivision is required'
            },
            category_id: {
              required: 'Please select Category'
            },
            basic_pay: {
              required: 'Basic Pay is required'
            },
            gender: {
              required: 'Please select Gender'
            },
            age:{
              required: 'Please select Age'
            },
            poststat_from:{
              required:'Please select Post Status from which users will be selected'
            },
            poststat_to:{
              required: 'Please select Post Status which will be applied upon selected users'
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
   this.loadpoststatus()
   this.loadsubdivision()
   this.loadofficecategory()

  },
  mounted() {
    this.$validator.localize("en", this.dictionary)
  },
  computed: {

  },
  watch:{
    poststat_from:function(val){ alert(val)
      if(val != '' && this.poststat_to !=''){ this.disable_offcat=false}
    },
    poststat_to:function(val){
      if(val != '' && this.poststat_from !=''){ this.disable_offcat=false}
    }
  },
  methods:{
    resetrule:function(){
      this.subdivisions=[]
      this.offices=[]
      this.qualifications=[]
      this.designations=[]
      this.remarks=[]
      this.disable_offcat=false
      this.disable_off=false
      this.disble_qual=false
      this.disable_desig=false
      this.disable_agegrp=false
      this.category_id=null
      this.office_id=null
      this.qualification_id=null
      this.designation=null
      this.$validator.reset()
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
    loadsubdivision:function(){
       axios.get('/subdivisions')
      .then((response, data) => {
       if(response.data.length >=1 ) {this.subdivisions.push({name:"ALL",id:"ALL"})}
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.subdivisions.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    loadofficecategory:function(){
       axios.get('/categories')
      .then((response, data) => {
      if(response.data.length >=1 ) {this.officecategories.push({name:"ALL",id:"ALL"})
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.officecategories.push(item)
        })
      }else{
        alert('No Categories found')
      }

      })
      .catch(error => {
        console.log(error)
      })
    },
    loadoffices:function(event){
    if(this.poststat_from=='' || this.poststat_to==''){
      alert('Please select both Post Status')
    }else{


    if(this.disable_offcat === false && this.category_id != ''){
        this.loading_offcat=true
        axios.post('/officebysubdivision',{
         subdivision_id:this.subdivision_id,
         category_id: this.category_id
       })
      .then((response, data) => {
        this.offices=[]
      if(response.data['office'].length >=1 ) {
        this.offices.push({officename:"ALL",officecode:"ALL"})
        this.disable_offcat=true
        this.disable_off=false
        this.loading_offcat=false

       response.data['office'].forEach(item => {
         console.log('Off - '+item)
         item.officename=item.officename.toUpperCase()
          this.offices.push(item)
        })}
        else{
        alert('No Office found')
      }

      })
      .catch(error => {
        console.log(error)
      })
      }
      else{
             this.errors.add(
                  {
                    field: 'category_id',
                    msg: 'Office Category is required'
                  }
             )

      }
      }

    },
    loadqualifications:function(){
      if(this.disable_off === false && this.category_id != '' && this.office_id != ''){
        this.loading_off=true
         axios.post('/fetch_qualification_by_oficecode',{
         subdivision_id:this.subdivision_id,
         category_id: this.category_id,
         office_id: this.office_id
       })
      .then((response, data) => {
        this.qualifications=[]
     if(response.data['qualification'].length >=1 ) {
       this.qualifications.push({QualificationName:"ALL",QualificationCode:"ALL"})
       this.disable_off=true

       response.data['qualification'].forEach(item => {
         item.QualificationName=item.QualificationName.toUpperCase()
          this.qualifications.push(item)
          this.disble_qual=false
          this.loading_off=false
        })}
        else{
        alert('No Qualification found')
      }

      })
      .catch(error => {
        console.log(error)
      })
      }
      else{
             this.errors.add(
                  {
                    field: 'category_id',
                    msg: 'Office Category is required'
                  },
                  {
                    field: 'office_id',
                    msg: 'Please select Office'
                  }
             )

      }
    },
    loaddesignations:function(){
      if(this.disble_qual == false && this.emp_group!=''){
        this.loading_designation=true
       axios.post('/fetch_designation_of_pp',{
          subdivision_id:this.subdivision_id,
          category_id:this.category_id,
          office_id:this.office_id,
          qualification_id:this.qualification_id,
          not_qualification:this.exclude_qualification ? 1 : 0,
          emp_group:this.emp_group,
          basic_pay:this.basic_pay,
          grade_pay:this.visible_grade ? this.grade_pay : 0,
          pay_level:this.visible_level ? this.pay_level : 0,
       })
      .then((response, data) => {
        this.designations=[]
        if(response.data['designation'].length >=1 ) {
         this.designations.push({Designation:"ALL"})
         this.disble_qual=true

       response.data['designation'].forEach(item => {
         item.Designation=item.Designation.toUpperCase()
          this.designations.push(item)
          this.disable_desig=false
        })}
        else{
        alert('No Designation found')
      }
        this.loading_designation=false

      })
      .catch(error => {
        console.log(error)
      })
      }else{
        this.loading_designation=false
        alert('Please select Employee Group !!')
      }
    },
    loadremarks:function(){
      if(this.disable_desig === false){
        this.loading_remark=true
       axios.post('/fetch_remarks_by_condition',{
         subdivision_id: this.subdivision_id,
                category_id: this.category_id,
                office_id:this.office_id,
                basic_pay: this.basic_pay,
                grade_pay:this.visible_grade ? this.grade_pay : 0,
                pay_level:this.visible_level ? this.pay_level : 0,
                not_qualification: this.exclude_qualification ? 1 : 0,
                not_designation:this.exclude_designation ? 1 : 0,
                emp_group:this.emp_group,
                not_remarks:this.exclude_remark ? 1 : 0,
                qualification_id:this.qualification_id,
                designation: this.designation,
                gender:this.gender,
                age:this.age,
                post_stat_to:this.poststat_to
       })
      .then((response, data) => {
       if(response.data.erorr=='designation length can not be greater than 200'){
         alert('Please chosse less Number of Designation.')
         this.loading_remark=false
       }
       else if(response.data['remarks'].length >=1 ) {
         this.remarks.push({RemarksName: 'ALL', RemarksCode: 'ALL'})
         this.disable_desig=true
         this.disable_agegrp=true

       response.data['remarks'].forEach(item => {
         item.RemarksName=item.RemarksName.toUpperCase()
          this.remarks.push(item)
        })}
        else{
        alert('No Categories found')
      }
      this.loading_remark=false
      })
      .catch(error => {
        console.log(error)
      })
      }
    },
    throttledMethod: _.throttle(function()  {
      this.setrule()
       }, 10000),
    setrule:function(){
      this.setting_rule=true
      this.$validator.validate()
        .then(result =>{
          if(result){
                axios.post('/setrule',{
                subdivision_id: this.subdivision_id,
                category_id: this.category_id,
                office_id:this.office_id,
                basic_pay: this.basic_pay,
                grade_pay:this.visible_grade ? this.grade_pay : 0,
                pay_level:this.visible_level ? this.pay_level : 0,
                not_qualification: this.exclude_qualification ? 1 : 0,
                not_designation:this.exclude_designation ? 1 : 0,
                not_remarks:this.exclude_remark ? 1 : 0,
                qualification_id:this.qualification_id,
                designation: this.designation,
                emp_group:this.emp_group,
                gender:this.gender,
                age:this.age,
                remarks:this.remark_id ? this.remark_id: 'ALL',
                post_stat_from:this.poststat_from,
                post_stat_to:this.poststat_to
            })
            .then((response, data) => {
              this.$router.replace("/pppoststatlist")

            })
            .catch(error => {
              this.setting_rule=false
              console.log(error)
            })
          }else{
            this.setting_rule=false
          }
        })

    }
  },
  watch:{
    subdivision_id:function(val){

    },
    category_id:function(val){

      if(val == '01'){
        // this.visible_grade=false
        // this.visible_level=true
        this.visible_grade=true
        this.visible_level=false
      }
      else{
        this.visible_grade=true
        this.visible_level=false
      }
    }
  }

}

</script>

