import React, { useState } from 'react'
import Board from './Board'
import { GiHamburgerMenu } from "react-icons/gi";
import "./App.css"

const App: React.FC = () => {
    const [hidden, setHidden] =  useState(true)

    console.log(hidden)
    return (
        <div className="app_container h-full">
            <div className={`${hidden ? "navbar" : "navbar_2"} `}>
                <span onClick={()=>setHidden(!hidden)}>
                    <GiHamburgerMenu size={"30px"}/>
                </span>
            </div>
            <div className="board">
                <Board name="Test"></Board>
            </div>
        </div>
    )
}

export default App