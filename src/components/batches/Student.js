import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneStudent } from '../../actions/batches/fetchStudent'
import fetchBatches from '../../actions/batches/fetch'
import { push } from 'react-router-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import AverageGrade from './AverageGrade'
import EvaluationForm from './EvaluationForm'

// import FlatButton from 'material-ui/FlatButton';

import './Student.css'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};
class Student extends PureComponent {
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

  goToEvaluation = evaluationId => event => {
    const batchId = this.props.match.params.batchId
    const studentId = this.props.match.params.studentId
		this.props.push(`/evaluations/${batchId}/${studentId}/${evaluationId}`)

  }

  renderCode = (code, index) => {
    return (
      <GridTile key={index}>
        <div onClick={this.goToEvaluation(code._id)} className={"code "+ code.colorCode}>{new Date(code.evaluationDate).toDateString()}</div>
      </GridTile>

    )
  }

  render() {
    const { student } = this.props
    if ( !student ) return null
    return (
      <div className="container">
        <div style={styles.root}>
          <div>
            <div>{student.firstName + " " + student.lastName}</div>
            <img className="photo" src={student.linkToPhoto} alt={student.firstName + " Photo"}/>
            {
              (student.performanceCodes.length>0) &&
              <AverageGrade student={student}/>
            }
          </div>
          {
            (student.performanceCodes.length>0) &&
            <GridList style={styles.gridList} cols={2.2}>
              {student.performanceCodes
                .sort((a,b)=> (new Date(a.evaluationDate).getTime())-(new Date(b.evaluationDate).getTime()))
                .map(this.renderCode)}
            </GridList>
          }
        </div>
        <EvaluationForm batchId={this.props.match.params.batchId} studentId={student._id}/>
        </div>
    )
  }
}

const mapStateToProps = ({ currentUser, students }, { match }) => {
  if ( currentUser == null ) {
    return null
  }
  const student = students.filter((student) => (student._id === match.params.studentId))[0]

  return {
    currentUser,
    student,
  }
}


const mapDispatchtoProps = {
  fetchOneStudent,
  fetchBatches,
  push,
}

export default connect(mapStateToProps, mapDispatchtoProps)(Student)
