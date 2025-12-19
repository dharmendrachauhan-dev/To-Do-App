import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {

  const [taskData, setTaskData] = useState(null)
  const {id} = useParams() // Use to  catch id
  const navigate = useNavigate()

  // null preferred when api call take place

  useEffect(() => {
    if (id) {
      getTask(id)
    }
  },[id])


  const getTask = async (id) =>{
    let task = await fetch(`http://localhost:8000/task/${id}`);
    task = await task.json();
    if(task.result){
        setTaskData(task.result)
    }
  }

  if (!taskData) {
  return <p className="text-center mt-10">Loading...</p>;
  }  // best practice

  const updateTask = async () => {
    console.log("function called", taskData)
    let task = await fetch("http://localhost:8000/update-task",
     {
      method: "put",
      body: JSON.stringify(taskData),
      headers:{
        'content-type': 'application/Json'
      }
     }
    );
    task = await task.json();
    if(task){
      navigate('/')
    }
  }

  return (
    <>

        <div className="p-7 max-h-screen flex flex-col items-center justify-center">
          <div className="border border-slate-400 shadow-slate-300 p-8 flex flex-col gap-4 max-w-md rounded">
            <h1 className="text-center font-bold text-lg text-gray-700">UPDATE TASK</h1>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-stone-800 text-xl">Title:</label>
              <input
                value={taskData?.title}
                type="text"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                placeholder="Enter task title"
                onChange={(event) => setTaskData({...taskData , title: event.target.value})}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-xl text-slate-800">Description:</label>
              <textarea
                value={taskData?.description}
                cols="35"
                rows="4"
                className="border border-slate-400 outline-none focus:border-emerald-500 rounded px-2 py-2"
                placeholder="Enter task description"
                onChange={(event)=>setTaskData({...taskData , description: event.target.value})}
              ></textarea>
            </div>
            <button 
            onClick={updateTask}
            className="bg-green-300 w-full cursor-pointer py-2 rounded font-medium text-white"            
            >
              UPDATE
            </button>
          </div>
        </div>
    </>
  );
}

export default UpdateTask;
