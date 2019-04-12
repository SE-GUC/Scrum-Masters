import { GET_ELECTRONICJOURNALS, GET_ERRORS } from './actionTypes'
import axios from 'axios'

export const getElectronicJournals = () => dispatch => {
  axios
    .get('http://localhost:3001/api/electronicJournals')
    .then(res =>
      dispatch({
        type: GET_ELECTRONICJOURNALS,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
