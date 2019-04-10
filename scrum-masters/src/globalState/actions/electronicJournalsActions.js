import { GET_ELECTRONICJOURNALS } from './actionTypes'
import axios from 'axios'

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
