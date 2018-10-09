<template>
    <v-select
      :items="assemblies"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      :label="label ? label : 'Assembly Constituency'"
      :error-messages="error"
      autocomplete
      :search-input.sync="searchInput"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'AssemblyList',
  props: {
    selected: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    error: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      assemblies: [],
      searchInput: ''
    }
  },

  methods:{

  },

  created(){
    axios.get('/assemblies')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.assemblies.push(item)
          this.block_munis.push({name:"OTHER",id:"999901"})
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
