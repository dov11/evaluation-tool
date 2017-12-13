import React, { PureComponent } from 'react'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import createBatch from '../../actions/batches/createBatch'
// import 'medium-editor/dist/css/medium-editor.css'
// import 'medium-editor/dist/css/themes/default.css'
// import './BatchEditor.css'


class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const { batchNumber, startDate, endDate } = props

    this.state = {
      batchNumber,
      startDate,
      endDate,
    }
  }

  updateBatchNumber(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      // this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      batchNumber: this.refs.batchNumber.value
    })
  }

  updateStartDate = (event, date) => {
    this.setState({
      startDate: date
    })
  }

  updateEndDate = (event, date) => {
    this.setState({
      endDate: date
    })
  }



  saveBatch() {
    const {
      batchNumber,
      startDate,
      endDate
    } = this.state

    const batch = {
      batchNumber,
      startDate,
      endDate,
      students: []
    }

    this.props.createBatch(batch)
  }

  render() {
    return (
      <div className="editor">
        <input
          type="number"
          ref="batchNumber"
          className="title"
          placeholder="BatchNumber"
          defaultValue={this.state.title}
          onChange={this.updateBatchNumber.bind(this)}
          onKeyDown={this.updateBatchNumber.bind(this)} />
          <DatePicker id="datepicker1"onChange={this.updateStartDate}/>
          <DatePicker id="datepicker2" onChange={this.updateEndDate}/>

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {createBatch})(BatchEditor)

// min={minimum.batchNumber}
