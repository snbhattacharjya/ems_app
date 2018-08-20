<template>
  <div class="form__input">
    <v-select
      :items="subdivisions"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Subdivision"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>

  </div>
</template>

<script>
export default {
  name: 'SubdivisionList',
  props: {
    error: {
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
