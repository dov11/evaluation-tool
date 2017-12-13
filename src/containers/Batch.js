import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
// import patchGame from '../actions/batches/patch'
import { push } from 'react-router-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'
// import Student from '../components/batches/student'
// import './Batch.css'


class Batch extends PureComponent {

  componentWillMount() {
    const { currentUser } = this.props
    const batchId = this.props.match.params.batchId
    if ( currentUser == null ) {
      this.props.push('/sign-in')
    }

    this.props.fetchOneBatch(batchId)
  }

  componentWillReceiveProps(nextProps) {
    // this.props.fetchGames()
    // this.props.connectToSocket()
  }

  goToStudent = studentId => event => {
		this.props.push(`/batches/${studentId}`)
	}


  renderStudent = (student, index) => {

    return (
      <GridTile
        className="gridtile"
        key={index}
        onClick={this.goToStudent(student._id)}
        title={student.firstName + " " + student.lastName}
        titlePosition={'top'}
      >
      <img src={student.linkToPhoto} />
      </GridTile>
    )
  }

  render() {
    const { batch } = this.props
    if ( !batch ) return null
    return (
      <div className="Batch">
        <Subheader>{'Batch #' + batch.batchNumber}</Subheader>
        <GridList
          cellHeight={180}
          className="StudentGrid"
          >
            { batch.students.map(this.renderStudent) }
        </GridList>
      </div>
    )
  }
}
//
const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((batch) => (batch._id === match.params.batchId))[0]

  return {
    currentUser,
    batch,
  }
}

const mapDispatchtoProps = {
  fetchOneBatch,
  push,
}

export default connect(mapStateToProps, mapDispatchtoProps)(Batch)



// <div>{this.props.batch.students.map(this.renderStudent)}</div>
// <Student key={index} student={student}/>
