import React, { PureComponent } from 'react'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import createBatch from '../../actions/batches/createBatch'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
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
    this.setState({
      evaluationDate: date
    })
  }
  setColorCode = (event, valueSelected) => {
    this.setState({
      colorCode: valueSelected
    })
  }



  saveEvaluation() {
    let {
      comment,
      evaluationDate,
      colorCode
    } = this.state
    if (!colorCode) {colorCode='Green'}

    const evaluation = {
      comment,
      evaluationDate,
      colorCode
    }
    console.log(evaluation)
    // this.props.createBatch(evaluation)
  }

  render() {
    return (
      <div className="editor">
        <TextField
          hintText="Your comment here"
          multiLine={true}
          rows={4}
          onChange={this.updateBatchNumber}
        />

        <DatePicker id="datepicker3" defaultDate={new Date()} onChange={this.setEvaluationDate}/>

        <RadioButtonGroup
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

        <div className="actions">
          <button className="primary" onClick={this.saveEvaluation.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {createBatch})(EvaluationForm)

// min={minimum.comment}
