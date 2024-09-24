import React from 'react'
import { TODO } from '../../model/todo'
import "./todolist.css"
import SingleToDo from '../ToDoTask/singeToDo'
import { AiOutlinePlus } from "react-icons/ai";



interface props {
    list: TODO[],
    title: string,
    handleTaskComplete: (id: number) => void
    handleTaskDelete: (id: number) => void
    handleOpenModal?:()=>void


}
const TodoList: React.FC<props> = ({ list, title, handleTaskComplete, handleTaskDelete , handleOpenModal}) => {


    return (
        <div className="todolist " >
            
            <div className="todolist-header">
                <h1> {title} </h1>
                {title==="TO DO" ?  <span onClick={handleOpenModal} className="right">
                    <AiOutlinePlus />
                </span> :<></>}
            </div>
            <ul>
                {list && list.map((value, index) => (
                    <li key={index + "-" + value.id}>
                        <SingleToDo handleCompleteion={handleTaskComplete} handleDeletion={handleTaskDelete} item={value} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList