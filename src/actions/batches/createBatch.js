import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'
import { push } from 'react-router-redux'

export const CREATED_BATCH = 'CREATED_BATCH'

const api = new ApiClient()

export default (newBatch)=> {
  return dispatch => {
    dispatch({type: loading(true).type})
    api.post('batches', newBatch)
    .then(res => {
      console.log('got res from api')
        dispatch({type: CREATED_BATCH, payload: res.body})
        dispatch({type: loading(false).type})
        const newBatchId = res.body._id
        dispatch(push(`batch/${newBatchId}`))
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
