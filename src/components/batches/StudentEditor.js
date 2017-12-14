import React, { PureComponent } from 'react'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import createStudent from '../../actions/batches/createStudent'
import TextField from 'material-ui/TextField'
// import 'medium-editor/dist/css/medium-editor.css'
// import 'medium-editor/dist/css/themes/default.css'
// import './StudentEditor.css'


class StudentEditor extends PureComponent {
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
      // this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      firstName: newValue
    })
  }

  updateLastName = (event, newValue) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      // this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      lastName: newValue
    })
  }

  updateLinkToPhoto = (event, newValue) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      // this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      linkToPhoto: newValue
    })
  }


  saveStudent() {
    let {
      firstName,
      lastName,
      linkToPhoto
    } = this.state
    if (!linkToPhoto) {linkToPhoto="https://vignette.wikia.nocookie.net/scrubs/images/3/31/S6-HQ-Ted.jpg/revision/latest?cb=20141104111733"}

    const student = {
      firstName,
      lastName,
      linkToPhoto,
      performanceCodes: []
    }
    const batchId = this.props.batchId
    this.props.createStudent(batchId, student)
  }

  render() {
    return (
      <div className="editor">
        <TextField
          ref="firstName"
          hintText="First Name"
          onChange={this.updateFirstName}
           />

        <TextField
          ref="lastName"
          hintText="Last Name"
          onChange={this.updateLastName}
           />
          <br />
        <TextField
          ref="linkToPhoto"
          className="title"
          hintText="Link To Photo"
          onChange={this.updateLinkToPhoto}
          />

        <div className="actions">
          <button className="primary" onClick={this.saveStudent.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {createStudent})(StudentEditor)
