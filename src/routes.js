import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  ClassLobby,
  SignIn,
  Batch
  // SignUp
} from './containers'

import Student from './components/batches/Student'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/sign-in" component={SignIn} />
        <Route exact path="/" component={ClassLobby} />
        <Route path="/batches/:batchId" component={Batch} />
        <Route path="/students/:batchId/:studentId" component={Student} />
      </div>
    )
  }
}

// <Route path="/sign-up" component={SignUp} />
