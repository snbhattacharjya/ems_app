<template>
    <v-select
      :items="block_munis"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      :label="label ? label : 'Block or Municipality'"
      :error-messages="error"
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
    }
  },

  methods:{

  },

  created(){
    axios.get('/blockmunis')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.block_munis.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
