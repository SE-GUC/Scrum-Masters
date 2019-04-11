import { GET_ELECTRONICJOURNALS } from '../actions/actionTypes'

const initialState = {
  electronicJournals: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ELECTRONICJOURNALS:
      return {
        ...state,
        electronicJournals: action.payload,
        loading: false
      }
    default: return state
  }
}
