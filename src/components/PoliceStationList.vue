<template>
    <v-select
      :items="police_stations"
      v-model="selected"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Police Station(*)"
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
    if(this.getpolice!=''){
    axios.get('/policestations/all')
      .then((response, data) => {
       response.data.forEach(item => {
         item.name=item.name.toUpperCase()
          this.police_stations.push(item)
        })
        this.$store.dispatch('storepolice',this.police_stations)
      })
      .catch(error => {
        console.log(error)
      })
    }else{
      this.police_stations=this.getpolice
    }
  },
  computed:{
    getpolice:function(){
     return this.$store.getters.getpolice
    },

  }
}
</script>
