<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Create New Personnel</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <office-list
                v-model="office_id"
                v-validate="'required'"
                :error-messages="errors.collect('office_id')"
                data-vv-name="office_id"
              ></office-list>

              <v-stepper v-model="personnel_form" vertical>
                <v-stepper-step :complete="personnel_form > 1" step="1" editable>
                  Personal Details
                  <!-- <small>Summarize if needed</small> -->
                </v-stepper-step>

                <v-stepper-content step="1">
                 <v-text-field
                  prepend-icon="person"
                  name="officer_name"
                  label="Officer Name"
                  type="text"
                  v-model="officer_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('officer_name')"
                  data-vv-name="officer_name"
                ></v-text-field>

                <v-text-field
                  prepend-icon="email"
                  name="designation"
                  label="Officer Designation"
                  type="text"
                  v-model="designation"
                  v-validate="'required'"
                  :error-messages="errors.collect('designation')"
                  data-vv-name="designation"
                ></v-text-field>

                <v-text-field
                  prepend-icon="email"
                  name="aadhaar"
                  label="Officer Aadhaar No (optional)"
                  type="text"
                  v-model="aadhaar"
                  v-validate="'digits:12'"
                  :error-messages="errors.collect('aadhaar')"
                  data-vv-name="aadhaar"
                ></v-text-field>

                <v-menu
                  ref="dob_menu"
                  :close-on-content-click="false"
                  v-model="dob_menu"
                  :nudge-right="40"
                  :return-value.sync="dob"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    readonly
                    prepend-icon="event"
                    name="dob"
                    label="Date of Birth"
                    type="text"
                    v-model="dob"
                    v-validate="'required'"
                    :error-messages="errors.collect('dob')"
                    data-vv-name="dob"
                  ></v-text-field>
                  <v-date-picker v-model="dob" @input="$refs.dob_menu.save(dob)"></v-date-picker>
                </v-menu>

                <v-select
                  :items="genders"
                  item-text= "name"
                  item-value= "id"
                  prepend-icon="list"
                  label="Gender"
                  v-model="gender"
                  v-validate="'required'"
                  data-vv-name="gender"
                  :error-messages="errors.collect('gender')"
                >
                </v-select>

                <qualification-list
                  v-model="qualification_id"
                  v-validate="'required'"
                  data-vv-name="qualification_id"
                  :error="errors.collect('qualification_id')"
                ></qualification-list>

                <language-list
                  v-model="language_id"
                  v-validate="'required'"
                  data-vv-name="language_id"
                  :error="errors.collect('language_id')"
                ></language-list>

                  <v-btn color="primary" @click="personnel_form = 2">Continue</v-btn>

                </v-stepper-content>

                <v-stepper-step :complete="personnel_form > 2" step="2" editable>Salary Details</v-stepper-step>

                <v-stepper-content step="2">
                  <v-text-field
                    prepend-icon="email"
                    name="scale"
                    label="Pay Scale"
                    type="text"
                    v-model="scale"
                    v-validate="'required'"
                    :error-messages="errors.collect('scale')"
                    data-vv-name="scale"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="basic_pay"
                    label="Basic Pay"
                    type="text"
                    v-model="basic_pay"
                    v-validate="'required'"
                    :error-messages="errors.collect('basic_pay')"
                    data-vv-name="basic_pay"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="grade_pay"
                    label="Grade Pay"
                    type="text"
                    v-model="grade_pay"
                    v-validate="'required'"
                    :error-messages="errors.collect('grade_pay')"
                    data-vv-name="grade_pay"
                  ></v-text-field>

                  <v-select
                    :items="emp_groups"
                    prepend-icon="list"
                    label="Employee Group"
                    v-model="emp_group"
                    v-validate="'required'"
                    data-vv-name="emp_group"
                    :error-messages="errors.collect('emp_group')"
                  >
                  </v-select>

                  <v-select
                    :items="working_statuses"
                    prepend-icon="list"
                    label="Working Status"
                    v-model="working_status"
                    v-validate="'required'"
                    data-vv-name="working_status"
                    :error-messages="errors.collect('working_status')"
                  >
                  </v-select>

                  <v-btn color="primary" @click="personnel_form = 3">Continue</v-btn>
                  <v-btn color="warning" @click="personnel_form = 1">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="personnel_form > 3" step="3" editable>Address Details</v-stepper-step>

                <v-stepper-content step="3">
                  <v-textarea
                    prepend-icon="email"
                    name="present_address"
                    label="Present Address"
                    type="text"
                    v-model="present_address"
                    v-validate="'required'"
                    :error-messages="errors.collect('present_address')"
                    data-vv-name="present_address"
                  ></v-textarea>

                  <v-textarea
                    prepend-icon="email"
                    name="permanent_address"
                    label="permanent Address"
                    type="text"
                    v-model="permanent_address"
                    v-validate="'required'"
                    :error-messages="errors.collect('permanent_address')"
                    data-vv-name="permanent_address"
                  ></v-textarea>

                  <v-text-field
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                    v-validate="'required'"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="phone"
                    label="Phone"
                    type="text"
                    v-model="phone"
                    v-validate="'required'"
                    :error-messages="errors.collect('phone')"
                    data-vv-name="phone"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    v-model="mobile"
                    v-validate="'required'"
                    :error-messages="errors.collect('mobile')"
                    data-vv-name="mobile"
                  ></v-text-field>

                  <block-muni-list
                    :label="block_muni_labels[0]"
                    v-model="block_muni_temp_id"
                    v-validate="'required'"
                    data-vv-name="block_muni_temp_id"
                    :error="errors.collect('block_muni_temp_id')"
                  ></block-muni-list>

                  <block-muni-list
                    :label="block_muni_labels[1]"
                    v-model="block_muni_perm_id"
                    v-validate="'required'"
                    data-vv-name="block_muni_perm_id"
                    :error="errors.collect('block_muni_perm_id')"
                  ></block-muni-list>

                  <block-muni-list
                    :label="block_muni_labels[2]"
                    v-model="block_muni_off_id"
                    v-validate="'required'"
                    data-vv-name="block_muni_off_id"
                    :error="errors.collect('block_muni_off_id')"
                  ></block-muni-list>

                  <v-btn color="primary" @click="personnel_form = 4">Continue</v-btn>
                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step step="4" :complete="personnel_form > 4" editable>Electoral Details</v-stepper-step>
                <v-stepper-content step="4">
                  <v-text-field
                    prepend-icon="email"
                    name="epic"
                    label="EPIC No"
                    type="text"
                    v-model="epic"
                    v-validate="'required'"
                    :error-messages="errors.collect('epic')"
                    data-vv-name="epic"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="part_no"
                    label="Part no"
                    type="text"
                    v-model="part_no"
                    v-validate="'required'"
                    :error-messages="errors.collect('part_no')"
                    data-vv-name="part_no"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="sl_no"
                    label="Serial No"
                    type="text"
                    v-model="sl_no"
                    v-validate="'required'"
                    :error-messages="errors.collect('sl_no')"
                    data-vv-name="sl_no"
                  ></v-text-field>

                  <assembly-list
                    :label="assembly_labels[0]"
                    v-model="assembly_temp_id"
                    v-validate="'required'"
                    data-vv-name="assembly_temp_id"
                    :error="errors.collect('assembly_temp_id')"
                  ></assembly-list>

                  <assembly-list
                    :label="assembly_labels[1]"
                    v-model="assembly_perm_id"
                    v-validate="'required'"
                    data-vv-name="assembly_perm_id"
                    :error="errors.collect('assembly_perm_id')"
                  ></assembly-list>

                  <assembly-list
                    :label="assembly_labels[2]"
                    v-model="assembly_off_id"
                    v-validate="'required'"
                    data-vv-name="assembly_off_id"
                    :error="errors.collect('assembly_off_id')"
                  ></assembly-list>
                  <v-btn color="primary" @click="personnel_form = 5">Continue</v-btn>
                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step step="5" editable>Bank Details</v-stepper-step>
                <v-stepper-content step="5">
                  <v-text-field
                    prepend-icon="email"
                    name="branch_ifsc"
                    label="IFSC No"
                    type="text"
                    v-model="branch_ifsc"
                    v-validate="'required'"
                    :error-messages="errors.collect('branch_ifsc')"
                    data-vv-name="branch_ifsc"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="bank_account_no"
                    label="Bank Account no"
                    type="text"
                    v-model="bank_account_no"
                    v-validate="'required'"
                    :error-messages="errors.collect('bank_account_no')"
                    data-vv-name="bank_account_no"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="email"
                    name="confirm_bank_account_no"
                    label="Confirm Bank Account No"
                    v-validate="'confirmed:bank_account_no'"
                    type="password"
                    :error-messages="errors.collect('confirm_bank_account_no')"
                    data-vv-name="confirm_bank_account_no"
                  ></v-text-field>



                </v-stepper-content>

              </v-stepper>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validatePersonnel" :disabled="disable_save">Save</v-btn>
          </v-card-actions>
          <v-snackbar v-model="snackbar" :multi-line="false" :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import OfficeList from '@/components/OfficeList'
