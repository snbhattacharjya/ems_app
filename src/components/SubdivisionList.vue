<template>
    <v-select
      :items="subdivisions"
      v-model="selected_item"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Subdivision"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'SubdivisionList',
  props: {
    error: {
      type: Array,
      required: false
    },
    selected_item: {
      type: String,
      required: false
    }
  },
  data(){
    return {
      subdivisions: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/subdivisions')
      .then((response, data) => {
       response.data.forEach(item => {
          this.subdivisions.push(item)
        });

      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
