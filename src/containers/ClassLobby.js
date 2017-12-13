import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { disconnect } from '../actions/websocket'
import fetchGames from '../actions/batches/fetch'
// import CreateGameButton from '../components/batches/CreateGameButton'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import { push } from 'react-router-redux'
import './ClassLobby.css'


class ClassLobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
  }

  goToBatch = batchId => event => {
		this.props.push(`/batches/${batchId}`)
	}

  renderBatch = (batch, index) => {
    return (
      <GridTile
        className="gridtile"
        key={index}
        onClick={this.goToBatch(batch._id)}
        title={'Batch #' + batch.batchNumber}
        titlePosition={'top'}
        >
        <div className="content">{batch.students.length + ' Students'}</div>
        </GridTile>
    )
  }

  render() {
    return (
        <div className="root">
        <Subheader>Batches</Subheader>
          <GridList
          cellHeight={180}
          className="gridlist"
          >
            { this.props.batches.map(this.renderBatch)}
          </GridList>
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
