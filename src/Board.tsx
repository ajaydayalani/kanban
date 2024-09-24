import { useState } from 'react'
import './App.css'
import InputField from './components/InputField/InputField'
import { TODO } from "./model/todo"
import TodoList from './components/ToDoList/TodoList'
import Modal from 'react-modal';


interface props{
  name:string
}


const Board: React.FC<props> = ({name}) => {

  let subtitle;


  const [tasks, setTasks] = useState<TODO[]>([])
  const [modalIsOpen, setIsOpen] = useState(false);






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
      <div className='board'>
        <h1 className="header">
          {name}
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
