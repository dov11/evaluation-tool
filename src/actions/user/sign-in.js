import { replace } from 'react-router-redux'
import ApiClient from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new ApiClient()


export default (user) => {

  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.post('sessions', { ...user })
    .then((res)=>{
      api.storeToken(res.body.token)

      api.get('users/me')
      .then((user)=> {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch(replace('/'))  //like push but dispatch is used
        dispatch({
          type: USER_SIGNED_IN,
          payload: user.body
        })

      })
    })
    .catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
