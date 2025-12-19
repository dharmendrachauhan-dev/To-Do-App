import { useState } from 'react'

function AddTask() {

  const [taskData, setTaskData] = useState()
  const handleAddTask = async () => {
    console.log(taskData)
    let result = await fetch('http://localhost:8000/add-task', {
      method: 'post',
      body:JSON.stringify(taskData),
      headers: {
        'content-type':'Application/Json'
      }
    })
    result= await result.json();
    if(result){
      console.log("new task added")
    }
  }

  return (
    <>

        <div className="p-7 max-h-screen flex flex-col items-center justify-center">
          <div className="border border-slate-400 shadow-slate-300 p-8 flex flex-col gap-4 max-w-md rounded">
            <h1 className="text-center font-medium text-lg text-gray-700">Add New Task</h1>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-stone-800 text-xl">Title:</label>
              <input
                type="text"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                placeholder="Enter task title"
                onChange={(event) => setTaskData({...taskData , title: event.target.value})}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-xl text-slate-800">Description:</label>
              <textarea
                cols="35"
                rows="4"
                className="border border-slate-400 outline-none focus:border-emerald-500 rounded px-2 py-2"
                placeholder="Enter task description"
                onChange={(event)=>setTaskData({...taskData , description: event.target.value})}
              ></textarea>
            </div>
            <button 
            className="bg-green-300 w-full cursor-pointer py-2 rounded font-medium text-white"
            onClick={handleAddTask}
            >
              Add New Task
            </button>
          </div>
        </div>
    </>
  );
}

export default AddTask;
