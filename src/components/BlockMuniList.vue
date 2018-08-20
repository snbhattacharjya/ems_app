<template>
    <v-select
      :items="block_munis"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Block or Municipality"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'BlockMuniList',
  props: {
    error: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      block_munis: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/blockmunis')
      .then((response, data) => {
       response.data.forEach(item => {
          this.block_munis.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
