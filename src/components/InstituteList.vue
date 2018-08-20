<template>
    <v-select
      :items="institutes"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Office Institute"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'InstituteList',
  props: {
    error: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      institutes: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/institutes')
      .then((response, data) => {
       response.data.forEach(item => {
          this.institutes.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
