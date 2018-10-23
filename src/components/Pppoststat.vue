<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap fill-height>
                  <v-flex xs12>
                <v-card class="elevation-6">
                  <v-toolbar dark color="blue-grey darken-3">
                    <v-toolbar-title>Set new rule for personnel Categorization</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form autocomplete="off">
                       <v-layout row wrap>
                         <v-flex xs6>
                          <v-select
                            v-model="subdivision_id"
                            :items="subdivisions"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="list"
                            label="Select Subdivision"
                            multiple

                          ></v-select>
                         </v-flex>
                         <v-flex xs6>
                          <v-select
                            v-model="category_id"
                            :items="officecategories"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="list"
                            label="Select Office Category"
                            multiple

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
                            :step="14"
                            thumb-label="always"

                          ></v-range-slider>
                        </v-flex>

                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs12>
                          <v-select
                            v-model="qualification_id"
                            :items="qualifications"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="list"
                            label="Select Qualifications to Exclude"
                            multiple

                          ></v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs12>
                          <v-select
                            v-model="designation"
                            :items="designations"
                            item-text= "name"
                            item-value= "id"
                            prepend-icon="list"
                            label="Select Designation to Exclude"
                            multiple

                          ></v-select>
                         </v-flex>
                       </v-layout>
                       <v-layout row wrap>
                         <v-flex xs6>
                          <v-select
                            v-model="gender"
                            :items="genders"
                            item-text= "name"
                            item-value= "val"
                            prepend-icon="list"
                            label="Select Gender"
                          ></v-select>
                         </v-flex>
                       </v-layout>
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
      subdivision_id:'',
      category_id:'',
      qualification_id:'',
      designation:'',
      visible_grade: true,
      visible_level:false,
      subdivisions: [],
      officecategories:[],
      qualifications:[],
      designations:[],
      genders:[
        { name:'ALL',val: 'ALL'},
        { name:'MALE',val: 'M'},
        { name:'FEMALE',val: 'F'},
      ],
      basic_pay: [2100, 40400],
      grade_pay:[2100, 40400],
      pay_level:1,
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
   this.loadqualifications()
   this.loaddesignations()
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
    loadqualifications:function(){
       axios.get('/qualifications')
      .then((response, data) => {
      // this.qualifications.push({name:"ALL",id:"ALL"})
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
       axios.post('/fetch_designation_of_pp')
      .then((response, data) => {
      // this.qualifications.push({name:"ALL",id:"ALL"})
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.designations.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  watch:{
    subdivision_id:function(val){ alert(val)

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

