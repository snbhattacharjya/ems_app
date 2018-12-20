<template>
    <v-select
      :items="block_munis"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      :label="label ? label : 'Block or Municipality(*)'"
      :error-messages="error"
      autocomplete
      :search-input.sync="searchInput"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'BlockMuniList',
  props: {
    label: {
      type: String,
      required: false
    },
    error: {
      type: Array,
      required: false
    },
    selected: {
      type: String,
      required: false
    }
  },
  data(){
    return {
      block_munis: [],
      searchInput: ''
    }
  },

  methods:{

  },
  watch: {

  },
  beforeUpdate(){
    this.$store.dispatch('storeblockmuni')
    this.block_munis=this.getblock
  },
  created(){


  },
  computed:{
    getblock:function(){
     return this.$store.getters.getblockmuni
    },

  }
}
</script>
