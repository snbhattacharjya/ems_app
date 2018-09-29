<template>
    <v-select
      :items="remarks"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Remarks"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'RemaksList',
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
      remarks: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/remarks')
      .then((response, data) => {
       response.data.forEach(item => {
          this.remarks.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
