import React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import App from './App'
import { Provider } from 'react-redux'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';


describe('<App />', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
      div
    )
  })
})
