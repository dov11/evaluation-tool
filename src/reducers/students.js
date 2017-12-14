import {
  FETCH_ONE_STUDENT,
} from '../actions/batches/fetchStudent'

export default (state=[], {type, payload} ={}) => {
  switch(type) {

    case FETCH_ONE_STUDENT :
      // console.log('FETCH_ONE_GAME:', payload );
      // return [...payload]
      // @todo: error detection when gameId doesn't exist??
      if ( state.length < 1 ) {
        // console.log('fetch one student:', payload);
        return [{ ...payload }]
      } else {
        return state.map((student) => {
          if (student._id === payload._id) {
            return { ...payload }
          }
          return student
        })
      }
      case 'UPDATED_STUDENT' :
      return [{...payload}]

		default :
      return state
  }
}
