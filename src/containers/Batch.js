import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
// import patchGame from '../actions/batches/patch'
import { push } from 'react-router-redux'
// import Paper from 'material-ui/Paper'
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


  renderStudent = (student, index) => {

    return (
      <div key={index}>{student.firstName}</div>
    )
  }

  render() {
    const { batch } = this.props
    if ( !batch ) return null
    return (
      <div className="Batch">
        <h2>{'Batch #' + batch.batchNumber}</h2>
        <div className="StudentGrid">
          { batch.students.map(this.renderStudent) }
        </div>
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
