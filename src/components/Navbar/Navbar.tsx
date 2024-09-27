import React from 'react'
import { NavLink } from 'react-router-dom'

interface props{
    links:string[]
}
const Navbar:React.FC<props> = ({links}) => {
  return (
    <div className='flex flex-col w-full h-full py-3 px-3'>
        {links.map((val, i)=>(
          <div className='text-center text-xl text-white font-bold py-2 bg-slate-300 rounded-xl my-3 shadow-xl bg-opacity-45'>
            <NavLink to={`/board/${val}`}>{val}</NavLink>
            </div>
        ))}
    </div>
  )
}

export default Navbar