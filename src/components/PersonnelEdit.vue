<template>
<v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12 mb-5">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Edit Personnel</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <template v-if="this.getuser.level != 10">
                <office-list
                  v-model="office_id"
                  v-validate="'required'"
                  :error-messages="errors.collect('office_id')"
                  data-vv-name="office_id"
                  :selected="office_id"
                  :disabled=true
                ></office-list>
              </template>
              <v-stepper v-model="personnel_form" vertical>
                <v-stepper-step :complete="personnel_form > 1" step="1" editable>
                  Personal Details
                  <small class="red--text">(*) Fields are mandatory</small>
                </v-stepper-step>

                <v-stepper-content step="1">

                <v-text-field
                  prepend-icon="person"
                  name="officer_name"
                  label="Officer Name(*)"
                  type="text"
                  counter
                  maxlength="50"
                  v-model="officer_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('officer_name')"
                  data-vv-name="officer_name"
                ></v-text-field>

                <v-text-field
                  prepend-icon="account_box"
                  name="designation"
                  label="Officer Designation(*)"
                  type="text"
                  v-model="designation"
                  counter
                  maxlength="50"
                  v-validate="'required'"
                  :error-messages="errors.collect('designation')"
                  data-vv-name="designation"
                ></v-text-field>

                <!-- <v-text-field
                  prepend-icon="fingerprint"
                  name="aadhaar"
                  label="Officer Aadhaar No (optional)"
                  type="text"
                  v-model="aadhaar"

                  :error-messages="errors.collect('aadhaar')"
                  data-vv-name="aadhaar"
                ></v-text-field> -->

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
                    label="Date of Birth(*)"
                    type="text"
                    v-model="dob"
                    v-validate="'required'"
                    :error-messages="errors.collect('dob')"
                    data-vv-name="dob"
                  ></v-text-field>
                  <v-date-picker v-model="dob"
                  min="1950-01-01"
                  :max="moment().subtract(18,'years').format('YYYY-MM-DD')"
                  @input="$refs.dob_menu.save(dob)"
                  ></v-date-picker>
                </v-menu>

                <v-select
                  :items="genders"
                  item-text= "name"
                  item-value= "id"
                  prepend-icon="list"
                  label="Gender(*)"
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
                  :selected="qualification_id"
                ></qualification-list>

                <language-list
                  v-model="language_id"
                  v-validate="'required'"
                  data-vv-name="language_id"
                  :error="errors.collect('language_id')"
                  :selected="language_id"
                ></language-list>

                  <remark-list
                  v-model="remark_id"
                  v-validate="'required'"
                  data-vv-name="remark_id"
                  :error="errors.collect('remark_id')"
                  :selected="remark_id"
                  :remark_comment="remark_comment"
                ></remark-list>
                <v-text-field v-if="this.remark_id === '13'"
                  prepend-icon="feedback"
                  name="remark_comment"
                  label="Type Reasone (Maximum 128 charecter)"
                  type="text"
                  counter
                  maxlength="128"
                  v-model="remark_comment"
                  v-validate="'required|max:128'"
                  :error-messages="errors.collect('remark_comment')"
                  data-vv-name="remark_comment"

                ></v-text-field>

                  <v-btn color="primary" @click="personnel_form = 2">Continue</v-btn>

                </v-stepper-content>

                <v-stepper-step :complete="personnel_form > 2" step="2" editable>Salary Details
                  <small class="red--text">(*) Fields are mandatory</small>
                </v-stepper-step>

                <v-stepper-content step="2">
                  <v-text-field
                    prepend-icon="grade"
                    name="scale"
                    label="Pay Scale(*)"
                    type="text"
                    v-model="scale"
                    maxlength=15
                    v-validate="'required'"
                    :error-messages="errors.collect('scale')"
                    data-vv-name="scale"
                    hint="Please provide Pay Scale like 9000-40500 without any other charecter"
                    persistent-hint
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="stars"
                    name="basic_pay"
                    label="Basic Pay(*)"
                    type="text"
                    v-model="basic_pay"
                    maxlength=7
                    v-validate="'required'"
                    :error-messages="errors.collect('basic_pay')"
                    data-vv-name="basic_pay"
                  ></v-text-field>

                  <v-text-field v-show="this.show_grade"
                    prepend-icon="how_to_reg"
                    name="grade_pay"
                    label="Grade Pay(*)"
                    type="text"
                    maxlength=7
                    v-model="grade_pay"
                    v-validate="'required'"
                    :error-messages="errors.collect('grade_pay')"
                    data-vv-name="grade_pay"
                  ></v-text-field>
                  <v-select v-show="this.show_level"
                    :items="pay_levels"
                    prepend-icon="list"
                    label="Pay Level(*)"
                    v-model="pay_level"
                    v-validate="'required'"
                    data-vv-name="pay_level"
                    :error-messages="errors.collect('pay_level')"
                    :selected="this.pay_level"
                  >
                  </v-select>


                  <v-select
                    :items="emp_groups"
                    prepend-icon="list"
                    label="Employee Group(*)"
                    v-model="emp_group"
                    v-validate="'required'"
                    data-vv-name="emp_group"
                    :error-messages="errors.collect('emp_group')"
                  >
                  </v-select>

                  <v-select
                    :items="working_statuses"
                    prepend-icon="list"
                    label="Working Status(*)"
                    v-model="working_status"
                    v-validate="'required'"
                    data-vv-name="working_status"
                    :error-messages="errors.collect('working_status')"
                  >
                  </v-select>

                  <v-btn color="primary" @click="personnel_form = 3">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="personnel_form > 3" step="3" editable>Address Details
                  <small class="red--text">(*) Fields are mandatory</small>
                </v-stepper-step>

                <v-stepper-content step="3">
                  <v-textarea
                    prepend-icon="location_on"
                    name="present_address"
                    label="Present Address(*)"
                    type="text"
                    v-model="present_address"
                    counter
                    maxlength="100"
                    v-validate="'required'"
                    :error-messages="errors.collect('present_address')"
                    data-vv-name="present_address"
                  ></v-textarea>
