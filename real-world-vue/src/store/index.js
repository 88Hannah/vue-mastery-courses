import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Hannah Sangar'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    count: 0
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneToDos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.todos.filter(todo => !todo.done).length
    }
  },
  mutations: {
    INCREMENT_COUNT: (state, value) => {
      state.count += value
    }
  },
  actions: {
    updateCount({ state, commit }, value) {
      if(state.user) {
        commit('INCREMENT_COUNT', value)
      }
    }
  },
  modules: {},
});
