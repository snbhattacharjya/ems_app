<template>
    <v-select
      :items="assemblies"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      :label="label ? label : 'Assembly Constituency(*)'"
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
    },
    mode: {
      type: String,
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
    init:function(){
      let url = this.mode == 'all' ? '/allassemblies' : '/assemblies'
    axios.get(url)
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.id+'-'+item.name.toUpperCase()
          this.assemblies.push(item)

        })
        this.assemblies.push({name:"OTHER",id:"999"})
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  created(){
    this.init()
  }
}
</script>
