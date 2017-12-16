export default (state=[], {type, payload} ={}) => {
  switch(type) {

    case 'FETCH_ONE_STUDENT' :
      const studentIds = state.map(student => student._id)
      if (studentIds.indexOf(payload._id) < 0) {
       return [{ ...payload }].concat(state)
      }
      else {
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
