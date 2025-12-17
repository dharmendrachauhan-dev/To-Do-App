import { Fragment, useState, useEffect } from "react";


function TaskList() {
  const [taskData, setTaskData] = useState();
  useEffect(() => {
    getTaskListData();
  }, []);

  const getTaskListData = async () => {
    let list = await fetch("http://localhost:8000/tasks");
    list = await list.json();
    // console.log(list)
    if (list.success) {
      setTaskData(list.result); //payload .result
    }
  };

  const deleteTask = async (id) => {
    let response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "delete"
    })
    item = await response.json()
    if(item.success) {
      console.log("Deleted Succefully")
    } else{
      console.log("Task Deletion Failed")
    }
  }
  
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold font-mono text-center mt-5">
          To Do List
        </h1>

        <ul className="grid grid-cols-8 m-2 border border-slate-500 rounded bg-gray-100">
          <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">SR.NO</li>
          <li className="border col-span-2 font-medium text-lg p-3 border-slate-500">TITLE</li>
          <li className="border col-span-4 font-medium text-lg p-3 border-slate-500">DESCRIPTION</li>
          <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">ACTION</li>

          {taskData &&
            taskData.map((item, index) => {
              return (
                <Fragment key={item._id}>

                  <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">{index + 1}</li>
                  <li className="border col-span-2 font-medium text-lg p-3 border-slate-500">{item.title}</li>
                  <li className="border col-span-4 font-medium text-lg p-3 border-slate-500">{item.description}</li>
                  <li className="border col-span-1 font-medium text-lg p-3 border-slate-500"><button onClick={() => deleteTask(item._id)} className="bg-red-500 p-1 border rounded border-gray-50 cursor-pointer hover:bg-red-600 transition-color duration-700">Delete</button></li>

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
