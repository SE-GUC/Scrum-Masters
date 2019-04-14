import { GET_ELECTRONICJOURNALS, ELECTRONICJOURNAL_LOADING } from './actionTypes'
import axios from 'axios'

// Get all Electronic Journals
export const getElectronicJournals = () => dispatch => {
  axios
    .get('http://localhost:3001/api/electronicJournals')
    .then(res =>
      dispatch({
        type: GET_ELECTRONICJOURNALS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ELECTRONICJOURNALS,
        payload: null
      })
    )
}

// Electronic Journal loading
export const setElectronicJournalLoading = () => {
  return {
    type: ELECTRONICJOURNAL_LOADING
  }
}
