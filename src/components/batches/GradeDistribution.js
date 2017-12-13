import React, { PureComponent } from 'react'
// import averageGrade from '../../functions/averagegrade'
import Subheader from 'material-ui/Subheader';
import './GradeDistribution.css'
import averageGrade from '../../functions/averagegrade'

class GradeDistribution extends PureComponent {
  averageGrades = students => {
    return students
    .filter(student=> student.performanceCodes.length>0)
    .map(student=> averageGrade(student.performanceCodes))
  }
  ratio = (color, students) => {
    return this.averageGrades(students).filter(grade=>grade===color).length/students.length
  }
  render() {
    const {students} = this.props
    const redRatio = students.length>0 ? this.ratio('Red', students) : 0
    const greenRatio = students.length>0 ? this.ratio('Green', students) : 0
    const yellowRatio = students.length>0 ? this.ratio('Yellow', students) : 0
    const styleRed = {
      width: 300*redRatio,
      height: 20,
    }
    const styleGreen = {
      width: 300*greenRatio,
      height: 20,
    }
    const styleYellow = {
      width: 300*yellowRatio,
      height: 20,
    }
    return(
      <div>
        <Subheader>Average Grade Distribution:</Subheader>
        <div className="flex-container">
          <div className="barRed" style={styleRed}></div>
          <div className="barYellow" style={styleYellow}>{yellowRatio*100}%</div>
          <div className="barGreen" style={styleGreen}>{greenRatio*100}%</div>
        </div>
      </div>
    )
  }
}

export default GradeDistribution
