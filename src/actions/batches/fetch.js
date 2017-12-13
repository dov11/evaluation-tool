import ApiClient from '../../api/client'
import { loading } from '../loading'
import { LOAD_ERROR } from '../loading'

export const FETCHED_BATCHES = 'FETCHED_BATCHES'
export const FETCH_ONE_BATCH = 'FETCH_ONE_BATCH'

const api = new ApiClient()

export default ()=> {
  return dispatch => {
    dispatch({type: loading(true).type})
    api.get('batches')
    .then(res => {
        dispatch({type: FETCHED_BATCHES, payload: res.body})
        dispatch({type: loading(false).type})
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}

export const fetchOneBatch = (batchId)=> {
  // console.log('fetchOneGame');
  return dispatch => {
    dispatch({type: loading(true).type})
    api.get(`batches/${batchId}`)
    .then(res => {
        dispatch({type: FETCH_ONE_BATCH, payload: res.body})
        dispatch({type: loading(false).type})
      })
      .catch(err => dispatch({type: LOAD_ERROR, payload: err}))
  }
}
