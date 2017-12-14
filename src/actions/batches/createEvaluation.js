import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'
import { replace } from 'react-router-redux'

// export const CREATED_STUDENT = 'CREATED_STUDENT'

const api = new ApiClient()

export default (batchId, studentId, evaluation, next)=> {
  return (dispatch, getState) => {
    dispatch({type: loading(true).type})
    const { batches } = getState()
    const students=batches.filter(batch=>batch._id===batchId)[0].students
    const studentIds=students.map(student=>student._id)
    const currentIndex = studentIds.indexOf(studentId)
    const nextIndex = ((currentIndex+1)===studentIds.length) ? 0 : (currentIndex+1)
    const nextId=studentIds[nextIndex]
    console.log(nextId)
    api.patch(`batches/${batchId}/${studentId}`, evaluation)
    .then(res => {
        dispatch({type: 'UPDATED_STUDENT', payload: res.body.students.filter(student=>student._id===studentId)[0]})
        dispatch({type: loading(false).type})
        if (next==='next') {dispatch(replace(`/`))}
        if (next==='next') {dispatch(replace(`students/${batchId}/${nextId}`))}
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
