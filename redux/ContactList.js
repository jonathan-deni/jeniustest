export const FETCH_CONTACT = 'FETCH_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'

const initialState = []

const contactListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACT:
      return action.payload
    case ADD_CONTACT:
      return [...state, action.payload]
    case DELETE_CONTACT:
      return state.filter(contactItem => contactItem.id !== action.payload.id)
    case UPDATE_CONTACT:
      console.log("<<<UPDATE CONTACT ACT ", state.map((state)=>{
        if(state.id == action.payload.id) {
          return action.payload
        }
        return state
      }))
      return state.map((state)=>{
        if(state.id == action.payload.id) {
          return action.payload
        }
        return state
      })
  }
  return state
}

export default contactListReducer