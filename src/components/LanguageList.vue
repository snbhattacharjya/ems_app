<template>
    <v-select
      :items="languages"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Language known other than English(*)"
      :error-messages="error"
      @input="$emit('input',$event)"
      autocomplete
      :search-input.sync="searchInput"
    >
    </v-select>
</template>

<script>
export default {
  name: 'LanguageList',
  props: {
    error: {
      type: Array,
      required: false
    },
    selected: {
      type:Number,
      required:false
    }
  },
  data(){
    return {
      languages: [],
      searchInput:''
    }
  },

  methods:{

  },

  beforeUpdate(){
   this.$store.dispatch('storelanguage')
   this.languages=this.getlanguage

  },
  computed:{
    getlanguage:function(){
     return this.$store.getters.getlanguage
    },

  }
}
</script>
