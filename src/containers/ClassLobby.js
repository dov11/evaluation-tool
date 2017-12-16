import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import BatchEditor from '../components/batches/BatchEditor'
import destroyBatch from '../actions/batches/destroyBatch'
import DeleteIcon from 'material-ui/svg-icons/action/highlight-off'
import { push } from 'react-router-redux'
import './ClassLobby.css'


class ClassLobby extends PureComponent {
  componentWillMount() {
    const { currentUser } = this.props
    if ( currentUser == null ) {
      this.props.push('/sign-in')
    }
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
        className="gridtileLobby"
        key={index}
        onClick={this.goToBatch(batch._id)}
        title={'Batch #' + batch.batchNumber}
        subtitle={'Duration: '
           + batch.startDate.slice(0,9).replace(/-/g, '/') + ' --> ' + batch.endDate.slice(0,9).replace(/-/g, '/')
         }
        titlePosition={'top'}
        >
        <div className="content">{batch.students.length + ' Students'}</div>
        <IconButton key={"del"+index}
          onClick={this.deleteBatch(batch._id)}
          >
          <DeleteIcon/>
        </IconButton>
        </GridTile>
        </div>
    )
  }

  render() {
    return (
      <div>
        <div className="rootLobby">
        <Subheader>Batches</Subheader>
          <GridList
          cellHeight={180}
          className="gridlistLobby"
          >
            { this.props.batches.map(this.renderBatch)}
          </GridList>
        </div>
        <BatchEditor/>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, {
	fetchBatches,
  destroyBatch,
	// joinGame,
	push,
})(ClassLobby)


// minimum={
//   this.props.batches.sort((a,b) => a.batchNumber-b.batchNumber)[0]
// }
