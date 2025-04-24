import './index.css'
import './App.css'
import studentsData from './estudiantes_saet.json'
import InfoCardFrontal from './components/InfoCardFrontal.jsx'
import { generatePdf } from './utils/pdfGenerator.js'
import { useState } from 'react'
import JSZip from 'jszip'
import {saveAs} from 'file-saver'

function App() {
const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
const [studentInfo, setStudentInfo] = useState("Nombre del alumno")
const [progressMessage, setProgressMessage] = useState("CREAR PDF's")
const students = studentsData

// const students = [{
//   "student_name": "Abril Bulla Andres Felipe"
// },
// {
//   "student_name": "Abril Lombana Valeria"
// },
// {
//   "student_name": "Abril Rincon Adrian Joshue"
// },
// {
//   "student_name": "Acero Medina Maria Jose"
// },
// {
//   "student_name": "Acevedo Caicedo Sofia"
// }]

const handleClick = async () => {
  if (isGeneratingPdf) return

  setIsGeneratingPdf(true)

  let pdfCount = 0

  for(let chunkStudent of students){
    
    const zip = new JSZip()
    const nameLetter = chunkStudent[0].student_name.charAt(0)

    for(let student of chunkStudent){
      pdfCount++
      console.log(student)
    
    setProgressMessage(`Generando PDF ${pdfCount} / ${chunkStudent.length}: ${student.student_name}`)
    setStudentInfo(student.student_name)

    await new Promise(resolve => setTimeout(resolve, 50))

    const pdfBlob = await generatePdf('carnet')

    if (pdfBlob) {
    zip.file(`${student.student_name}.pdf`, pdfBlob)
    }
    }

    setProgressMessage("Generando archivo zip...")
    const zipBlob = await zip.generateAsync({ 
      type: "blob",
      compressionOptions: {
        level: 9,
      }
    })
    setProgressMessage("Descargando archivo zip...")
  saveAs(zipBlob, `carnets_estudiantes_${nameLetter}.zip`)

  pdfCount = 0
  };

  

  

  setIsGeneratingPdf(false)
  setProgressMessage("CREAR PDF's")
  setStudentInfo("Nombre del alumno")
}

  return (
    <>
    <section className='flex justify-center items-center min-h-screen gap-8'>
      <div id='carnet' className='w-[612px] h-[792px] flex flex-col justify-center items-center gap-8'>
        <div className='w-full relative flex'>
          <div className='w-[459px] h-38 bg-white absolute flex justify-end transform -translate-x-1/2 bottom-0 left-1/2 pb-2'>
            <div className=' w-11/12 h-full relative'>
              <InfoCardFrontal studentInfo={studentInfo}/>
              <div className='absolute right-2 bottom-0 flex items-center gap-2 font-bold text-[0.6rem]'>
                <p>Mayor Información:</p>
                <div>
                  <p>Celular: #332</p>
                  <p>Línea 018000 123 322</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-3/4 mx-auto'>
            <img src="../src/assets/carnet_frontal.png" alt="" />
          </div>
        </div>
        <div className='w-full'>
          <div className='w-3/4 mx-auto'>
            <img src="../src/assets/carnet_reverso.png" alt="" />
          </div>
        </div>
      </div>
      <button className='bg-sky-800 px-4 py-2 rounded-full border-2 border-transparent font-bold text-white hover:text-sky-800 hover:bg-white hover:border-sky-800 transition-all cursor-pointer' onClick={handleClick} disabled={isGeneratingPdf}>{progressMessage}</button>
    </section>
    </>
  )
}

export default App