import QualificationList from '@/components/QualificationList'
import LanguageList from '@/components/LanguageList'
import BlockMuniList from '@/components/BlockMuniList'
import AssemblyList from '@/components/AssemblyList'

  export default{
    name: 'PersonnelEdit',
    components: {
      OfficeList,
      QualificationList,
      LanguageList,
      BlockMuniList,
      AssemblyList,
    },
    $_veeValidate: {
      validator: 'new'
    },
    data (){
      return {
        valid: true,
        snackbar: false,
        personnel_id: '',
        office_id: '',
        officer_name: '',
        designation: '',
        aadhaar: '',
        dob: '',
        dob_menu: '',
        gender: '',
        qualification_id: '',
        language_id: '',
        scale: '',
        basic_pay: 0,
        grade_pay: 0,
        emp_groups: [
          'A',
          'B',
          'C',
          'D'
        ],
        working_statuses: [
          'Y',
          'N'
        ],
        genders: [
          {
            id: 'M',
            name: 'Male'
          },
          {
            id: 'F',
            name: 'Female'
          },
          {
            id: 'T',
            name: 'Transgender'
          }
        ],
        emp_group: '',
        working_status: '',
        gender: '',
        present_address: '',
        permanent_address: '',
        email: '',
        phone: '',
        mobile: '',
        block_muni_labels: [
          'Temporary Block or Municipality',
          'Permanent Block or Municipality',
          'Office Block or Municipality',
        ],
        block_muni_temp_id: '',
        block_muni_perm_id: '',
        block_muni_off_id: '',
        epic: '',
        part_no: '',
        sl_no: '',
        assembly_labels: [
          'Temporary Assembly Constituency',
          'Permanent Assembly Constituency',
          'Office Assembly Constituency',
        ],
        assembly_temp_id: '',
        assembly_perm_id: '',
        assembly_off_id: '',
        branch_ifsc: '',
        bank_account_no: '',
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        disable_save: false,
        personnel_form: 1,
      }
    },
    created(){
      this.personnel_id=this.$route.params.id
      this.initialize()
    },
    mounted () {
      //this.$validator.localize('en', this.dictionary)
    },
    methods: {
      initialize () {

        axios.get('/personnel/'+this.personnel_id,{
          id: this.personnel_id
        })
        .then((response, data) => { console.log(data)
        response.data.forEach(item => {
          this.office_id= item.office_id,
          this.officer_name= item.name,
          this.designation= item.designation,
          this.aadhaar= item.aadhaar,
          this.dob= item.dob,
          this.gender= item.gender,
          this.qualification_id= item.qualification_id,
          this.language_id= item.language_id,
          this.scale= item.scale,
          this.basic_pay= item.basic_pay,
          this.grade_pay= item.grade_pay,
          this.emp_group= item.emp_group,
          this.working_status= item.working_status,
          this.gender= item.gender,
          this.present_address= item.present_address,
          this.permanent_address= item.permanent_address,
          this.email= item.email,
          this.phone= item.phone,
          this.mobile= item.mobile,
          this.block_muni_temp_id= item.block_muni_temp_id,
          this.block_muni_perm_id= item.block_muni_perm_id,
          this.block_muni_off_id= item.block_muni_off_id,
          this.epic= item.epic,
          this.part_no= item.part_no,
          this.sl_no= item.sl_no,
          this.assembly_temp_id= item.assembly_temp_id,
          this.assembly_perm_id= item.assembly_perm_id,
          this.assembly_off_id= item.assembly_off_id,
          this.branch_ifsc= item.branch_ifsc,
          this.bank_account_no= item.bank_account_no
          })
        })
        .catch(error => {
          console.log(error)
        })
      },
      validatePersonnel(){
        this.disable_save = true
        this.$validator.validate()
          .then(result => {
            result ? this.savePersonnel() : this.showError()
            this.disable_save = false
          })
      },
      showError(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Error Occurred!!!'
        this.snackbar =true
      },
      savePersonnel(){
        axios.post('/personnel/update',{
          id:this.personnel_id,
          office_id: this.office_id,
          officer_name: this.officer_name,
          designation: this.designation,
          aadhaar: this.aadhaar,
          dob: this.dob,
          gender: this.gender,
          qualification_id: this.qualification_id,
          language_id: this.language_id,
          scale: this.scale,
          basic_pay: this.basic_pay,
          grade_pay: this.grade_pay,
          emp_group: this.emp_group,
          working_status: this.working_status,
          gender: this.gender,
          present_address: this.present_address,
          permanent_address: this.permanent_address,
          email: this.email,
          phone: this.phone,
          mobile: this.mobile,
          block_muni_temp_id: this.block_muni_temp_id,
          block_muni_perm_id: this.block_muni_perm_id,
          block_muni_off_id: this.block_muni_off_id,
          epic: this.epic,
          part_no: this.part_no,
          sl_no: this.sl_no,
          assembly_temp_id: this.assembly_temp_id,
          assembly_perm_id: this.assembly_perm_id,
          assembly_off_id: this.assembly_off_id,
          branch_ifsc: this.branch_ifsc,
          bank_account_no: this.bank_account_no,
        })
        .then(response => {
          //this.$refs.form.reset()
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = 'Personnel Updated Successfully with code - '+response.data
          this.snackbar =true
        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Error Occurred!!! '+error
          this.snackbar =true
        })
      }
    },
    computed: {

    }

  }
</script>
