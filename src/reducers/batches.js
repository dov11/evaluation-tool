import {
  FETCHED_BATCHES,
  FETCH_ONE_BATCH,
} from '../actions/batches/fetch'

export default (state=[], {type, payload} ={}) => {
  switch(type) {
    case 'CREATED_BATCH' :
      return [{ ...payload}].concat(state)
    case 'DESTROY_BATCH' :
      return state.filter((batch) => (batch._id !== payload))
    case 'UPDATED_BATCH' :
    return state.map((batch) => {
      if (batch._id === payload._id) {
        return { ...payload }
      }
      return batch
		})

    case FETCHED_BATCHES :
      return [...payload]

    case FETCH_ONE_BATCH :
      if ( state.length < 1 ) {
        return [{ ...payload }]
      } else {
        return state.map((game) => {
          if (game._id === payload._id) {
            return { ...payload }
          }
          return game
        })
      }

		default :
      return state
  }
}
