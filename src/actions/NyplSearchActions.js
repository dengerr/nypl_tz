import { NYPL_SEARCH, NYPL_SEARCH_RECEIVE_RESULTS } from '../constants/NyplSearch'

export function nyplSearch(query) {
  console.log('search', arguments)
  return {
    type: NYPL_SEARCH,
    query: query
  }

}

export function nyplSearchReceiveResults(json) {
  console.log('receive action')
  return {
    type: NYPL_SEARCH_RECEIVE_RESULTS,
    results: json // json.data.children.map(child => child.data),
  }
}
