import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { disconnect } from '../actions/websocket'
import fetchGames from '../actions/batches/fetch'
// import CreateGameButton from '../components/batches/CreateGameButton'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import { push } from 'react-router-redux'
import './ClassLobby.css'

class ClassLobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
  }

  goToBatch = batchId => event => {
		this.props.push(`/batch/${batchId}`)
	}

  renderBatch = (batch, index) => {
    return (
      <ListItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        primaryText={'Batch #' + batch.batchNumber}
        />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <Paper className="paper">
          <List>
            { this.props.batches.map(this.renderBatch)}
          </List>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, {
	fetchGames,
	// joinGame,
	push,
})(ClassLobby)
