import { useState, useEffect } from "react";


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
      setTaskData(list.result);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold font-mono text-center mt-5">
          To Do List
        </h1>

        <ul className="grid grid-cols-7 m-2 border border-slate-500 rounded bg-gray-100">
          <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">SR.NO</li>
          <li className="border col-span-2 font-medium text-lg p-3 border-slate-500">TITLE</li>
          <li className="border col-span-4 font-medium text-lg p-3 border-slate-500">DESCRIPTION</li>

          {taskData &&
            taskData.map((item, index) => {
              return (
                <>
                  <li className="border col-span-1 font-medium text-lg p-3 border-slate-500">{index + 1}</li>
                  <li className="border col-span-2 font-medium text-lg p-3 border-slate-500">{item.title}</li>
                  <li className="border col-span-4 font-medium text-lg p-3 border-slate-500">{item.description}</li>
                </>
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
