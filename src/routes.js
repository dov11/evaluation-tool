import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  ClassLobby,
  SignIn,
  // SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/sign-in" component={SignIn} />
        <Route exact path="/" component={ClassLobby} />
      </div>
    )
  }
}

// <Route path="/sign-up" component={SignUp} />
