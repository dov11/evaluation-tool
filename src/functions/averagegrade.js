export default (performanceCodes) => {
  const grades = performanceCodes.map(pCode => {
    switch(pCode.colorCode) {
      case 'Green' :
      return 1
      case 'Yellow' :
      return 0
      default :
      return -1
    }
  })
  const average = grades.reduce((total, grade) => total + grade)/grades.length
  if (average>=0.5) {
    return 'Green'
  } else if (average>-0.5) {
    return 'Yellow'
  } else {
    return 'Red'
  }
}
