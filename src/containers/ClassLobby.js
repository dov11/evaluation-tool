import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { disconnect } from '../actions/websocket'
import fetchBatches from '../actions/batches/fetch'
// import CreateGameButton from '../components/batches/CreateGameButton'
// import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList';
// import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import BatchEditor from '../components/batches/BatchEditor'
import destroyBatch from '../actions/batches/destroyBatch'
import { push } from 'react-router-redux'
import './ClassLobby.css'


class ClassLobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
  }

  goToBatch = batchId => event => {
		this.props.push(`/batches/${batchId}`)
	}
  deleteBatch = batchId => event => {
		this.props.destroyBatch(batchId)
	}

  renderBatch = (batch, index) => {
    return (
      <div key={"div" + index}>
      <GridTile
        className="gridtile"
        key={index}
        onClick={this.goToBatch(batch._id)}
        title={'Batch #' + batch.batchNumber}
        titlePosition={'top'}
        >
        <div className="content">{batch.students.length + ' Students'}</div>
        </GridTile>
        <button key={"del"+index}
          onClick={this.deleteBatch(batch._id)}
          ></button>
        </div>
    )
  }

  render() {
    return (
      <div>
        <div className="root">
        <Subheader>Batches</Subheader>
          <GridList
          cellHeight={180}
          className="gridlist"
          >
            { this.props.batches.map(this.renderBatch)}
          </GridList>
        </div>
        <BatchEditor/>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, {
	fetchBatches,
  destroyBatch,
	// joinGame,
	push,
})(ClassLobby)


// minimum={
//   this.props.batches.sort((a,b) => a.batchNumber-b.batchNumber)[0]
// }
