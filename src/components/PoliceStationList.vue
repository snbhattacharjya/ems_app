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

  beforeUpdate(){
    this.$store.dispatch('storepolice')
    this.police_stations=this.getpolice

  },
  computed:{
    getpolice:function(){
     return this.$store.getters.getpolice
    },

  }
}
</script>