<v-switch
      label="Permanent Address is same as above"
      v-model="address" @change="copy_address" class="ml-3"
    ></v-switch>
                  <v-textarea
                    prepend-icon="account_balance"
                    name="permanent_address"
                    label="Permanent Address(*)"
                    type="text"
                    v-model="permanent_address"
                    counter
                    maxlength="100"
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
                    counter
                    maxlength="50"
                    v-validate="'email'"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="phone"
                    name="phone"
                    label="Phone(with STD)"
                    type="text"
                    v-model="phone"
                    counter
                    maxlength="15"
                    v-validate="'numeric|not_zero|landline'"
                    :error-messages="errors.collect('phone')"
                    data-vv-name="phone"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="smartphone"
                    name="mobile"
                    label="Mobile(*)"
                    type="text"
                    v-model="mobile"
                    counter
                    maxlength="10"
                    v-validate="'required|numeric|digits:10|mobile'"
                    :error-messages="errors.collect('mobile')"
                    data-vv-name="mobile"
                  ></v-text-field>

                  <block-muni-list
                    :label="block_muni_labels[0]"
                    v-model="block_muni_temp_id"
                    data-vv-name="block_muni_temp_id"
                    :error="errors.collect('block_muni_temp_id')"
                    :selected="block_muni_temp_id"
                  ></block-muni-list>

                  <block-muni-list
                    :label="block_muni_labels[1]"
                    v-model="block_muni_perm_id"
                    data-vv-name="block_muni_perm_id"
                    :error="errors.collect('block_muni_perm_id')"
                    :selected="block_muni_perm_id"
                  ></block-muni-list>

                  <block-muni-list
                    :label="block_muni_labels[2]"
                    v-model="block_muni_off_id"
                    data-vv-name="block_muni_off_id"
                    :error="errors.collect('block_muni_off_id')"
                    :selected="block_muni_off_id"
                  ></block-muni-list>

                  <v-btn color="primary" @click="personnel_form = 4">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step step="4" :complete="personnel_form > 4" editable>Electoral Details
                  <small class="red--text">(*) Fields are mandatory</small>
                </v-stepper-step>
                <v-stepper-content step="4">
                  <v-text-field
                    prepend-icon="perm_identity"
                    name="epic"
                    label="EPIC No(*)"
                    type="text"
                    maxlength=20
                    v-model="epic"
                    v-validate="'required|regex:^[A-Z0-9\/]+$'"
                    :error-messages="errors.collect('epic')"
                    data-vv-name="epic"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="receipt"
                    name="part_no"
                    label="Part no"
                    type="text"
                    v-model="part_no"
                    maxlength="4"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('part_no')"
                    data-vv-name="part_no"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="toc"
                    name="sl_no"
                    label="Serial No"
                    type="text"
                    v-model="sl_no"
                    maxlength="4"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('sl_no')"
                    data-vv-name="sl_no"
                  ></v-text-field>

                  <assembly-list
                    :label="assembly_labels[0]"
                    v-model="assembly_temp_id"
                    v-validate="'required'"
                    data-vv-name="assembly_temp_id"
                    :error="errors.collect('assembly_temp_id')"
                    :selected="assembly_temp_id"
                    :mode="assembly_modes[0]"
                  ></assembly-list>

                  <assembly-list
                    :label="assembly_labels[1]"
                    v-model="assembly_perm_id"
                    v-validate="'required'"
                    data-vv-name="assembly_perm_id"
                    :error="errors.collect('assembly_perm_id')"
                    :selected="assembly_perm_id"
                    :mode="assembly_modes[0]"
                  ></assembly-list>

                  <assembly-list
                    :label="assembly_labels[2]"
                    v-model="assembly_off_id"
                    v-validate="'required'"
                    data-vv-name="assembly_off_id"
                    :error="errors.collect('assembly_off_id')"
                    :selected="assembly_off_id"
                    :mode="assembly_modes[1]"
                  ></assembly-list>
                  <v-btn color="primary" @click="personnel_form = 5">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step step="5" editable>Bank Details
                  <small class="red--text">(*) Fields are mandatory</small>
                </v-stepper-step>
                <v-stepper-content step="5">
                 <v-switch label="Post Office Account" v-model="post_office" @change="enable_post_offie" class="ml-3"></v-switch>
                  <v-text-field
                    prepend-icon="account_balance_wallet"
                    name="branch_ifsc"
                    label="CIF No(*)"
                    type="text"
                    counter
                    maxlength=11
                    v-model="branch_ifsc"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('branch_ifsc')"
                    data-vv-name="branch_ifsc"
                    v-if="this.post_office"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="account_balance_wallet"
                    name="branch_ifsc"
                    label="IFSC No(*)"
                    type="text"
                    counter
                    maxlength=11
                    v-model="branch_ifsc"
                    v-validate="'required|alpha_num|length:11|regex:^[A-Z]{4}0[A-Z0-9]{6}$'"
                    :error-messages="errors.collect('branch_ifsc')"
                    data-vv-name="branch_ifsc"
                    @blur="ifsc"
                    :suffix="ifsc_hint"
                     v-if="!this.post_office"
                  ></v-text-field>
                  <small class="red--text">N.B. Please provide correct IFSC otherwise Election payment will be held and office will be responsible for that.</small>

                  <v-text-field
                    prepend-icon="account_balance"
                    name="bank_account_no"
                    ref="bank_account_no"
                    label="Bank Account no(*)"
                    :type="type_text"
                    v-model="bank_account_no"
                    counter
                    maxlength="16"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('bank_account_no')"
                    data-vv-name="bank_account_no"
                    @blur="changetypeblur"
                    @focus="changetypefocus"
                    :suffix="acc_hint"
                    onCopy="return false"
                    onDrag="return false"
                    onDrop="return false"
                    onPaste="return false"
                  ></v-text-field>

                  <v-text-field v-if="confim_acc"
                    prepend-icon="account_balance"
                    name="confirm_bank_account_no"
                    label="Confirm Bank Account No(*)"
                    type="password"
                    v-model="confirm_bank_account_no"
                    counter
                    maxlength="16"
                    v-validate="'required|numeric|confirmed:bank_account_no'"
                    :error-messages="errors.collect('confirm_bank_account_no')"
                    data-vv-name="confirm_bank_account_no"
                    onCopy="return false"
                    onDrag="return false"
                    onDrop="return false"
                    onPaste="return false"

                  ></v-text-field>



                </v-stepper-content>

              </v-stepper>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-flex v-if="this.server_errors != ''">
              <ol style="color:red;">
                <li v-for="error in server_errors" :prop="error" :key="error.id">{{error}}</li>

              </ol>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="throttledMethod()" v-if="disable_save" :loading="loading">Save</v-btn>
          </v-card-actions>
          <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
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
import RemarkList from '@/components/RemarkList'
import _ from 'lodash'
  export default{
    name: 'PersonnelEdit',
    components: {
      OfficeList,
      QualificationList,
      LanguageList,
      BlockMuniList,
      AssemblyList,
      RemarkList,
    },
    $_veeValidate: {
      validator: 'new'
    },
    data (){
      return {
        loading:false,
        valid: true,
        snackbar: false,
        personnel_id: '',
        personnel_id_fetched:'',
        office_id: '',
        officer_name: '',
        designation: '',
        aadhaar: '',
        dob: '',
        dob_menu: '',
        gender: '',
        qualification_id: '',
        ifsc_hint:'',
        acc_hint:'',
        language_id: '',
        remark_id: '',
        remark_comment:'',
        scale: '',
        basic_pay: 0,
        grade_pay: '',
        show_grade:false,
        show_level:false,
        type_text:'text',
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
        pay_levels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
        ],
        pay_level:'',
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
        address:false,
        present_address: '',
        permanent_address: '',
        email: '',
        phone: '',
        mobile: '',
        block_muni_labels: [
          'Present Block or Municipality',
          'Permanent Block or Municipality',
          'Office Block or Municipality',
        ],
        block_muni_temp_id: 0,
        block_muni_perm_id: 0,
        block_muni_off_id: 0,
        epic: '',
        part_no: 0,
        sl_no: 0,
        assembly_labels: [
          'Present Assembly Constituency(*)',
          'Permanent Assembly Constituency(*)',
          'Office Assembly Constituency(*)',
        ],
        assembly_modes: [
          'all',
          'default'
        ],
        assembly_temp_id: '',
        assembly_perm_id: '',
        assembly_off_id: '',
        branch_ifsc: '',
        bank_account_no_stored:'',
        bank_account_no: '',
        confim_acc:false,
        show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
        disable_save: true,
        post_office:false,
        personnel_form: 1,
        server_errors:[],
       dictionary: {
          custom: {
            office_id:{
              required: "Please select One office"
            },
            officer_name: {
              required: "Officer Name can not be empty"
            },
            designation: {
              required: "Designation is required"
            },
            dob: {
              required: "Date of Birth is required"
            },
            gender: {
              required: "Please select gender"
            },
            qualification_id: {
              required: "Please select Qualification"
            },
            language_id: {
              required: "Please selct one Language"
            },
            remark_id: {
              required: "Please select one Remark"
            },
            scale: {
              required: "Pay Scale is required"
            },
            grade_pay: {
              required: "Grade Pay is required"
            },
            basic_pay: {
              required: "Basic Pay is required"
            },
            pay_level: {
              required: "Pay Level is required"
            },
            emp_group: {
              required: "Please select one group"
            },
            working_status: {
              required: "Please select working status"
            },
            present_address: {
              required: "Present address is required"
            },
            permanent_address: {
              required: "Permanent address is required"
            },
            phone:{
              numeric:"Only Number are allowed"
            },
            mobile: {
              required: "Please provide Mobile number",
              numeric: "Only Number are allowed",
              digits: "Mobile number must be of 10 digits"
            },
            email:{
              email: "Email is invalid"
            },
            epic: {
              required: "Please provide EPIC number"
            },
            part_no:{
              numeric: "Only Number are allowed"
            },
            sl_no:{
              numeric: "Only Number are allowed"
            },
            assembly_temp_id: {
              required: "Please select Present Assembly Constituency"
            },
            assembly_perm_id: {
              required: "Please select Permanent Assembly Constituency"
            },
            assembly_off_id: {
              required: "Please select Office Assembly Constituency"
            },
            branch_ifsc: {
              required: "Please provide IFSC number",
              alpha_num: "No Special character allowed",
              length: "Bank IFSC Code must be of 11 character",
              regex: "Invalid IFSC code"
            },
            bank_account_no: {
              required: "Please provide Bank Account number",
              numeric: "Please provide number only"
            },
            confirm_bank_account_no: {
              required: "Please type Bank Accout number again",
              numeric: "Please provide number only",
              confirmed: "Bank Account number does not match"
            }
          }
        }
       }
    },
    created(){
      this.personnel_id=this.$route.params.id
      this.initialize()
      this.ifsc()
    },
    computed: {
      getuser(){
          return this.$store.getters.getUser
       },
       getpersonnel:function(){
         return this.$store.getters.getpersonnel
       }
    },

    mounted() {
    this.$validator.localize("en", this.dictionary)

       this.$validator.extend('mobile', {
        getMessage: field => `Invalid mobile number`,
        validate: value => {
            if(value.substring(0,1)>5 && value.substring(0,1)<=9)
            {
             return true
            }
            else{
              return false
            }
        }
       })
       this.$validator.extend('not_zero', {
        getMessage: field => `Zero not allowed`,
        validate: value => {
            var v = parseInt(value)
            return v>1
        }
       })
       this.$validator.extend('landline', {
        getMessage: field => `Invalid Phone number`,
        validate: value => {
            var strongRegex = new RegExp("([0-9])\\1{4}");
            if(strongRegex.test(value)==true){return false}
            else{return true}

        }
       })
  },
  watch:{
    bank_account_no:function(val){
        if(this.bank_account_no_stored != val){
          this.checkaccount()
          this.confim_acc=true
        }
        else if(this.bank_account_no_stored == val){
          this.confim_acc=false
        }
    },
    office_id:function(val){
        this.getlevel(val)
      }
  },
    methods: {

      copy_address:function(){
        if(this.address == true){
          this.permanent_address = this.present_address
        }else{

        }
      },
      changetypeblur:function(){
          if(this.type_text === 'text'){this.type_text = 'password'}
      },
      changetypefocus:function(){
         if(this.type_text === 'password'){this.type_text = 'text'}
      },

      getlevel(val){
        if(val != ''){
          axios.get('/officetype/'+val,{

          })
          .then((response, data) => {
            if(response.data !='')
           {
              this.officelevel=response.data['officeType'][0]
              if(this.officelevel == '01'){
               this.show_grade=false
               this.show_level=true
               this.grade_pay=0
               }
               else{
               this.show_grade=true
               this.show_level=false
               this.pay_level=0
               }
           }

          })
        }

      },
      ifsc:function(){
        if(this.branch_ifsc != ''){
          var strongRegex = new RegExp("[A-Z]{4}0[A-Z0-9]{6}$");
            if(strongRegex.test(this.branch_ifsc)==true){
          this.ifsc_hint=''
          axios.get('/ifsc/'+this.branch_ifsc,{
          branch_ifsc: this.branch_ifsc
          })
          .then((response, data) => {
            if(response.data == 'Your Bank not in WB'){this.ifsc_hint='Either IFSC Code you entered is wrong or bank is not listed yet'}
            else{
              response.data.forEach(item => {
                this.ifsc_hint= item.bank+'('+item.branch+')'
              })
            }

          })
          }
        }
        else{this.ifsc_hint='' }
      },
      checkaccount:function(){
        if(this.bank_account_no != ''){
          this.disable_save=false
          this.acc_hint=''
          axios.get('/accountcheck/'+this.bank_account_no,{

          })
          .then((response, data) => {
            if(response.data['msg']=='Account Exists'){
              this.acc_hint='Bank Account Exists'
              this.disable_save=false
              }
            else if(response.data.msg=='Not Found'){
              this.acc_hint=''
              this.disable_save=true
            }

          })
        }
      },
      initialize () {
        this.loading=true
        axios.get('/personnel/'+this.personnel_id,{
          id: this.personnel_id
        })
        .then((response, data) => {
        response.data.forEach(item => {
          this.personnel_id_fetched=item.id,
          this.office_id= item.office_id,
          this.officer_name= item.name,
          this.designation= item.designation,
          this.aadhaar= item.aadhaar,
          this.dob= item.dob,
          this.qualification_id= item.qualification_id,
          this.language_id= item.language_id,
          this.remark_id= item.remark_id,
          this.remark_comment= item.remark_reason,
          this.scale= item.scale,
          this.basic_pay= item.basic_pay,
          this.grade_pay= item.grade_pay,
          this.pay_level= item.pay_level,
          this.emp_group= item.emp_group,
          this.working_status= item.working_status,
          this.gender= item.gender,
          this.present_address= item.present_address,
          this.permanent_address= item.permanent_address,
          this.address= this.permanent_address == this.present_address ? true : false,
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
          this.assembly_temp_selected = item.assembly_temp_id,
          this.assembly_perm_id= item.assembly_perm_id,
          this.assembly_off_id= item.assembly_off_id,
          this.post_office=item.post_office_account == 1 ? true : false,
          this.branch_ifsc= item.branch_ifsc,
          this.bank_account_no= item.bank_account_no
          this.bank_account_no_stored= item.bank_account_no
          this.ifsc()
          })
        })
        .catch(error => {
          console.log(error)
        })
        this.loading=false
      },
      throttledMethod: _.throttle(function()  {
      this.validatePersonnel()
       }, 10000),
      validatePersonnel(){
        this.disable_save = false
        this.loading=true
        this.$validator.validate()
          .then(result => {
            result ? this.savePersonnel() : this.showError('invalid')
            this.disable_save = true
          })
          this.loading=false
      },
      showError(txt){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        if(txt === 'invalid'){this.message_text = 'Validation failed. Pleae check all fields again'}
        else{this.message_text = 'Server Error Occured !'}
        this.snackbar =true
      },
      savePersonnel(){
        this.disable_save=false
        this.loading=true
        var hash='';
        var bcrypt = require('bcryptjs')
        var hash = bcrypt.hashSync(this.personnel_id_fetched, 8)
        //console.log('enc- '+hash)
         axios.post('/personnel/update',{
          token:hash,
          office_id: this.office_id,
          officer_name: this.officer_name,
          designation: this.designation,
          aadhaar: this.aadhaar,
          dob: this.dob,
          qualification_id: this.qualification_id,
          language_id: this.language_id,
          remark_id:this.remark_id,
          remark_reason: this.remark_comment,
          scale: this.scale,
          basic_pay: this.basic_pay,
          grade_pay: this.grade_pay ? this.grade_pay : '0',
          pay_level: this.pay_level? this.pay_level : '0',
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
          post_office_account:this.post_office==true ? 1:0,
          branch_ifsc: this.branch_ifsc,
          bank_account_no: this.bank_account_no,
        })
        .then(response => {

          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = 'Personnel Updated Successfully with code - '+response.data
          window.sessionStorage.setItem('is_personnel_created', 'Personnel Updated Successfully with code - '+response.data)
          window.sessionStorage.setItem('office_c',this.office_id)

          this.snackbar =false
          this.disable_save=false
          setTimeout(() => {
                  this.$router.replace("/personnel/list")
                },1000)

        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = error.response.data.message
          this.server_errors=error.response.data.errors
          this.snackbar =true
          this.loading=false
        })


      }
    }


  }
</script>
