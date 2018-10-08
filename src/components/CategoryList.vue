<template>
    <v-select
      :itPPMS="categories"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Office Category"
      :error-messages="error"
      @input="$emit('input',$event)"
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
    }
  },

  methods:{

  },

  created(){
    axios.get('/categories')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.categories.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
