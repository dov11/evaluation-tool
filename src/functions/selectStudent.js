import averageGrade from './averagegrade'
export default (students) => {
  const unGradedStudents = students.filter(student=>student.performanceCodes.length===0)
  const gradedStudents = students.filter(student=>student.performanceCodes.length>0)

  const fairDieRoll = (size) => {
    return Math.floor(Math.random() * size)
  }
  //select not evaluated students first
  if (unGradedStudents.length>0) {
    console.log('select not evaluated students first')
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

  const studentsWithGrades = studentsSortedByGrade.filter(students=>students.length>0)

  //only one type of students present
  if(studentsWithGrades.length===1) {
    console.log('select one type of student')
    return studentsWithGrades[0][fairDieRoll(studentsWithGrades[0].length)].id
  }
  //one type of students is missing
  const flipBiasedCoin = (Probability) => {
    let flip = Math.random()
    if (flip<Probability) {return 'heads'}
    else {return 'tails'}
  }
  //no red students
  if (studentsOfGrade('Red').length===0) {
    console.log('select between yellow and green')
    const yellowOrGreen = (flipBiasedCoin(0.667)==='heads') ? 1 : 2
    const selectedStudents = studentsSortedByGrade[yellowOrGreen]
    return selectedStudents[fairDieRoll(selectedStudents.length)].id
  }

  //no yellow students
  if (studentsOfGrade('Yellow').length===0) {
    console.log('select between red and green')
    const redOrGreen = (flipBiasedCoin(0.75)==='heads') ? 0 : 2
    const selectedStudents = studentsSortedByGrade[redOrGreen]
    return selectedStudents[fairDieRoll(selectedStudents.length)].id
  }

  //no green students
  if (studentsOfGrade('Green').length===0) {
    console.log('select between yellow and red')
    const redOrYellow = (flipBiasedCoin(0.6)==='heads') ? 0 : 1
    const selectedStudents = studentsSortedByGrade[redOrYellow]
    return selectedStudents[fairDieRoll(selectedStudents.length)].id
  }
  //alias method for when all 3 present
  //manually generated for probs 1/2,1/3,1/6
  console.log('select between all kinds of students')
  const aliasTable=[{Prob: 1}, {Prob: 1}, {Prob: 1/2, Alias: 0}]

  const dieRoll = fairDieRoll(3)
  const alias = aliasTable[dieRoll]
  const coinFlip = flipBiasedCoin(alias.Prob)

  const colorIndex = (coinFlip==='heads') ? dieRoll : alias.Alias
  const selectedStudents = studentsSortedByGrade[colorIndex]
  console.log(selectedStudents)

  return selectedStudents[fairDieRoll(selectedStudents.length)].id
}
