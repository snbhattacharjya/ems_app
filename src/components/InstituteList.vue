<template>
    <v-select
      :items="institutes"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Office Institute(*)"
      :error-messages="error"
      @input="$emit('input',$event)"
       autocomplete
      :search-input.sync="searchInput"
    >
    </v-select>
</template>

<script>
export default {
  name: 'InstituteList',
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
      institutes: [],
      searchInput:''
    }
  },

  methods:{

  },

  created(){
    axios.get('/institutes')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.institutes.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
