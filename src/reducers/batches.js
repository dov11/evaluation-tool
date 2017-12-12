import {
  FETCHED_BATCHES,
  FETCH_ONE_BATCH,
} from '../actions/batches/fetch'

// import {
//   GAME_CREATED,
//   GAME_UPDATED,
// } from '../actions/games/subscribe'


export default (state=[], {type, payload} ={}) => {
  // console.log('>>> REDUCER = CALLED: TYPE: ', type);
  switch(type) {
    // case GAME_CREATED :
    //   return [{ ...payload}].concat(state)
    //   // return [...state, {...payload}]
    // case GAME_UPDATED :
    // return state.map((game) => {
    //   if (game._id === payload._id) {
    //     return { ...payload }
    //   }
    //   return game
		// })

    case FETCHED_BATCHES :
      return [...payload]

    case FETCH_ONE_BATCH :
      // console.log('FETCH_ONE_GAME:', payload );
      // return [...payload]
      // @todo: error detection when gameId doesn't exist??
      if ( state.length < 1 ) {
        // console.log('fetch one game:', payload);
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