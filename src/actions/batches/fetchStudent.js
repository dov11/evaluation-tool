import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'

export const FETCH_ONE_STUDENT = 'FETCH_ONE_STUDENT'

const api = new ApiClient()

export const fetchOneStudent = (batchId, studentId)=> {
  // console.log('fetchOneGame');
  return dispatch => {
    dispatch({type: loading(true).type})
    api.get(`batches/${batchId}/${studentId}`)
    .then(res => {
        dispatch({type: 'FETCH_ONE_STUDENT', payload: res.body})
        dispatch({type: loading(false).type})
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
