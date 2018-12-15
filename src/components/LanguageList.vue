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

  created(){
    if(this.getlanguage==''){
    axios.get('/languages')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.languages.push(item)
        })
        this.$store.dispatch('storelanguage',this.languages)
      })
      .catch(error => {
        console.log(error)
      })
    }else{
      this.languages=this.getlanguage
    }
  },
  computed:{
    getlanguage:function(){
     return this.$store.getters.getlanguage
    },

  }
}
</script>
