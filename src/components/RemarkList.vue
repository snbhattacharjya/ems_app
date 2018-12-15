<template>
<div>
    <v-select
      :items="remarks"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Remarks(*)"
      :error-messages="error"
      @change="showcomment"
      @input="$emit('input',$event)"
    >
    </v-select>

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

    if(this.getremark==''){
    axios.get('/remarks')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.remarks.push(item)
        })
        this.$store.dispatch('storeremark',this.remarks)
      })
      .catch(error => {
        console.log(error)
      })
    }else{
      this.remarks=this.getremark
    }
  },
  computed:{
   getremark:function(){
     return this.$store.getters.getremark
   }
  }
}
</script>
