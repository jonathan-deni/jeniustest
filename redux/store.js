import { createStore } from 'redux'
import contactListReducer from './ContactList'

const store = createStore(contactListReducer)

export default store