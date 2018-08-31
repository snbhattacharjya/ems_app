<template>
    <v-select
      :items="assemblies"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      :label="label ? label : 'Assembly Constituency'"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'AssemblyList',
  props: {
    selected: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    error: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      assemblies: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/assemblies')
      .then((response, data) => {
       response.data.forEach(item => {
          this.assemblies.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
