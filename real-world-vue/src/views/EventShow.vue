<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ currentEvent.time }} on {{ currentEvent.date }}</span>
      <h1 class="title">{{ currentEvent.title }}</h1>
      <h5>Organized by {{ currentEvent.organizer ? currentEvent.organizer.name : '' }}</h5>
      <h5>Category: {{ currentEvent.category }}</h5>
    </div>
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>
    <address>{{ currentEvent.location }}</address>
    <h2>Event details</h2>
    <p>{{ currentEvent.description }}</p>
    <h2>Attendees
      <span class="badge -fill-gradient">{{ currentEvent.attendees ? currentEvent.attendees.length : 0 }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in currentEvent.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ["id"],

  created() {
    this.$store.dispatch('getEventInfo', this.id)
  },

  computed: mapState(['currentEvent'])
  


};
</script>

<style scoped>
  .location {
    margin-bottom: 0;
  }
  .location > .icon {
    margin-left: 10px;
  }
  .event-header > .title {
    margin: 0;
  }
  .list-group {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list-group > .list-item {
    padding: 1em 0;
    border-bottom: solid 1px #e5e5e5;
  }
</style>
