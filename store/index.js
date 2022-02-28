export const state = () => ({
  currentComponent : 'HeaderComponent',
  destinationComponent: ''
})

export const getters = {
  getCurrentComponent: (state) => {
    return state.nextComponent
  },
  getDestination: (state) => {
    return state.destinationComponent
  }
}

export const mutation = {
  updateCurrentComponent: (state, payload) => {
    state.nextComponent = payload
  },

  updateDestinationComponent: (state, payload) => {
    state.destinationComponent = payload
  }
}