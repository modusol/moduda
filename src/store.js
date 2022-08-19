import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: require('./assets/sidebar/sidebar-1.jpg'),
    drawer: null,
    avatarImage: require('@/assets/avatar/male_man_person.svg'),
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
      if (payload === '') {
        state.barColor = 'rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)'
      } else {
        state.barColor = 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)'
      }
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_AVATAR_IMAGE (state, payload) {
      state.avatarImage = payload
    },
  },
  actions: {

  },
})
