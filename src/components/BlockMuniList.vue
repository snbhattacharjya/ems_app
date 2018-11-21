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

  created(){
    axios.get('/blockmunis')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.id+'-'+item.name.toUpperCase()
          this.block_munis.push(item)

        })
        this.block_munis.push({name:"OTHER",id:"999901"})
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
