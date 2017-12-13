import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'
import { push } from 'react-router-redux'

export const DESTROY_BATCH = 'DESTROY_BATCH'

const api = new ApiClient()

export default (batchId)=> {
  console.log(batchId)
  return dispatch => {
    dispatch({type: loading(true).type})
    api.delete(`batches/${batchId}`)
    .then(res => {
        dispatch({type: 'DESTROY_BATCH', payload: res.body})
        dispatch({type: loading(false).type})
        dispatch(push('/'))
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
