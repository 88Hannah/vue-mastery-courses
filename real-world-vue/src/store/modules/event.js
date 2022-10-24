import EventServices from '../../services/EventServices'

export const namespaced = true

export const state = {
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [],
    totalEvents: 0,
    currentEvent: {}
}

export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}

export const mutations = {
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
}

export const actions = {
    createEvent({ commit, dispatch }, event) {
        return EventServices.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
            const notification = {
                type: 'success',
                message: 'Your event has been created!'
            }
            dispatch('notifications/add', notification, {root: true})
        })
        .catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem creating your event: ' + error.message
            }
            dispatch('notifications/add', notification, {root: true})
            throw error
        })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
        EventServices.getEvents(perPage, page)
        .then(response => {
            commit('SET_TOTAL', response.headers['x-total-count'])
            commit('SET_EVENTS', response.data)
        })
        .catch(error => {
            const notification = {
                type: 'error',
                message: 'There was a problem fetching events: ' + error.message
            }
            dispatch('notifications/add', notification, {root: true})

        })
    },
    getEventInfo({ commit, dispatch, getters }, id) {
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
                const notification = {
                    type: 'error',
                    message: 'There was a problem getting the event information: ' + error.message
                }
                dispatch('notifications/add', notification, {root: true})
    
            })
        }
    }
}