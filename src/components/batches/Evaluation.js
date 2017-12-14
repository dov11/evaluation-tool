import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneStudent } from '../../actions/batches/fetchStudent'
import fetchBatches from '../../actions/batches/fetch'
import Subheader from 'material-ui/Subheader'
import { push } from 'react-router-redux'
import './Evaluation.css'

class Evaluation extends PureComponent {
  componentWillMount() {
    const { currentUser } = this.props
    const studentId = this.props.match.params.studentId
    const batchId = this.props.match.params.batchId
    if ( currentUser == null ) {
      this.props.push('/sign-in')
    }
    this.props.fetchBatches()
    this.props.fetchOneStudent(batchId, studentId)
  }
  render() {
    const { evaluation } = this.props
    const { student } = this.props
    if ( !evaluation ) return null
    return (
      <div>
        <Subheader>Evaluation of {student.firstName + ' ' + student.lastName} </Subheader>
        <Subheader>Date of evaluation: {new Date(evaluation.evaluationDate).toDateString()}</Subheader>
        <div className={"codeEvaluation "+ evaluation.colorCode}></div>
        {evaluation.comment && <Subheader>{evaluation.comment}</Subheader>}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, students }, { match }) => {
  if ( currentUser == null || students.length === 0 ) {
    return null
  }
  const student = students.filter((student) => (student._id === match.params.studentId))[0]
  const evaluation = student.performanceCodes.filter(code => (code._id===match.params.evaluationId))[0]

  return {
    currentUser,
    student,
    evaluation
  }
}
const mapDispatchtoProps = {
  fetchOneStudent,
  fetchBatches,
  push
}

export default connect(mapStateToProps, mapDispatchtoProps)(Evaluation)
