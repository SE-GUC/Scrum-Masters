import { GET_ELECTRONICJOURNALS, ELECTRONICJOURNAL_LOADING } from '../actions/actionTypes'

const initialState = {
  electronicJournals: null,
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ELECTRONICJOURNAL_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ELECTRONICJOURNALS:
      return {
        ...state,
        electronicJournals: action.payload,
        loading: false
      }
    default: return state
  }
}
