<template>
    <v-select
      :items="categories"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Office Category(*)"
      :error-messages="error"
      @input="$emit('input',$event)"
       autocomplete
      :search-input.sync="searchInput"
    >
    </v-select>
</template>

<script>
export default {
  name: 'CategoryList',
  props: {
    error: {
      type: Array,
      required: false
    },
    selected:{
      type: String,
      required: false
    }
  },
  data(){
    return {
      categories: [],
      searchInput:''
    }
  },

  methods:{

  },

  beforeUpdate(){
   this.$store.dispatch('storecategory')
   this.categories=this.getcategory

  },
  computed:{
    getcategory:function(){
     return this.$store.getters.getcategory
    },

  }
}
</script>
