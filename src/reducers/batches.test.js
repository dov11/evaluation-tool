import { expect } from 'chai'
import batches from './batches'
import {
  FETCHED_BATCHES,
  FETCH_ONE_BATCH,
} from '../actions/batches/fetch'


describe('batches reducer', () => {
  const reducer = batches
  const initialState = []

  it('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })

  it('CREATED_BATCH', () => {
    const payload = {some: 'object'}
    const eventualState = [{some: 'object'}]

    const createAction = {
      type: 'CREATED_BATCH',
      payload: payload
    }

    expect(reducer(initialState, createAction)).to.eql(eventualState)
  })

  it(FETCHED_BATCHES, () => {
    const payload = [{some: 'object'}, {another: 'object'}]
    const eventualState = [{some: 'object'}, {another: 'object'}]

    const fetchedBatchesAction = {
      type: FETCHED_BATCHES,
      payload: payload
    }

    expect(reducer(initialState, fetchedBatchesAction)).to.eql(eventualState)
  })

  it(FETCH_ONE_BATCH, () => {
    const payload = {some: 'object'}
    const eventualState = [{some: 'object'}]

    const fetchedBatchAction = {
      type: FETCH_ONE_BATCH,
      payload: payload
    }

    expect(reducer(initialState, fetchedBatchAction)).to.eql(eventualState)
  })
  it(FETCH_ONE_BATCH, () => {
    const payload = {some: 'object'}
    const initialState2 = [{another: 'object'}]
    const eventualState2 = [{some: 'object'}]

    const fetchedBatchAction = {
      type: FETCH_ONE_BATCH,
      payload: payload
    }

    expect(reducer(initialState2, fetchedBatchAction)).to.eql(eventualState2)
  })

  it('NOT_A_VALID_ACTION_TYPE', () => {
    const initialState = [{some: 'object'}]

    const eventualState = [...initialState]

    const nonValidAction = {
      type: 'NOT_A_VALID_ACTION_TYPE',
      payload: { foo: 'bar' }
    }

    expect(reducer(initialState, nonValidAction)).to.eql(eventualState)
  })
})
