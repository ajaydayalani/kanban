import React from 'react'

import { useRouteError } from 'react-router-dom'
const BoardError = () => {

    const error = useRouteError() as Error 
  return (
    <div className='h-screen w-full flex items-center justify-center text-4xl font-bold bg-blue-500'>
        {error.message}
        </div>
  )
}

export default BoardError