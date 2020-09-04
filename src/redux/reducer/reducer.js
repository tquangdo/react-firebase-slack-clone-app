import * as actType from '../action/actiontypes'

export const myInitialState = {
  user: null,
}

const myReducer = (state, action) => {
  switch (action.type) {
    case actType.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default myReducer
