import React, { PureComponent } from 'react'
import averageGrade from '../../functions/averagegrade'
import Subheader from 'material-ui/Subheader';

class AverageGrade extends PureComponent {
  render() {
    return(
      <Subheader>Average Grade:<span className={"code "+ averageGrade(this.props.student.performanceCodes)}></span></Subheader>
    )
  }
}

export default AverageGrade
