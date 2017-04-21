// import { combineReducers } from 'redux'
// import page from './page'
// import user from './user'

// export default combineReducers({
//   page,
//   user
// })

import $ from 'jquery'
import {NYPL_SEARCH, NYPL_SEARCH_RECEIVE_RESULTS} from "../constants/NyplSearch"
import {nyplSearchReceiveResults} from "../actions/NyplSearchActions"

const initialState = {
  searchQuery: 'cats',
  searchResults: [],
  searchDetails: [],
  currentUuid: null,
}

export default function userstate(state = initialState, action) {

  switch (action.type) {
    case NYPL_SEARCH:
      console.log('send', action)
      $.get('/nypl/search.json', {
        q: action.query
      }, data => {
        let result = data.nyplAPI.response.result || []
        return (nyplSearchReceiveResults(result))
      })

      return {...state, searchQuery: action.query}

    case NYPL_SEARCH_RECEIVE_RESULTS:
      console.log('receive')
      return {...state, searchResults: action.results}

    default:
      return state
  }

}
