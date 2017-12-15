import React, { PureComponent } from 'react'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import createEvaluation from '../../actions/batches/createEvaluation'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
// import ActionFavorite from 'material-ui/svg-icons/action/favorite'
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
// import 'medium-editor/dist/css/medium-editor.css'
// import 'medium-editor/dist/css/themes/default.css'
import './EvaluationForm.css'
const styles = {
  radioButton: {
   marginBottom: 16,
   width: 50,
   height: 50,
  },
}
const t = new Date()
const defaultDate=new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0, 0)


class EvaluationForm extends PureComponent {
  constructor(props) {
    super()

    const { comment, evaluationDate, colorCode } = props

    this.state = {
      comment,
      evaluationDate,
      colorCode,
    }
  }


  validateComment() {
    const { comment, grades } = this.refs
    console.log(grades.state.selected)

    if (comment.getValue().length>0) {
      this.setState({
        commentError: null
      })
      return true
    } else if (grades.state.selected==='Green') {
      this.setState({
        commentError: null
      })
      return true
    }

    this.setState({
      commentError: 'Please provide comment'
    })
    return false
}

  updateBatchNumber = (event, text) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      // this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      comment: text
    })
  }

  setEvaluationDate = (event, date) => {
    let roundDate=new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0)
    this.setState({
      evaluationDate: roundDate
    })
  }
  setColorCode = (event, valueSelected) => {
    this.setState({
      colorCode: valueSelected
    })
  }



  saveEvaluation() {
    if (this.validateComment()){
      let {
        comment,
        evaluationDate,
        colorCode
      } = this.state
      if (!colorCode) {colorCode='Green'}
      if (!evaluationDate) {evaluationDate=defaultDate}
      if (!comment) {comment=" "}

      const evaluation = {
        comment,
        evaluationDate,
        colorCode
      }
      const batchId =this.props.batchId
      const studentId =this.props.studentId
      this.props.createEvaluation(batchId, studentId, evaluation, null)
    }
    return false
  }
  saveAndNext() {
    if (this.validateComment()){
    let {
      comment,
      evaluationDate,
      colorCode
    } = this.state
    if (!colorCode) {colorCode='Green'}
    if (!evaluationDate) {evaluationDate=defaultDate}
    if (!comment) {comment=" "}

    const evaluation = {
      comment,
      evaluationDate,
      colorCode
    }
    const batchId =this.props.batchId
    const studentId =this.props.studentId
    this.props.createEvaluation(batchId, studentId, evaluation, 'next')
  }
    return false

  }

  render() {
    return (
      <div className="form">
        <div className="flex-container">
        <div>
          <TextField
            ref="comment"
            hintText="Your comment here"
            multiLine={true}
            errorText={ this.state.commentError}
            rows={4}
            onChange={this.updateBatchNumber}
          />

          <DatePicker
          id="datepicker3"
          defaultDate={defaultDate}
          onChange={this.setEvaluationDate}/>
        </div>
        <div>
          <RadioButtonGroup
            ref="grades"
            name="shipSpeed"
            defaultSelected="Green"
            onChange={this.setColorCode}
          >
            <div
              value="Green"
              className="greenButton"
              style={styles.radioButton}
            ></div>
            <div
              value="Yellow"
              className="yellowButton"
              style={styles.radioButton}
            ></div>
            <RadioButton
              value="Red"
              className="redButton"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
      </div>
        <div className="actions">
          <RaisedButton onClick={this.saveEvaluation.bind(this)}>Save</RaisedButton>
          <RaisedButton primary={true} onClick={this.saveAndNext.bind(this)}>Save and Next...</RaisedButton>
        </div>
      </div>
    )
  }
}

export default connect(null, {createEvaluation})(EvaluationForm)

// min={minimum.comment}
