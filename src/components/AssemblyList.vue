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

  },
  beforeUpdate(){
    this.mode == 'all' ? this.$store.dispatch('storeassemblyall'): this.$store.dispatch('storeassemblylocal')
    this.mode == 'all' ? this.assemblies=this.getassemblyall: this.assemblies=this.getassemblylocal
  },
  created(){


  },
  computed:{
    getassemblyall:function(){
     return this.$store.getters.getassemblyall
    },
    getassemblylocal:function(){
     return this.$store.getters.getassemblylocal
    },

  }
}
</script>
