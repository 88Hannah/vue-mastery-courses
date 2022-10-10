import Vue from "vue";
import Vuex from "vuex";
import EventServices from '../services/EventServices';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Hannah Sangar'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [],
    totalEvents: 0,
    currentEvent: {}
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events){
      state.events = events
    },
    SET_TOTAL(state, totalEvents) {
      state.totalEvents = totalEvents
    },
    SET_EVENT_INFO(state, currentEvent) {
      state.currentEvent = currentEvent
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventServices.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventServices.getEvents(perPage, page)
      .then(response => {
        commit('SET_TOTAL', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
    },
    getEventInfo({ commit, getters }, id) {
      var currentEvent = getters.getEventById(id)

      if(currentEvent) {
        commit('SET_EVENT_INFO', currentEvent)
      } else {
        EventServices.getEvent(id)
        .then(response => {
          commit('SET_EVENT_INFO', response.data)
          this.event = response.data
        })
        .catch(error => {
          console.log('There was an error: ' + error.response)
        })
      }
    }
  },
  modules: {},
});
