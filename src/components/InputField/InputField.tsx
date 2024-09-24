import React, { FormEvent, useState } from 'react'
import "./InputField.css"
import { TODO } from '../../model/todo';

interface props {
  addToList: (todo: string, tags: string[], date: Date | null) => void
}
const InputField: React.FC<props> = ({ addToList }) => {
  const [todo, setToDo] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date | null>(null)


  const kanbanStatusOptions = [
    "Important",
    "Urgent",
    "Low Priority",
    "Medium Priority",
    "High Priority",
    "Critical",
    "Optional",
    "On Hold",
    "Requires Attention",
    "Deferred"
  ];



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToList(todo, tags, dueDate);
    setToDo("");
    setTags([]);
    setDueDate(null);
  }


  const handleCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add to selected options if checked
      setTags((prevOptions) => [...prevOptions, value]);
    } else {
      // Remove from selected options if unchecked
      setTags((prevOptions) => prevOptions.filter((option) => option !== value));
    }
  };

  console.log(tags)
  return (
    <form className='input' onSubmit={handleSubmit}>

      <label className='label'>Select Status:</label>
      <div className=' flex  items-left flex-wrap space-x-3 ' >
        {kanbanStatusOptions.map((value, index) => (
          <div className='flex flex-row' key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              value={value}
              onChange={(event)=>handleCheckboxChange(event)}
            />
            <label htmlFor={`checkbox-${index}`}>{value}</label>
          </div>
        ))}
      </div>

      <label className='label' htmlFor="desc">Description</label>
      <textarea
        id='desc'
        placeholder='Enter Task Description'
        className='input_box'
        value={todo}
        onChange={(e) => { setToDo(e.target.value) }}
      >
      </textarea>

      <label className='label' htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        onChange={(e) => { setDueDate(new Date(e.target.value)) }}
        min={new Date().toISOString().split('T')[0]}
      />

      <button className="input_submit "type='submit'>Submit</button>



    </form>
  )
}

export default InputField