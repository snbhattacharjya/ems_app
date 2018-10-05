<template>
    <v-select
      :items="languages"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Language known other than English"
      :error-messages="error"
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
    }
  },

  methods:{

  },

  created(){
    axios.get('/languages')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.languages.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
