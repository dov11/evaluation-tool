import averageGrade from './averagegrade'
export default (students) => {
  const unGradedStudents = students.filter(student=>student.performanceCodes.length===0)
  const gradedStudents = students.filter(student=>student.performanceCodes.length>0)

  const fairDieRoll = (size) => {
    return Math.floor(Math.random() * size)
  }

  if (unGradedStudents.length>0) {
    return unGradedStudents[fairDieRoll(unGradedStudents.length)]._id
  }

  const gradesIds = gradedStudents.map(student=> {
    return {
      id: student._id,
      grade: averageGrade(student.performanceCodes)
    }
  })

  const studentsOfGrade = (grade) =>{
    return gradesIds.filter(student => student.grade===grade)
  }

  const studentsSortedByGrade = [
    studentsOfGrade('Red'),
    studentsOfGrade('Yellow'),
    studentsOfGrade('Green')
  ]

  //manually generated for probs 1/2,1/3,1/6
  const aliasTable=[{Prob: 1}, {Prob: 1}, {Prob: 1/2, Alias: 0}]

  const flipBiasedCoin = (Probability) => {
    let flip = Math.random()
    if (flip<Probability) {return 'heads'}
    else {return 'tails'}
  }


  const dieRoll = fairDieRoll(3)
  const alias = aliasTable[dieRoll]
  const coinFlip = flipBiasedCoin(alias.Prob)

  const colorIndex = (coinFlip==='heads') ? dieRoll : alias.Alias
  const selectedStudents = studentsSortedByGrade[colorIndex]

  return selectedStudents[fairDieRoll(selectedStudents.length)].id
}
