import Vue from "vue";
import Vuex from "vuex";
import * as user from './modules/user'
import * as event from './modules/event'
import * as notifications from './modules/notifications'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notifications
  },
  state: {
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
  }
});
