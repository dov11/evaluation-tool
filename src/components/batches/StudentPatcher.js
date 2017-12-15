import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createStudent from '../../actions/batches/createStudent'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton'
import { fetchOneStudent } from '../../actions/batches/fetchStudent'
import { push } from 'react-router-redux'
import fetchBatches from '../../actions/batches/fetch'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import './StudentEditor.css'


class StudentPatcher extends PureComponent {
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

  goBack = () => event => {
    const batchId = this.props.match.params.batchId
    this.props.push(`/batches/${batchId}/`)
  }

  constructor(props) {
    super()

    const { firstName, lastName, linkToPhoto } = props

    this.state = {
      firstName,
      lastName,
      linkToPhoto,
    }
  }

  updateFirstName = (event, newValue) =>{
    if (event.keyCode === 13) {
      event.preventDefault()
    }
    this.setState({
      firstName: newValue
    })
  }

  updateLastName = (event, newValue) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
    this.setState({
      lastName: newValue
    })
  }

  updateLinkToPhoto = (event, newValue) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
    this.setState({
      linkToPhoto: newValue
    })
  }


  saveStudent() {
    const { student } = this.props
    const { performanceCodes, _id } = student
    // console.log(performanceCodes, _id)
    let {
      firstName,
      lastName,
      linkToPhoto
    } = this.state
    if (!linkToPhoto) {linkToPhoto=student.linkToPhoto || "https://vignette.wikia.nocookie.net/scrubs/images/3/31/S6-HQ-Ted.jpg/revision/latest?cb=20141104111733"}
    if (!firstName) {firstName = student.firstName}
    if (!lastName) {lastName = student.lastName}

    const studentUpdated = {
      firstName,
      lastName,
      linkToPhoto,
      performanceCodes,
      _id
    }
    const batchId = this.props.match.params.batchId
    // console.log(studentUpdated)
    this.props.createStudent(batchId, studentUpdated)
  }

  render() {
    const { student } = this.props
    return (
      <div className="editor">
        <Subheader>Edit Student {(!!student)&& `${student.firstName} ${student.lastName}`}:</Subheader>
        <TextField
          ref="firstName"
          hintText="First Name"
          defaultValue={(student)?student.firstName:''}
          onChange={this.updateFirstName}
           />

        <TextField
          ref="lastName"
          hintText="Last Name"
          defaultValue={(student)?student.lastName:''}
          onChange={this.updateLastName}
           />
          <br />
        <TextField
          ref="linkToPhoto"
          className="title"
          hintText="Link To Photo"
          defaultValue={(student)?student.linkToPhoto:''}
          onChange={this.updateLinkToPhoto}
          />

        <div className="actions">
          <RaisedButton primary={true} onClick={this.saveStudent.bind(this)}>Save</RaisedButton>
        </div>
        <FloatingActionButton mini={true} onClick={this.goBack()}><BackIcon/></FloatingActionButton>
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
  createStudent,
  push,
}

export default connect(mapStateToProps, mapDispatchtoProps)(StudentPatcher)
