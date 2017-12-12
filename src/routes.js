import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  ClassLobby,
  SignIn,
  Batch
  // SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/sign-in" component={SignIn} />
        <Route exact path="/" component={ClassLobby} />
        <Route path="/batches/:batchId" component={Batch} />
      </div>
    )
  }
}

// <Route path="/sign-up" component={SignUp} />
