import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { push } from 'react-router-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'
import AverageGrade from '../components/batches/AverageGrade'
import GradeDistribution from '../components/batches/GradeDistribution'
import StudentEditor from '../components/batches/StudentEditor'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/highlight-off'
import FaceIcon from 'material-ui/svg-icons/action/face'
import destroyStudent from '../actions/batches/destroyStudent'
import selectStudent from '../functions/selectStudent'
// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'
// import Student from '../components/batches/student'
import './Batch.css'


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
    const batchId = this.props.match.params.batchId
		this.props.push(`/students/${batchId}/${studentId}`)
	}
  deleteStudent = (studentId) => event => {
    this.props.destroyStudent(this.props.match.params.batchId, studentId)
  }
  goToRandomStudent = () => event => {
    const students = this.props.batch.students
    const studentId = selectStudent(students)

    const batchId = this.props.match.params.batchId
    this.props.push(`/students/${batchId}/${studentId}`)
    console.log(studentId)
  }


  renderStudent = (student, index) => {
    const lastGrade=student.performanceCodes
      .sort((a,b)=> (new Date(b.evaluationDate).getTime())-(new Date(a.evaluationDate).getTime()))[0]
    return (
      <GridTile
        className="gridtile"
        key={index}
        onClick={this.goToStudent(student._id)}
        title={student.firstName + " " + student.lastName}
        subtitle={
          <IconButton key={"del"+index}
          onClick={this.deleteStudent(student._id)}
          >
          <DeleteIcon/>
          </IconButton>
        }
        titlePosition={'bottom'}
      >
      {(student.performanceCodes.length>0) &&
      <div className="Grades">
        Last Grade:
        <span className={"code "+lastGrade.colorCode}>
          {new Date(lastGrade.evaluationDate).toDateString()}
        </span>
      <AverageGrade student={student}/>
      </div>}
      <img className="photo" src={student.linkToPhoto} alt={student.firstName + " Photo"}/>
      </GridTile>
    )
  }

  render() {
    const { batch } = this.props
    if ( !batch ) return null
    return (
      <div>
        <div className="root">
          <Subheader>{'Batch #' + batch.batchNumber}</Subheader>
          <GradeDistribution students={batch.students}/>
          <GridList
            cellHeight={180}
            className="StudentGrid"
            >
              { batch.students.map(this.renderStudent) }
          </GridList>
        </div>
        <StudentEditor batchId={batch._id}/>
        <div>
          Select Random Student: <IconButton onClick={this.goToRandomStudent()}><FaceIcon/></IconButton>
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
  destroyStudent,
  push,
}

export default connect(mapStateToProps, mapDispatchtoProps)(Batch)



// <div>{this.props.batch.students.map(this.renderStudent)}</div>
// <Student key={index} student={student}/>
