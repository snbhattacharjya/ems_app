<template>
<div>
    <v-select
      :itPPMS="remarks"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Remarks"
      :error-messages="error"
      @input="showcomment"
    >
    </v-select>
     <v-text-field v-if="comment === true || selected === '13'"
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
</div>
</template>

<script>
export default {
  name: 'RemaksList',
  props: {
    error: {
      type: Array,
      required: false
    },
    selected: {
      type:String,
      required:false
    },
    remark_comment:{
      type:String,
      required:false
    },
  },
  data(){
    return {
      remarks: [],
      comment:false,
    }
  },

  methods:{
      showcomment:function(value){ //alert(this.remark_selected)
        if(value === '13'){this.comment=true}
        else{
           this.comment=false
           }
      }
  },

  created(){
    axios.get('/remarks')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.remarks.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
