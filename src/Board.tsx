import { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/InputField/InputField'
import { TODO, board } from "./model/todo"
import TodoList from './components/ToDoList/TodoList'
import Modal from 'react-modal';
import { useParams, LoaderFunctionArgs, useLoaderData,  } from 'react-router-dom'
import axios from 'axios'


interface props{
  name:string
}
type RouteParams= {
  id: string; // Expecting id to be a string
}


const Board: React.FC<props> = ({name}) => {

const data:TODO[] = useLoaderData() as TODO[];
const {id} =  useParams<RouteParams>();

  const [tasks, setTasks] = useState<TODO[]>([])
  const [modalIsOpen, setIsOpen] = useState(false);


  useEffect(() => {
  setTasks(data)
  },[id]); 
  



  const addToList = (x: string, y:string[], d:Date|null) => {
    setTasks([...tasks, { id: Date.now(), todo: x, isDone: false, tags:y, dueDate: d===null ? new Date(Date.now()) : d }]);
  }

  const handleTaskComplete = (id: number) => {
    setTasks(tasks.map((value) =>
      value.id === id ? { ...value, isDone: !value.isDone } : value
    ));
  };


  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter(value => value.id !== id))
  }

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }


  const ModalDemo =()=>{
    return (

      <Modal
        isOpen={modalIsOpen}
        className={'absolute top-1/2 left-1/2 w-3/4 h-3/4 bg-slate-400 bg-opacity-90 transform -translate-x-1/2 -translate-y-1/2  focus:outline-none md:w-1/2  md:h-1/2'  }
        overlayClassName={'fixed top-0 left-0  w-full h-full bg-opacity-90'}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >

        <div className='flex flex-col w-full h-full justify-center '>
        <h1>New Task</h1>
        <InputField addToList={addToList}/>

        </div>

        
      </Modal>

    )
  }

  return (
    <>
      <div key={id} className='board'>
        <h1 className="header">
          {id}
        </h1>
        <div className='list-container'>
            <ModalDemo/>
            <TodoList
              handleOpenModal={openModal}
              list={tasks.filter(value => !value.isDone)}
              title='TO DO'
              handleTaskComplete={handleTaskComplete}
              handleTaskDelete={handleTaskDelete}
            />
            <TodoList
              list={tasks.filter(value => value.isDone)}
              title='Completed'
              handleTaskComplete={handleTaskComplete}
              handleTaskDelete={handleTaskDelete}
            />
        </div>

      </div>

    </>
  )
}

export default Board




export const BoardLoader = async ({ params }:LoaderFunctionArgs):Promise<TODO[]> => {
  const { id } = params; // Get ID from params
  const cancelToken = axios.CancelToken.source();

  if (!id) {
    throw new Error("No ID provided in params."); // Ensure ID is provided
  }

  try {
    const res = await axios.get("http://localhost:4000/boards", { cancelToken: cancelToken.token });
    const boardData = res.data.filter((val:any) => val.board === id);

    const todoList = boardData.length
      ? boardData[0].tasks.map((task:any) => ({
          id: task.id,
          todo: task.todo,
          isDone: task.isDone,
          tags: task.tags,
          dueDate: new Date(task.dueDate), // Convert string to Date
        }))
      : [];

        if(todoList.length===0){
          throw new Error("No Value")
        }

    return todoList;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.error("Request canceled", err.message);
      throw new Error("Request canceled");
    } else {
      console.error("An error occurred", err);
      throw new Error("Failed to load board data");
    }
  }
};
