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
       autocomplete
      :search-input.sync="searchInput"
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
      searchInput:''
    }
  },

  methods:{

  },

  created(){
    axios.get('/policestations')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.police_stations.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
