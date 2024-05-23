import React from 'react'

const Student = ({student}) => {
  return (
    <div className='font-default text-4xl my-7 text-center'>{student[0] + " " + student[1]}</div>
  )
}

export default Student