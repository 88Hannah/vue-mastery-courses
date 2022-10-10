<template>
  <div>
    <h1>Event Listing</h1>

    <event-card v-for="event in events" :key="event.id" :event="event"/>

    <template v-if="page != 1">
      <router-link 
        :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Previous
      </router-link>
    </template>

    <template v-if="isNextPage">
      <router-link 
        :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
        Next
      </router-link>
    </template>

  </div>
</template>



<script>
import EventCard from '../components/EventCard.vue'
import { mapState } from 'vuex'

export default {

  data(){
    return {
      perPage: 3
    }
  },
  
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage, 
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    isNextPage() {
      return this.page * this.perPage < this.totalEvents ? true : false
    },
    ...mapState(['events', 'totalEvents'])
  }

}
</script>

