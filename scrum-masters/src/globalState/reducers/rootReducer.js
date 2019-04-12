import { combineReducers } from 'redux'
import electronicJournalReducer from './electronicJournalReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  electronicJournal: electronicJournalReducer,
  errors: errorReducer
})
