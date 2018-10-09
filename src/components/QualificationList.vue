<template>
    <v-select
      :items="qualifications"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Qualification"
      :error-messages="error"
      @input="$emit('input',$event)"
      autocomplete
      :search-input.sync="searchInput"
    >
    </v-select>
</template>

<script>
export default {
  name: 'QualificationList',
  props: {
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
      qualifications: [],
      searchInput:''
    }
  },

  methods:{

  },

  created(){
    axios.get('/qualifications')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.qualifications.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
