<template>

  <div v-text="getUserLevel"></div>


</template>

<script>
import district from '@/components/Dashboard/District'
import office from '@/components/Dashboard/Office'

export default {
  name: 'Dashboard',
  data () {
    return {
      user_level: 0
    }
  },
  computed: {
    getUserLevel() {
       return this.$store.getters.getUserLevel
    }
  },
  components: {
    district,
    office
  }

}
</script>

