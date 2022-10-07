<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories:</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
    <h4> {{count }}</h4>
    <input type="number" v-model.number='incrementBy'/>
    <button @click='incrementCount'>Increase</button>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      incrementBy: 0
    }
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength
    },
  ...mapState(['user', 'count', 'categories'])
  },
  methods: {
    incrementCount() {
      this.$store.dispatch('updateCount', this.incrementBy)
    }
  }
}
</script>

<style>

</style>