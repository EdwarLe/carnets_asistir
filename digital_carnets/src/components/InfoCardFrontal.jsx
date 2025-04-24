import React from 'react'

const InfoCardFrontal = ({ studentInfo }) => {

  

    console.log(studentInfo)

  return (
    <div className='text-sm font-[Roboto Condensed] font-bold flex flex-col'>
                <p>No. de Póliza: <span className='font-semibold'>1523006301422</span></p>
                <p>Alumno: {studentInfo}</p>
                <p>Plantel: <span className='font-semibold'>Instituto Diversificado Albert Einstein</span></p>
                <p>Vigencia Desde: <span className='font-semibold'>21/12/2024</span></p>
                <p>Vigencia Hasta: <span className='font-semibold'>21/12/2025</span></p>
                <p>NIT del tomador: <span className='font-semibold'>800.072.347</span></p>
              </div>
  )
}

export default InfoCardFrontal