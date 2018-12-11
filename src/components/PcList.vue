<template>
    <v-select
      :items="pcs"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Parliamentary Constituency(*)"
      :error-messages="error"
      @input="$emit('input',$event)"
       autocomplete
      :search-input.sync="searchInput"
    >
    </v-select>
</template>

<script>
export default {
  name: 'PcList',
  props: {
    error: {
      type: Array,
      required: false
    },
    selected:{
      type:String,
      required:false
    }
  },
  data(){
    return {
      pcs: [],
      searchInput:''
    }
  },

  methods:{

  },

  created(){
    axios.get('/pcs')
      .then((response, data) => {
       response.data.forEach(item => {
          this.pcs.push(item)
          this.pcs.push({name:"OTHER",id:"99"})
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
