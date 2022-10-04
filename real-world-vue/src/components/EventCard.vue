<template>
    <router-link class="event-link" :to="{ name: 'event-show', params: { id: '1' } }">
        <div class="event-card -shadow">
            <h4 class="title">{{ event.title }}</h4>
            <p class="eyebrow">{{ event.time }} on {{ event.date }}</p>
            <p>{{ event.attendees.length }} attending</p>
        </div>
    </router-link>
</template>

<script>
export default {

    data() {
        return {
            event: {
                title: "The Beach Cleanup",
                date: "28th Oct",
                time: "6:00pm",
                attendees: [
                    { id: '123abc', name: 'Hannah'},
                    { id: '456def', name: 'Rob'},
                ]
            }
        }
    }
    
}
</script>

<style scoped>
    .event-card {
      padding: 20px;
      margin-bottom: 24px;
      transition: all 0.2s linear;
      cursor: pointer;
    }
    .event-card:hover {
      transform: scale(1.01);
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }
    .event-card > .title {
      margin: 0;
    }
    
    .event-link {
      color: black;
      text-decoration: none;
      font-weight: 100;
    }
</style>