import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import createBatch from '../../actions/batches/createBatch'
import RaisedButton from 'material-ui/RaisedButton'
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
          onChange={this.updateBatchNumber.bind(this)}
          onKeyDown={this.updateBatchNumber.bind(this)} />
        <DatePicker id="datepicker1" hintText="Start Date" onChange={this.updateStartDate}/>
          <DatePicker id="datepicker2" hintText="End Date" onChange={this.updateEndDate}/>

        <div className="actions">
          <RaisedButton primary={true} onClick={this.saveBatch.bind(this)}>Save</RaisedButton>
        </div>
      </div>
    )
  }
}

export default connect(null, {createBatch})(BatchEditor)

// min={minimum.batchNumber}
