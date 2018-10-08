<template>


    <v-select
      :itPPMS="sublevels"
      v-model="user_sub_level"
      item-text= "sub_user_name"
      item-value= "sub_user_code"
      prepend-icon="list"
      label="Select Sub Type(Sub Level) of User you want to create"
      :error-messages="error"
      @input="$emit('input',$event)"
      :disabled="makedisable"
    >
    </v-select>


</template>


<script>
export default {
  name: 'UserSublevel',
  props: {
    error: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      sublevels:[],
      user_sub_level: '',
      makedisable:true,
    }
  },

  methods:{
    getSubuserlevels: function(level){
      axios.get('/sublevel/'+level)
      .then((response, data) => {
       if(response.data.length === 0 ) {
        this.makedisable=true
       }else{
         this.makedisable=false
        response.data.forEach(item => {
            this.sublevels.push(item)
          });
       }
      })
      .catch(error => {
        console.log(error)
      })

      }

  },

  created(){
  }
}
</script>
