import { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function TaskList() {

  const [taskData, setTaskData] = useState();
  const [selectedTask, setSelectedTask] = useState([])

  useEffect(() => {
    getTaskListData();
  }, []);

  const getTaskListData = async () => {
    let list = await fetch("http://localhost:8000/tasks",{
      credentials: 'include' // ab jo bhi cookie vo backend mei send ho jayengi with all api
    });
    list = await list.json();
    // console.log(list)
    if (list.success) {
      setTaskData(list.result); //payload .result
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "delete"
    })
    item = await item.json()
    if(item.success) {
      getTaskListData()
    } else{
      console.log("Task Deletion Failed")
    }
  }


  const selectAll = (event) => {

    if(event.target.checked){
      let items = taskData.map((item) => item._id)
      setSelectedTask(items)
    } else {
      setSelectedTask([])
    }
    //console.log(selectedTask) // Late Update hoti hai
  }

  const selectSingleItem = (id) => {
    if(selectedTask.includes(id)){
      let items = selectedTask.filter((item) => item!=id);
      setSelectedTask([items])
    } else {
      setSelectedTask([id, ...selectedTask])
    }
  }

  const deleteMultiple = async () => {
    let item = await fetch('http://localhost:8000/delete-selected', 
      {
        method: 'delete',
        body: JSON.stringify(selectedTask),
        headers: {
            'Content-Type':'application/json'
        }
      }
    );
    item = await item.json()
    if (item.success){
      getTaskListData()
    }
  }


  return (
    <>
      <div>
        <h1 className="text-2xl font-bold font-mono text-center mt-5">
          To Do List
        </h1>
        <button onClick={deleteMultiple} className="bg-red-500 px-3 py-2 border rounded border-gray-50 cursor-pointer hover:bg-red-600 transition-color duration-700 m-2 text-white">Delete</button>
        <ul className="grid grid-cols-9 m-2 border border-slate-500 rounded bg-gray-100">
          <li className="border col-span-1 font-medium text-lg p-3 border-slate-500"><input onChange={selectAll} type="checkbox"/></li>
          <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">SR.NO</li>
          <li className="border col-span-2 font-medium text-lg p-3 border-slate-500">TITLE</li>
          <li className="border col-span-4 font-medium text-lg p-3 border-slate-500">DESCRIPTION</li>
          <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">ACTION</li>

          {taskData &&
            taskData.map((item, index) => {
              return (
                <Fragment key={item._id}>
                  <li className="border col-span-1 font-medium text-lg p-3 border-slate-500"><input onChange={() => selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox"/></li>
                  <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">{index + 1}</li>
                  <li className="border col-span-2 font-medium text-lg p-3 border-slate-500">{item.title}</li>
                  <li className="border col-span-4 font-medium text-lg p-3 border-slate-500">{item.description}</li>
                  <li className="border col-span-1 font-medium text-lg p-3 border-slate-500 flex flex-col gap-2">
                    <button onClick={() => deleteTask(item._id)} className="bg-red-500 p-1 border rounded border-gray-50 cursor-pointer hover:bg-red-600 transition-color duration-700">Delete</button>
                    <Link to={`update/${item._id}`} className="bg-green-500 p-1 border rounded border-gray-50 cursor-pointer hover:bg-green-600 transition-color duration-700 flex justify-center items-center">Update</Link>
                  </li>
                </Fragment>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default TaskList;

// 1) avoid error give empty arr to initial value in usestate;
// 2) put condition on map && to avoid run the map method
