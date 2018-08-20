<template>
    <v-select
      :items="languages"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Language known other than English"
      :error-messages="error"
      @input="$emit('input',$event)"
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
    }
  },
  data(){
    return {
      languages: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/languages')
      .then((response, data) => {
       response.data.forEach(item => {
          this.languages.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
