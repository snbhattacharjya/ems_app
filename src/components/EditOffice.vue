<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>

        <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Edit your Office</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="office_name"
                label="Office Name"
                type="text"
                v-model="office_name"
                v-validate="'required'"
                :error-messages="errors.collect('office_name')"
                data-vv-name="office_name"
              ></v-text-field>

              <v-text-field
                prepend-icon="credit_card"
                name="identification_code"
                label="Identification Code eg. DDO Code/IFSC/DISE Code alike"
                type="text"
                v-model="identification_code"
                v-validate="'required'"
                :error-messages="errors.collect('identification_code')"
                data-vv-name="identification_code"
              ></v-text-field>

              <v-text-field
                prepend-icon="account_box"
                name="officer_designation"
                label="Designation of Head of Office"
                type="text"
                v-model="officer_designation"
                v-validate="'required|alpha'"
                :error-messages="errors.collect('officer_designation')"
                data-vv-name="officer_designation"
              ></v-text-field>

              <v-text-field
                prepend-icon="account_balance"
                name="office_address"
                label="Office Address"
                type="text"
                v-model="office_address"
                v-validate="'required'"
                :error-messages="errors.collect('office_address')"
                data-vv-name="office_address"
              ></v-text-field>

              <v-text-field
                prepend-icon="local_post_office"
                name="post_office"
                label="Post Office"
                type="text"
                v-model="post_office"
                v-validate="'required|alpha'"
                :error-messages="errors.collect('post_office')"
                data-vv-name="post_office"
              ></v-text-field>

              <v-text-field
                prepend-icon="fiber_pin"
                name="pin"
                label="Pincode"
                type="text"
                v-model="pin"
                v-validate="'required|digits:6'"
                :error-messages="errors.collect('pin')"
                data-vv-name="pin"
              ></v-text-field>


              <block-muni-list
                v-model="block_muni_id"
                v-validate="'required'"
                data-vv-name="block_muni_id"
                :error="errors.collect('block_muni_id')"
                :selected="block_muni_id"
              ></block-muni-list>

              <police-station-list
                v-model="police_station_id"
                v-validate="'required'"
                data-vv-name="police_station_id"
                :error="errors.collect('police_station_id')"
                :selected="police_station_id"
              ></police-station-list>

              <assembly-list
                v-model="ac_id"
                v-validate="'required'"
                data-vv-name="ac_id"
                :error="errors.collect('ac_id')"
                :selected="ac_id"
              ></assembly-list>

              <pc-list
                v-model="pc_id"
                v-validate="'required'"
                data-vv-name="pc_id"
                :error="errors.collect('pc_id')"
                :selected="pc_id"
              ></pc-list>

              <category-list
                v-model="category_id"
                v-validate="'required'"
                data-vv-name="category_id"
                :error="errors.collect('category_id')"
                :selected="category_id"
              ></category-list>

              <institute-list
                v-model="institute_id"
                v-validate="'required'"
                data-vv-name="institute_id"
                :error="errors.collect('institute_id')"
                :selected="institute_id"
              ></institute-list>

              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
              ></v-text-field>

              <v-text-field
                prepend-icon="phone"
                name="phone"
                label="Phone No"
                type="text"
                v-model="phone"
                v-validate="'digits:11'"
                :error-messages="errors.collect('phone')"
                data-vv-name="phone"
              ></v-text-field>

              <v-text-field
                prepend-icon="phone_android"
                name="mobile"
                label="Mobile of Head of Office"
                type="text"
                v-model="mobile"
                v-validate="'required|digits:10'"
                :error-messages="errors.collect('mobile')"
                data-vv-name="mobile"
              ></v-text-field>

              <v-text-field
                prepend-icon="print"
                name="fax"
                label="Fax"
                type="text"
                v-model="fax"
                v-validate="'numeric'"
                :error-messages="errors.collect('fax')"
                data-vv-name="fax"
              ></v-text-field>

              <v-text-field
                prepend-icon="account_circle"
                name="male_staff"
                label="Male Staff (in count)"
                type="text"
                v-model.number="male_staff"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('male_staff')"
                data-vv-name="male_staff"
                @input="calculateTotalStaff"
              ></v-text-field>

              <v-text-field
                prepend-icon="face"
                name="female_staff"
                label="Female Staff (in count)"
                type="text"
                v-model.number="female_staff"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('female_staff')"
                data-vv-name="female_staff"
                @input="calculateTotalStaff"
              ></v-text-field>

              <v-text-field
                prepend-icon="add_comment"
                name="total_staff"
                label="Total Staff"
                type="text"
                v-model.number="total_staff"
                data-vv-name="total_staff"
                readonly
              ></v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbar" :multi-line="false" :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validateOffice" :disabled="disable_save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
 // import SubdivisionList from '@/components/SubdivisionList'
  import BlockMuniList from '@/components/BlockMuniList'
  import PoliceStationList from '@/components/PoliceStationList'
  import AssemblyList from '@/components/AssemblyList'
  import PcList from '@/components/PcList'
  import CategoryList from '@/components/CategoryList'
  import InstituteList from '@/components/InstituteList'

  export default{
    name: 'EditOfice',

    components: {
      //'subdivision-list': SubdivisionList,
      'block-muni-list': BlockMuniList,
      'police-station-list': PoliceStationList,
      'assembly-list': AssemblyList,
      'pc-list': PcList,
      'category-list': CategoryList,
      'institute-list': InstituteList,
    },

    $_veeValidate: {
      validator: 'new'
    },

    data (){
      return {
        valid: true,
        snackbar: false,
        office_id:'',
        office_name: '',
        identification_code: '',
        //subdivision_id: '',
        block_muni_id: '',
        office_address: '',
        officer_designation: '',
        post_office: '',
        pin: '',
        police_station_id: '',
        ac_id: '',
        pc_id: '',
        category_id: '',
        institute_id: '',
        email: '',
        phone: '',
        mobile: '',
        fax: '',
        male_staff: 0,
        female_staff: 0,
        total_staff: 0,
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        disable_save: false,

        dictionary: {

          custom: {
            office_name: {
              required: 'Office Name can not be empty',
            },
            identification_code: {
              required: 'Identification Code is required'
            },
            block_muni_id: {
              required: 'Block/Municipality is required'
            }
          }
        }

      }
    },
    created(){
      //this.office_id=this.getuser.user_id
      this.initialize()
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      initialize () {
        console.log('Office id - '+this.getofficeid.user_id)
        axios.get('/office/'+this.getofficeid.user_id,{
          id: this.getofficeid.user_id
        })
        .then((response, data) => {
        response.data.forEach(item => {
              this.office_name= item.name,
              this.identification_code= item.identification_code,
              //this.subdivision_id= item.subdivision_id,
              this.block_muni_id= item.block_muni_id,
              this.office_address= item.address,
              this.officer_designation= item.officer_designation,
              this.post_office= item.post_office,
              this.pin= item.pin,
              this.police_station_id= item.police_station_id,
              this.ac_id= item.ac_id,
              this.pc_id= item.pc_id,
              this.category_id= item.category_id,
              this.institute_id= item.institute_id,
              this.email= item.email,
              this.phone= item.phone,
              this.mobile= item.mobile,
              this.fax= item.fax,
              this.male_staff= item.male_staff,
              this.female_staff= item.female_staff,
              this.total_staff= item.total_staff
          })
        })
        .catch(error => {
          console.log(error)
        })
      },
      validateOffice(){
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.saveOffice() : this.showError()
            this.disable_save = false
          })
      },
      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
      },
      saveOffice(){
        axios.post('/office/update',{
          office_id:this.getofficeid.user_id,
          office_name: this.office_name,
          identification_code: this.identification_code,
          officer_designation: this.officer_designation,
          office_address: this.office_address,
          post_office: this.post_office,
          pin: this.pin,
         // subdivision_id: this.subdivision_id,
          block_muni_id: this.block_muni_id,
          police_station_id: this.police_station_id,
          ac_id: this.ac_id,
          pc_id: this.pc_id,
          category_id: this.category_id,
          institute_id: this.institute_id,
          identification_code: this.identification_code,
          email: this.email,
          phone: this.phone,
          mobile: this.mobile,
          fax: this.fax,
          total_staff: this.total_staff,
          male_staff: this.male_staff,
          female_staff: this.female_staff,
        })
        .then(response => {
          //this.$refs.form.reset()
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = 'Office Updated Successfully '
          this.snackbar =true
        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!! '+error.response.data.message
          this.snackbar =true
        })
      }
    },
    computed: {
      //initialize(){this.initialize()},
      calculateTotalStaff(){
        this.total_staff = this.male_staff + this.female_staff
      },
      getofficeid(){
        return this.$store.getters.getUser
      }
    }

  }
</script>
