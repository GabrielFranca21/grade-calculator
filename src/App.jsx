import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import{ useImmer } from 'use-immer'
import './App.css'
 


function Form() {
  const [grade,setGrade] = useState('')
  const [notaParticipation,setNotaParticipation] = useState('')
  const [notaCoursework,setNotaCoursework] = useImmer([])
  const [notaMidtermProject,setNotaMidtermProject] = useState('')
  const [notaFinalProject,setNotaFinalProject] = useState('')
  const [notaFinalExam,setNotaFinalExam] = useState('')
  
  function finalGrate(){

    let notaFinal = (notaParticipation * 0.1 )+ (courseWorkAverage() * 0.2) + (notaMidtermProject* 0.15) + (notaFinalProject* 0.3) + (notaFinalExam* 0.25)
    return notaFinal
  }

  function gradeFunction(e) {
    let gradeValue = e.target.value
    
    if(Number(gradeValue) > 100 ||Number(gradeValue) < 0 ){
     return
    }
    else{
      setGrade(e.target.value);
    }
    
  }
  function courseWorkFunction() {
    setNotaCoursework(draft =>{
      draft.push(grade)
    })
  }
  function courseWorkAverage(){
    let average = 0
    if(notaCoursework.length === 0){
      return ''
    }
    for (let i = 0; i < notaCoursework.length; i++) {
      let e = notaCoursework[i]; 
      average += Number(e)
    }
    
    let averageFinal = average/notaCoursework.length
    return averageFinal
  }
  return (
    <>
      <div className="grade-calculator">
        <h1>Grade calculator</h1>

        <label>Categories</label>
        <select id="select">
          <option value="nada"selected>---- Select ----</option>

          <option value="participation">Participation</option>
          <option value="coursework" >Coursework</option>
          <option value="midtermProject">Midter Project</option>
          <option value="finalProject">Final Project</option>
          <option value="finalExam">Final Exam</option>
        </select>

        <label>Your Grate</label>
        <input type="number" max={100} min={0} value={grade} onChange={gradeFunction}></input>

        <button onClick={(e) =>{
          let select = document.querySelector('#select').value
          if(select == 'participation'){
            setNotaParticipation(grade)
          }  
          if(select == 'coursework'){
            courseWorkFunction()
          }  
          if(select == 'midtermProject'){ 
            setNotaMidtermProject(grade)
          }  
          if(select == 'finalProject'){ 
            setNotaFinalProject(grade)
          }  
          if(select == 'finalExam'){
            setNotaFinalExam(grade )
          }  
          
        }}>Confirm</button>
      </div>

      <div>
        <h2>categories with grates</h2>

        <p>Participation: {notaParticipation}</p>
        <p>Coursework: {notaCoursework.join(',')} = {courseWorkAverage()}</p>
        <p>Midter Project: {notaMidtermProject}</p>
        <p>Final Project: {notaFinalProject}</p>
        <p>Final Exam: {notaFinalExam}</p>

        <p>Total: {finalGrate()}</p>
      </div>
    </>
  )
}

function App() {
  

  return (
    <>
      <Form/>
    </>
  )
}

export default App
