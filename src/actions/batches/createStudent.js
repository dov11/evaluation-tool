import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'
// import { push } from 'react-router-redux'

// export const CREATED_STUDENT = 'CREATED_STUDENT'

const api = new ApiClient()

export default (batchId, newStudent)=> {
  return dispatch => {
    dispatch({type: loading(true).type})
    api.patch(`batches/${batchId}`, newStudent)
    .then(res => {
        dispatch({type: 'UPDATED_BATCH', payload: res.body})
        dispatch({type: loading(false).type})
        // const newBatchId = res.body._id
        // dispatch(push(`batch/${newBatchId}`))
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
