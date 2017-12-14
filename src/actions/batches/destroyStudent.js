import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'
import { push } from 'react-router-redux'

// export const DESTROY_STUDENT = 'DESTROY_STUDENT'

const api = new ApiClient()

export default (batchId, studentId)=> {
  return dispatch => {
    console.log(batchId, studentId)
    dispatch({type: loading(true).type})
    api.delete(`batches/${batchId}/${studentId}`)
    .then(res => {
        dispatch({type: 'UPDATED_BATCH', payload: res.body})
        dispatch({type: loading(false).type})
        dispatch(push(`/batches/${batchId}`))
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
