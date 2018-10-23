<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap fill-height>
                  <v-flex xs12>
                <v-card class="elevation-6">
                  <v-toolbar dark color="blue-grey darken-3">
                    <v-toolbar-title>Set new rule for Personnel Categorization</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form autocomplete="off">
                       <v-layout row wrap>
                         <v-flex xs5>
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
                         </v-flex>
                         <v-flex xs7>
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
                          ></v-select>
                          <v-btn color="primary" @click="loadoffices" :loading="loading">Load Office</v-btn>
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
                          ></v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                        <v-flex xs5>
                          <v-flex xs12 mb-5>
                          <v-subheader class="pl-0"><v-icon>payment</v-icon> Select Basic Pay range</v-subheader>
                          </v-flex>
                          <v-range-slider
                            v-model="basic_pay"
                            :max="60000"
                            :min="2000"
                            :step="10"
                            :thumb-size="50"
                            thumb-label="always"
                            :disabled="payment_show"
                            v-validate="'required'"
                            :error-messages="errors.collect('basic_pay')"
                            data-vv-name="basic_pay"
                          ></v-range-slider>
                        </v-flex>
                        <v-flex xs2></v-flex>
                        <v-flex v-show="visible_grade" xs5>
                          <v-flex xs12 mb-5>
                          <v-subheader class="pl-0"><v-icon>payment</v-icon> Select Garde Pay range</v-subheader>
                          </v-flex>
                          <v-range-slider
                            v-model="grade_pay"
                            :max="60000"
                            :min="2000"
                            :step="10"
                            :thumb-size="50"
                            thumb-label="always"
                            :disabled="payment_show"
                          ></v-range-slider>
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
                         <v-flex xs12>
                           <v-layout>
                             <v-checkbox label="!" v-model="exclude_qualification" hide-details class="shrink mr-2"></v-checkbox>
                          <v-select
                            v-model="qualification_id"
                            :items="qualifications"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="verified_user"
                            label="Select Qualification(s)"
                            multiple

                          ></v-select>
                           </v-layout>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs12>
                           <v-layout>
                          <v-checkbox label="!" v-model="exclude_designation" hide-details class="shrink mr-2"></v-checkbox>
                          <v-select
                            v-model="designation"
                            :items="designations"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="account_box"
                            label="Select Designation(s)"
                            multiple

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
                          ></v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs12>
                           <v-layout>
                          <v-checkbox label="!" v-model="exclude_remark" hide-details class="shrink mr-2"></v-checkbox>
                          <v-select
                            v-model="remark_id"
                            :items="remarks"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="announcement"
                            label="Select Remark(s)"
                            multiple

                          ></v-select>
                           </v-layout>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs6>
                          <v-select
                            v-model="poststat_from"
                            :items="poststats"
                            item-text= "name"
                            item-value= "val"
                            prepend-icon="call_received"
                            label="Post Status (From)"
                            v-validate="'required'"
                            :error-messages="errors.collect('poststat_from')"
                            data-vv-name="poststat_from"
                          ></v-select>
                         </v-flex>
                         <v-flex xs6>
                          <v-select
                           v-model="poststat_to"
                            :items="poststats"
                            item-text= "name"
                            item-value= "val"
                            prepend-icon="call_made"
                            label="Post Status (To)"
                            v-validate="'required'"
                            :error-messages="errors.collect('poststat_to')"
                            data-vv-name="poststat_to"
                          ></v-select>
                         </v-flex>
                       </v-layout>
                       <v-btn color="primary" @click="setrule" :loading="loading">Set Rule</v-btn>
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
export default {
  name: 'PppostStatus',
   components: {
    },
  data () {
    return {
      loading: false,
      subdivision_id:'',
      category_id:'',
      office_id:'',
      qualification_id:'',
      designation:'',
      gender:'',
      age:'',
      remark_id:'',
      exclude_qualification:'',
      exclude_designation:'',
      exclude_remark:'',
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
        { name:'LESS THAN 60',val: '<60'},
        { name:'LESS THAN 59',val: '<59'}
      ],
      poststats:[
        {name: 'PR', val:'PR'},
        {name: 'P1', val:'P1'},
        {name: 'P1', val:'P1'},
        {name: 'P3', val:'P3'},
        {name: 'MO', val:'MO'},
      ],
      basic_pay: [2100, 40400],
      grade_pay:[2100, 40400],
      pay_level:[10, 15],
      payment_show: false,
      dictionary: {

          custom: {
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
            }
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
   this.loadsubdivision()
   this.loadofficecategory()

  },
  computed: {

  },
  methods:{
    loadsubdivision:function(){
       axios.get('/subdivisions')
      .then((response, data) => {
      this.subdivisions.push({name:"ALL",id:"ALL"})
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
      this.officecategories.push({name:"ALL",id:"ALL"})
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.officecategories.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    loadoffices:function(){
       axios.post('/officebysubdivision',{
         subdivision_id:this.subdivision_id,
         category_id: this.category_id
       })
      .then((response, data) => {
        console.log('Off - '+response.data['office'])
      this.offices.push({officename:"ALL",officecode:"ALL"})
       response.data['office'].forEach(item => {
         console.log('Off - '+item)
         item.officename=item.officename.toUpperCase()
          this.offices.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    loadqualifications:function(){
       axios.get('/qualifications')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.qualifications.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    loaddesignations:function(){
       axios.post('/fetch_designation_of_pp',{

       })
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.designations.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    loadremarks:function(){
       axios.post('/fetch_remarks_by_condition',{

       })
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.remarks.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    },
    setrule:function(){
      this.$validator.validate()
        .then(result =>{
          if(result){
                axios.post('/setrule',{
                subdivision_id: this.subdivision_id,
                category_id: this.category_id,
                basic_pay: this.basic_pay,
                grade_pay:this.grade_pay,
                pay_level:this.pay_level,
                qualification_id:this.qualification_id,
                designation: this.designation,
                gender:this.gender,
                age:this.age,
                remark_id:this.remark_id,
                poststat_from:this.poststat_from,
                poststat_to:this.poststat_to
            })
            .then((response, data) => {


            })
            .catch(error => {
              console.log(error)
            })
          }
        })

    }
  },
  watch:{
    subdivision_id:function(val){

    },
    category_id:function(val){

      if(val == '01'){
        this.visible_grade=false
        this.visible_level=true
      }
      else{
        this.visible_grade=true
        this.visible_level=false
      }
    }
  }

}

</script>

