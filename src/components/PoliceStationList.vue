<template>
    <v-select
      :items="police_stations"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Police Station"
      :error-messages="error"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'PoliceStationList',
  props: {
    error: {
      type: Array,
      required: false
    },
    selected:{
      type:String,
      required:false
    }
  },
  data(){
    return {
      police_stations: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/policestations')
      .then((response, data) => {
       response.data.forEach(item => {
          this.police_stations.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
