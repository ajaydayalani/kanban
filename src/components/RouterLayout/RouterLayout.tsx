import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import {board} from "../../model/todo"


const RouterLayout:React.FC = () => {

    const [hidden, setHidden] =  useState(true)
    const [links,setLinks]= useState<string[]>([])

    useEffect(()=>{
      const cancelToken= axios.CancelToken.source();

      axios.get("http://localhost:4000/boards",{cancelToken:cancelToken.token})
      .then((res)=>{
        const boards=res.data.map((val:board)=>(val.board))
        setLinks(boards)
      })
      .catch((err)=>{
        if(axios.isCancel(err)){
          console.log("isCancelled")
        }
        else{
          //handle
        }
      })
      
    },[])

    console.log(links)
  return (
    <div className="app_container h-full">
    <div className={`${hidden ? "navbar" : "navbar_2"} `}>
        <span onClick={()=>setHidden(!hidden)}>
            <GiHamburgerMenu size={"30px"}/>
        </span>
        {!hidden && <Navbar links={links}/>}

    </div>
    <div className="board">
        <Outlet/>        
    </div>
</div>
  )
}

export default RouterLayout