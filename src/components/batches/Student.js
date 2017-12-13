import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneStudent } from '../../actions/batches/fetchStudent'
import { push } from 'react-router-redux'
import {GridList, GridTile} from 'material-ui/GridList';

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
    console.log(this.props.match.params)
    if ( currentUser == null ) {
      this.props.push('/sign-in')
    }

    this.props.fetchOneStudent(batchId, studentId)
  }

  renderCode = (code, index) => {
    return (
      <GridTile key={index}>
        <div className={"code "+ code.colorCode}></div>
      </GridTile>

    )
  }

  render() {
    const { student } = this.props
    if ( !student ) return null

    return (
        <div style={styles.root}>
        <div>
        <div>{student.firstName + " " + student.lastName}</div>
        <img className="photo" src={student.linkToPhoto} alt={student.firstName + " Photo"}/>
        </div>
          <GridList style={styles.gridList} cols={2.2}>
            {student.performanceCodes.map(this.renderCode)}
          </GridList>
        </div>
    )
  }
}

const mapStateToProps = ({ currentUser, students }, { match }) => {
  const student = students.filter((student) => (student._id === match.params.studentId))[0]

  return {
    currentUser,
    student,
  }
}


const mapDispatchtoProps = {
  fetchOneStudent,
  push,
}

export default connect(mapStateToProps, mapDispatchtoProps)(Student)
