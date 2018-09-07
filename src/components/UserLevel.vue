<template>
  <div id="appRoot">
    <v-select
      :items="levels"
      item-text= "name"
      item-value= "user_type_code"
      prepend-icon="list"
      label="Select Type(Level) of User you want to create"
      :error-messages="error"
      @input="$emit('input',$event)"


    >
    </v-select>

  </div>

</template>




<script>
export default {
  name: 'UserLevel',
  props: {
    error: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      levels: [],
      user_level:'',

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
    axios.get('/creationlevel')
      .then((response, data) => {
       response.data.forEach(item => {
          this.levels.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
