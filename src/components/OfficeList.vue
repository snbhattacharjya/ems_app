<template>
    <v-select
      :items="offices"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Select Office"
      :error-messages="error"
      @input="$emit('input',$event)"
       autocomplete
      :search-input.sync="searchInput"
    >

    </v-select>
</template>

<script>
export default {
  name: 'OfficeList',
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
      offices: [],
      selected:'',
      searchInput:''
    }
  },

  methods:{

  },

  created(){
    axios.get('/offices')
      .then((response, data) => {
       response.data.forEach(item => {
          this.offices.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
