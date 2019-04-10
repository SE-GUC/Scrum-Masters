import { combineReducers } from 'redux'
import electronicJournalReducer from './electronicJournalReducer'

export default combineReducers({
  electronicJournal: electronicJournalReducer
})
