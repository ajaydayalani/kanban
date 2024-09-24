import React, { useState } from 'react'
import { TODO } from '../../model/todo'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import "./singletask.css"

interface props {
    item:TODO;
    handleCompleteion: (id:number)=>void
    handleDeletion: (id:number)=>void
}

const SingleToDo: React.FC<props> = ({item, handleCompleteion, handleDeletion}) => {

    const [editMode, setEditMode]= useState(false);
    const [todoItem, setTodoItem] = useState<TODO> (item)

    return (
        <div className='task-container'>
            <span className='task-row'>
                <p>{item.id}</p>
                <p > {item.isDone ? " Completed" : "Incomplete"}</p>
                <span className='flex flex-row flex-grow justify-end '>
                    <span className="icon" onClick={()=>setEditMode(!editMode)} >
                        <AiFillEdit />
                    </span>
                    <span className="icon" onClick={()=>handleDeletion(item.id)}>
                        <AiFillDelete />
                    </span>
                    <span className="icon" onClick={()=>handleCompleteion(item.id)}>
                        <MdDone />
                    </span>
                </span>
            </span>
            <span className="task-row">
                <input 
                type="text"
                value={todoItem.todo}
                onChange={(e)=>setTodoItem({...todoItem,todo:e.target.value})}
                className='disabled:bg-blue-300'

                disabled={!editMode}
                ></input>
            </span>

            <span className="task-row">
            <input type="date" 
            defaultValue={todoItem.dueDate.toISOString().split('T')[0]}
            onChange={(e)=>setTodoItem({...todoItem, dueDate:(new Date(e.target.value))})}
            disabled={!editMode}
            className='disabled:bg-blue-300'
           
            
            ></input>
            <p> Tags: {item.tags.join(", ")}</p>

            </span>

        </div>
    )
}

export default SingleToDo